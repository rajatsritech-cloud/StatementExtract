import { ExtractedData } from './pdfProcessor';

const DB_NAME = 'StatementExtractDB';
const STORE_NAME = 'documents';
const DB_VERSION = 1;
const MAX_DOCS = 5;

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
            if (quota && usage && (quota - usage) < 10 * 1024 * 1024) { // Less than 10MB left
                // Aggressive cleanup if space is low
                await this.pruneDocuments(3);
            }
        }

        // Check document count and prune BEFORE opening transaction
        const currentCount = await this.getDocumentCount();
        if (currentCount >= MAX_DOCS) {
            await this.pruneDocuments(MAX_DOCS - 1);
        }

        // Now open a fresh transaction for the put operation
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);

            // Sanitize data to store only essential fields
            // We exclude 'markdown', 'fraud_analysis', etc. to save space
            const sanitizedData: ExtractedData = {
                userInfo: doc.data.userInfo,
                transactions: doc.data.transactions,
                summary: doc.data.summary,
                column_names: doc.data.column_names
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
}
