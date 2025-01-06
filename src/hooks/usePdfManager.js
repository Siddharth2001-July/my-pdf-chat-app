import { useState, useEffect, useCallback } from "react";
import { pdfCache } from "../utils/pdfCache";
import { generateThumbnail } from '../utils/thumbnailGenerator';

export const usePdfManager = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading] = useState(false);

  useEffect(() => {
    const loadCachedPdfs = async () => {
      try {
        const cachedPdfs = await pdfCache.getAllPdfs();
        if (cachedPdfs && cachedPdfs.length > 0) {
          setDocuments(cachedPdfs);
        }
      } catch (error) {
        console.error("Error loading cached PDFs:", error);
      }
    };

    loadCachedPdfs();
  }, []); documents
  /**
   * 
   * @param {*} file 
   * @returns 
   */


  const handleFileUpload = async (file) => {
    if (!(file instanceof File)) {
      console.error("Invalid file object received");
      return;
    }

    try {
      // Generate thumbnail first
      const thumbnailUrl = await generateThumbnail(file);

      const newDoc = {
        id: Date.now(),
        name: file.name,
        file: file,
        thumbnail: thumbnailUrl, // Store the generated thumbnail
      };

      setDocuments((prev) => [...prev, newDoc]);
      setSelectedDocumentId(newDoc.id);
      setUploadedFile(file);

      // Cache the document with thumbnail
      await pdfCache.storePdf(newDoc);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  
  useEffect(() => {
    console.log('usePdfManager - uploadedFile changed:', uploadedFile);
  }, [uploadedFile]);

  const handleSelectDocument = useCallback(
    (id) => {
      setSelectedDocumentId(id);
      const selectedDoc = documents.find((doc) => doc.id == id);
      console.log('Selected doc:', selectedDoc);
      console.log('Selected doc file type:', selectedDoc?.file instanceof File, typeof selectedDoc?.file);
      if (selectedDoc) {
        setUploadedFile(selectedDoc.file);
      }
    },
    [documents]
  );

  const handleDeleteDocument = async (id) => {
    try {
      await pdfCache.deletePdf(parseInt(id));
      setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id != id));
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
