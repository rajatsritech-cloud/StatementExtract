import { ExtractedData } from './pdfProcessor';

const DB_NAME = 'StatementExtractDB';
const STORE_NAME = 'documents';
const DB_VERSION = 1;
const MAX_DOCS = 100;

export interface StoredDocument {
    id: string;
    fileName: string;
    date: string;
    data: ExtractedData;
    fileBlob?: Blob; // Optional: Store the PDF file itself
    timestamp: number;
}

export class StorageService {
    private static async openDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                    store.createIndex('timestamp', 'timestamp', { unique: false });
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

        // Check document count
        const currentCount = await this.getDocumentCount();
        if (currentCount >= MAX_DOCS) {
            throw new Error(`STORAGE_LIMIT: You've reached the maximum of ${MAX_DOCS} stored documents. Please delete some old documents from your dashboard to continue.`);
        }

        // Now open a fresh transaction for the put operation
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);

            // Sanitize data to store only essential fields
            // We exclude 'markdown', 'fraud_analysis' to save space but keep validation data
            const sanitizedData: ExtractedData = {
                userInfo: doc.data.userInfo,
                transactions: doc.data.transactions,
                summary: doc.data.summary,
                column_names: doc.data.column_names,
                sections: doc.data.sections, // Persist sections/tabs
                processing_steps: doc.data.processing_steps, // Processing pipeline
                processing_stats: doc.data.processing_stats, // Processing statistics
                reconciliation: doc.data.reconciliation, // Validation results
                num_pages: doc.data.num_pages, // Page count
                llm_used: doc.data.llm_used // Extraction method
            };

            const docToSave = {
                ...doc,
                data: sanitizedData
            };

            const addRequest = store.put(docToSave);
            addRequest.onsuccess = () => resolve();
            addRequest.onerror = () => reject(addRequest.error);

            transaction.onerror = () => reject(transaction.error);
        });
    }

    private static async getDocumentCount(): Promise<number> {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const countRequest = store.count();
            countRequest.onsuccess = () => resolve(countRequest.result);
            countRequest.onerror = () => reject(countRequest.error);
        });
    }

    static async getDocuments(): Promise<StoredDocument[]> {
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
                    results.push(cursor.value);
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
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
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

    static async getStorageStatus(): Promise<{
        documentCount: number;
        maxDocuments: number;
        availableSpaceMB: number | null;
        isNearLimit: boolean;
    }> {
        const documentCount = await this.getDocumentCount();
        let availableSpaceMB: number | null = null;

        if (navigator.storage && navigator.storage.estimate) {
            const { quota, usage } = await navigator.storage.estimate();
            if (quota && usage) {
                availableSpaceMB = Math.round((quota - usage) / (1024 * 1024));
            }
        }

        return {
            documentCount,
            maxDocuments: MAX_DOCS,
            availableSpaceMB,
            isNearLimit: documentCount >= MAX_DOCS - 5 || (availableSpaceMB !== null && availableSpaceMB < 10)
        };
    }
}
