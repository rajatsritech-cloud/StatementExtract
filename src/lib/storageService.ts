import { ExtractedData } from './pdfProcessor';

const DB_NAME = 'StatementExtractDB';
const STORE_NAME = 'documents';
const DB_VERSION = 2; // Bumped version for documentType index
const MAX_DOCS = 100;

export type DocumentType = 'bank_statement' | 'invoice';

export interface StoredDocument {
    id: string;
    fileName: string;
    date: string;
    data: ExtractedData;
    fileBlob?: Blob; // Optional: Store the PDF file itself
    timestamp: number;
    documentType: DocumentType; // New field to distinguish document types
}

export class StorageService {
    private static async openDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;

                // Create store if it doesn't exist
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                    store.createIndex('timestamp', 'timestamp', { unique: false });
                    store.createIndex('documentType', 'documentType', { unique: false });
                } else {
                    // Upgrade existing store - add documentType index if missing
                    const transaction = (event.target as IDBOpenDBRequest).transaction;
                    if (transaction) {
                        const store = transaction.objectStore(STORE_NAME);
                        if (!store.indexNames.contains('documentType')) {
                            store.createIndex('documentType', 'documentType', { unique: false });
                        }
                    }
                }
            };
        });
    }

    static async saveDocument(doc: StoredDocument): Promise<void> {
        const db = await this.openDB();

        // Check storage quota
        if (navigator.storage && navigator.storage.estimate) {
            const { quota, usage } = await navigator.storage.estimate();
            if (quota && usage && (quota - usage) < 5 * 1024 * 1024) { // Less than 5MB left
                throw new Error('STORAGE_FULL: Your browser storage is almost full. Please delete some old documents from your dashboard to free up space.');
            }
        }

        // Check document count for this type
        const currentCount = await this.getDocumentCount(doc.documentType);
        if (currentCount >= MAX_DOCS) {
            throw new Error(`STORAGE_LIMIT: You've reached the maximum of ${MAX_DOCS} stored ${doc.documentType === 'invoice' ? 'invoices' : 'bank statements'}. Please delete some old documents from your dashboard to continue.`);
        }

        // Now open a fresh transaction for the put operation
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);

            // Sanitize data to store only essential fields
            const sanitizedData: ExtractedData = {
                userInfo: doc.data.userInfo,
                transactions: doc.data.transactions,
                summary: doc.data.summary,
                column_names: doc.data.column_names,
                sections: doc.data.sections,
                processing_steps: doc.data.processing_steps,
                processing_stats: doc.data.processing_stats,
                reconciliation: doc.data.reconciliation,
                num_pages: doc.data.num_pages,
                llm_used: doc.data.llm_used,
                invoiceData: doc.data.invoiceData // Include invoice data if present
            };

            const docToSave = {
                ...doc,
                data: sanitizedData,
                documentType: doc.documentType || 'bank_statement' // Ensure documentType is set
            };

            const addRequest = store.put(docToSave);

            transaction.oncomplete = () => {
                // Dispatch event for UI components to update
                window.dispatchEvent(new CustomEvent('storage-updated'));
                resolve();
            };

            transaction.onerror = () => reject(transaction.error);
            addRequest.onerror = () => reject(addRequest.error);
        });
    }

    private static async getDocumentCount(documentType?: DocumentType): Promise<number> {
        if (!documentType) {
            // Return total count
            const db = await this.openDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([STORE_NAME], 'readonly');
                const store = transaction.objectStore(STORE_NAME);
                const countRequest = store.count();
                countRequest.onsuccess = () => resolve(countRequest.result);
                countRequest.onerror = () => reject(countRequest.error);
            });
        }

        // Return count for specific type
        const docs = await this.getDocuments(documentType);
        return docs.length;
    }

    static async getDocuments(documentType?: DocumentType): Promise<StoredDocument[]> {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const index = store.index('timestamp');
            const request = index.openCursor(null, 'prev'); // Newest first

            const results: StoredDocument[] = [];
            request.onsuccess = (event) => {
                const cursor = (event.target as IDBRequest).result;
                if (cursor) {
                    const doc = cursor.value as StoredDocument;
                    // Handle legacy documents without documentType (treat as bank_statement)
                    const docType = doc.documentType || 'bank_statement';

                    // If no type filter, include all; otherwise filter by type
                    if (!documentType || docType === documentType) {
                        results.push({ ...doc, documentType: docType });
                    }
                    cursor.continue();
                } else {
                    resolve(results);
                }
            };
            request.onerror = () => reject(request.error);
        });
    }

    static async deleteDocument(id: string): Promise<void> {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(id);

            transaction.oncomplete = () => {
                window.dispatchEvent(new CustomEvent('storage-updated'));
                resolve();
            };

            transaction.onerror = () => reject(transaction.error);
            request.onerror = () => reject(request.error);
        });
    }

    static async deleteAllDocuments(documentType?: DocumentType): Promise<number> {
        if (!documentType) {
            // Delete all documents
            const db = await this.openDB();
            const count = await this.getDocumentCount();

            return new Promise((resolve, reject) => {
                const transaction = db.transaction([STORE_NAME], 'readwrite');
                const store = transaction.objectStore(STORE_NAME);
                const request = store.clear();

                transaction.oncomplete = () => {
                    window.dispatchEvent(new CustomEvent('storage-updated'));
                    resolve(count);
                };

                transaction.onerror = () => reject(transaction.error);
                request.onerror = () => reject(request.error);
            });
        }

        // Delete only documents of specific type
        const docs = await this.getDocuments(documentType);
        const db = await this.openDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);

            docs.forEach(doc => {
                store.delete(doc.id);
            });

            transaction.oncomplete = () => {
                window.dispatchEvent(new CustomEvent('storage-updated'));
                resolve(docs.length);
            };

            transaction.onerror = () => reject(transaction.error);
        });
    }

    /**
     * Update transactions for an existing document (for inline edits)
     */
    static async updateDocumentTransactions(id: string, transactions: ExtractedData['transactions']): Promise<void> {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);

            // First get the existing document
            const getRequest = store.get(id);
            getRequest.onsuccess = () => {
                const doc = getRequest.result as StoredDocument | undefined;
                if (!doc) {
                    reject(new Error('Document not found'));
                    return;
                }

                // Update transactions
                doc.data.transactions = transactions;
                doc.timestamp = Date.now(); // Update timestamp

                // Save back
                const putRequest = store.put(doc);
                putRequest.onsuccess = () => resolve();
                putRequest.onerror = () => reject(putRequest.error);
            };
            getRequest.onerror = () => reject(getRequest.error);
        });
    }

    /**
     * Update invoice data for an existing document (for inline edits)
     */
    static async updateDocumentInvoiceData(id: string, invoiceData: ExtractedData['invoiceData']): Promise<void> {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);

            const getRequest = store.get(id);
            getRequest.onsuccess = () => {
                const doc = getRequest.result as StoredDocument | undefined;
                if (!doc) {
                    reject(new Error('Document not found'));
                    return;
                }

                doc.data.invoiceData = invoiceData;
                doc.timestamp = Date.now();

                const putRequest = store.put(doc);
                putRequest.onsuccess = () => resolve();
                putRequest.onerror = () => reject(putRequest.error);
            };
            getRequest.onerror = () => reject(getRequest.error);
        });
    }

    private static async pruneDocuments(keepCount: number): Promise<void> {
        const docs = await this.getDocuments();
        if (docs.length <= keepCount) return;

        // Docs are already sorted newest first by getDocuments
        const toDelete = docs.slice(keepCount); // The oldest ones

        const db = await this.openDB();
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        toDelete.forEach(doc => {
            store.delete(doc.id);
        });

        return new Promise((resolve) => {
            transaction.oncomplete = () => resolve();
        });
    }

    static async getStorageStatus(documentType?: DocumentType): Promise<{
        documentCount: number;
        maxDocuments: number;
        usedSpaceKB: number | null;
        isNearLimit: boolean;
        bankStatementCount: number;
        invoiceCount: number;
    }> {
        const allDocuments = await this.getDocuments();
        const bankStatements = allDocuments.filter(d => (d.documentType || 'bank_statement') === 'bank_statement');
        const invoices = allDocuments.filter(d => d.documentType === 'invoice');

        const targetDocuments = documentType
            ? (documentType === 'invoice' ? invoices : bankStatements)
            : allDocuments;

        const documentCount = targetDocuments.length;

        // Calculate actual size of documents by serializing to JSON
        let usedSpaceKB: number | null = null;
        try {
            const totalBytes = allDocuments.reduce((sum, doc) => {
                const docString = JSON.stringify(doc);
                return sum + new Blob([docString]).size;
            }, 0);
            usedSpaceKB = Math.round(totalBytes / 1024);
        } catch (e) {
            console.error("Failed to calculate document size:", e);
        }

        return {
            documentCount,
            maxDocuments: MAX_DOCS,
            usedSpaceKB,
            isNearLimit: documentCount >= MAX_DOCS - 5,
            bankStatementCount: bankStatements.length,
            invoiceCount: invoices.length
        };
    }
}
