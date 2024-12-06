import { useState, useEffect, useCallback } from "react";
import { pdfCache } from "../utils/pdfCache";
import defaultPdf from "../assets/Sample Case Document.pdf";

export const usePdfManager = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const loadPdfs = async () => {
      try {
        // Check if default PDF exists in cache first
        const cachedPdfs = await pdfCache.getAllPdfs();
        let defaultDoc = cachedPdfs.find(doc => doc.id === 'default');

        // If default doesn't exist in cache, create and cache it
        if (!defaultDoc) {
          const response = await fetch(defaultPdf);
          const blob = await response.blob();
          const file = new File([blob], 'default.pdf', { type: 'application/pdf' });

          defaultDoc = {
            id: 'default',
            name: 'Default Document',
            file: file,
            thumbnail: '',
          };
          setSelectedDocumentId('default');
          setUploadedFile(defaultDoc.file);
          defaultDoc.thumbnail = await generateThumbnail(defaultDoc)
        }

        // Filter out default from cached PDFs to avoid duplication
        const otherCachedPdfs = cachedPdfs.filter(doc => doc.id !== 'default');
        
        // Set documents with default first
        setDocuments([defaultDoc, ...otherCachedPdfs]);
        setSelectedDocumentId('default');
        setUploadedFile(defaultDoc.file);
      } catch (error) {
        console.error("Error loading PDFs:", error);
      }
    };

    loadPdfs();
  }, []);

  const generateThumbnail = async (
    doc,
    maxRetries = 100,
    retryInterval = 500
  ) => {
    let retries = 0;

    while (retries < maxRetries) {
      try {
        if (!window.instance) {
          console.log(
            `Waiting for PDF to load... (Attempt ${retries + 1}/${maxRetries})`
          );
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

    setDocuments((prev) => [...prev, newDoc]);
    setSelectedDocumentId(newDoc.id);
    setUploadedFile(file);

    await generateThumbnail(newDoc);
  };

  const handleSelectDocument = useCallback(
    (id) => {
      setSelectedDocumentId(id);
      const selectedDoc = documents.find((doc) => doc.id === id);
      if (selectedDoc) {
        setUploadedFile(selectedDoc.file);
      }
    },
    [documents]
  );

  const handleDeleteDocument = async (id) => {
    try {
      if (id === 'default') {
        console.warn("Cannot delete default document");
        return;
      }

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
