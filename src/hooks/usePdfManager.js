import { useState, useEffect, useCallback } from 'react';
import { pdfCache } from '../utils/pdfCache';

export const usePdfManager = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const loadCachedPdfs = async () => {
      try {
        const cachedPdfs = await pdfCache.getAllPdfs();
        if (cachedPdfs.length > 0) {
          setDocuments(cachedPdfs);
        }
      } catch (error) {
        console.error("Error loading cached PDFs:", error);
      }
    };

    loadCachedPdfs();
  }, []);

  const generateThumbnail = async (doc, maxRetries = 100, retryInterval = 500) => {
    let retries = 0;

    while (retries < maxRetries) {
      try {
        if (!window.instance) {
          console.log(`Waiting for PDF to load... (Attempt ${retries + 1}/${maxRetries})`);
          await new Promise((resolve) => setTimeout(resolve, retryInterval));
          retries++;
          continue;
        }

        const thumbnailUrl = await window.instance.renderPageAsImageURL(
          { width: 200 },
          0
        );

        const updatedDoc = {
          ...doc,
          thumbnail: thumbnailUrl,
        };

        setDocuments((prevDocs) =>
          prevDocs.map((d) => (d.id === doc.id ? updatedDoc : d))
        );

        await pdfCache.storePdf(updatedDoc);
        console.log("PDF cached and thumbnail generated successfully");
        return;
      } catch (error) {
        console.error("Error generating thumbnail:", error);
        retries++;
      }
    }
    console.error("Failed to generate thumbnail: Max retries reached");
  };

  const handleFileUpload = async (file) => {
    if (!(file instanceof File)) {
      console.error("Invalid file object received");
      return;
    }

    const newDoc = {
      id: Date.now(),
      name: file.name,
      file: file,
      thumbnail: "",
    };

    setDocuments(prev => [...prev, newDoc]);
    setSelectedDocumentId(newDoc.id);
    setUploadedFile(file);

    await generateThumbnail(newDoc);
  };

  const handleSelectDocument = useCallback( (id) => {
    setSelectedDocumentId(id);
    const selectedDoc = documents.find((doc) => doc.id === id);
    if (selectedDoc) {
      setUploadedFile(selectedDoc.file);
    }
  }, [documents]);

  const handleDeleteDocument = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this document?")) {
        return;
      }
      await pdfCache.deletePdf(id);
      setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
      if (selectedDocumentId === id) {
        setSelectedDocumentId(null);
        setUploadedFile(null);
      }
    } catch (error) {
      console.error("Error deleting PDF:", error);
    }
  };

  return {
    documents,
    selectedDocumentId,
    uploadedFile,
    isUploading,
    handleFileUpload,
    handleSelectDocument,
    handleDeleteDocument,
  };
};
