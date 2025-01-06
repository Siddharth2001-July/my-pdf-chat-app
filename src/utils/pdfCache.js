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

  async fileToArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsArrayBuffer(file);
    });
  }

  async storePdf(document) {
    try {
      await this.init();

      // Convert File to ArrayBuffer before starting the transaction
      const arrayBuffer = await this.fileToArrayBuffer(document.file);
      // Convert thumbnail URL to base64
      const thumbnailBase64 = await this.convertThumbnailToBase64(document.thumbnail);

      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([this.storeName], "readwrite");
        const store = transaction.objectStore(this.storeName);

        // Prepare the data object
        const pdfData = {
          id: document.id,
          name: document.name,
          file: arrayBuffer,
          thumbnail: thumbnailBase64,
          timestamp: Date.now(),
        };

        // Perform the store operation
        const request = store.put(pdfData);

        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error);

        // Handle transaction completion
        transaction.oncomplete = () => resolve(true);
        transaction.onerror = () => reject(transaction.error);
      });
    } catch (error) {
      console.error('Error storing PDF:', error);
      throw error;
    }
  }

  async getPdf(id) {
    try {
      await this.init();

      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([this.storeName], "readonly");
        const store = transaction.objectStore(this.storeName);
        const request = store.get(id);

        request.onsuccess = () => {
          if (request.result) {
            const pdfData = request.result;
            // Convert ArrayBuffer back to File
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
        transaction.onerror = () => reject(transaction.error);
      });
    } catch (error) {
      console.error('Error retrieving PDF:', error);
      throw error;
    }
  }

  async deletePdf(id) {
    try {
      await this.init();

      return new Promise(async (resolve, reject) => {
        const transaction = this.db.transaction([this.storeName], "readwrite");
        const store = transaction.objectStore(this.storeName);
        const request = store.delete(id);

        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error);
        transaction.onerror = () => reject(transaction.error);
      });
    } catch (error) {
      console.error('Error deleting PDF:', error);
      throw error;
    }
  }

  async getAllPdfs() {
    try {
      await this.init();

      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([this.storeName], "readonly");
        const store = transaction.objectStore(this.storeName);
        const request = store.getAll();

        request.onsuccess = () => {
          const pdfs = request.result.map((pdfData) => {
            // Create a new File object from the stored ArrayBuffer
            const file = new File([pdfData.file], pdfData.name, {
              type: "application/pdf",
            });

            // Return the complete object with the thumbnail
            return {
              id: pdfData.id,
              name: pdfData.name,
              file: file,
              thumbnail: pdfData.thumbnail, // Include the stored thumbnail
              timestamp: pdfData.timestamp
            };
          });
          resolve(pdfs);
        };

        request.onerror = () => reject(request.error);
        transaction.onerror = () => reject(transaction.error);
      });
    } catch (error) {
      console.error('Error retrieving all PDFs:', error);
      throw error;
    }
  }


  async clearCache() {
    try {
      await this.init();

      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([this.storeName], "readwrite");
        const store = transaction.objectStore(this.storeName);
        const request = store.clear();

        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error);
        transaction.onerror = () => reject(transaction.error);
      });
    } catch (error) {
      console.error('Error clearing cache:', error);
      throw error;
    }
  }

  async convertThumbnailToBase64(thumbnailUrl) {
    return new Promise((resolve, reject) => {
      fetch(thumbnailUrl)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result); // This will be the base64 string
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(blob); // Convert blob to base64
        })
        .catch(error => {
          console.error('Error converting thumbnail to base64:', error);
          reject(error);
        });
    });
  }
}

export const pdfCache = new PdfCache();