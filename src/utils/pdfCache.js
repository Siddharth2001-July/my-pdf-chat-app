class PdfCache {
  constructor() {
    this.dbName = "pdfCacheDB";
    this.dbVersion = 1;
    this.storeName = "pdfs";
    this.db = null;
  }

  async init() {
    if (this.db) return;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: "id" });
          store.createIndex("name", "name", { unique: false });
        }
      };
    });
  }

  async storePdf(document) {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      // Convert File/Blob to ArrayBuffer for storage
      const reader = new FileReader();
      reader.onload = async () => {
        const pdfData = {
          id: document.id,
          name: document.name,
          file: reader.result,
          thumbnail: document.thumbnail,
          timestamp: Date.now(),
        };

        const request = store.put(pdfData);
        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error);
      };

      reader.onerror = () => reject(reader.error);
      reader.readAsArrayBuffer(document.file);
    });
  }

  async getPdf(id) {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);

      request.onsuccess = () => {
        if (request.result) {
          // Convert ArrayBuffer back to Blob/File
          const pdfData = request.result;
          const file = new File([pdfData.file], pdfData.name, {
            type: "application/pdf",
          });
          resolve({
            ...pdfData,
            file,
          });
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  async deletePdf(id) {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }

  async getAllPdfs() {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        const pdfs = request.result.map((pdfData) => ({
          ...pdfData,
          file: new File([pdfData.file], pdfData.name, {
            type: "application/pdf",
          }),
        }));
        resolve(pdfs);
      };
      request.onerror = () => reject(request.error);
    });
  }
}

export const pdfCache = new PdfCache();
