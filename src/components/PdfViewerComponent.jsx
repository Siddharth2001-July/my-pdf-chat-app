// src/components/PdfViewerComponent.jsx
import { useEffect, useRef, useMemo } from "react";

export default function PdfViewerComponent({ document, onTextExtracted }) {
  const containerRef = useRef(null);

  const extractTextFromPage = async (instance, pageIndex = 0) => {
    try {
      const textLines = await instance.textLinesForPageIndex(pageIndex);
      let pageText = '';
      
      textLines.forEach(function (textLine) {
        pageText += textLine.contents + '\n';
      });
      
      return pageText;
    } catch (error) {
      console.error('Error extracting text:', error);
      return '';
    }
  };

  // Memoize the document URL to prevent unnecessary re-renders
  const documentUrl = useMemo(() => {
    if (document instanceof File) {
      return URL.createObjectURL(document);
    } else if (typeof document === 'string') {
      return document;
    }
    return null;
  }, [document]);

  useEffect(() => {
    const container = containerRef.current;
    console.log('PdfViewer received document:', document);

    let PSPDFKit;
    let blobUrl;

    (async function () {
      try {
        PSPDFKit = await import("pspdfkit");
        PSPDFKit.unload(container);

        // Handle different document types
        let documentUrl;
        if (document instanceof File) {
          // Create a blob URL from the File object
          blobUrl = URL.createObjectURL(document);
          documentUrl = blobUrl;
        } else if (typeof document === 'string') {
          // Use the string URL directly
          documentUrl = document;
        } else {
          throw new Error('Invalid document type');
        }

        console.log('Loading PDF with URL:', documentUrl);

        const instance = await PSPDFKit.load({
          container,
          document: documentUrl,
          baseUrl: `${window.location.protocol}//${window.location.host}/`,
          licenseKey: import.meta.env.VITE_PSPDFKIT_LICENSE_KEY
        });
        window.instance = instance
        const text = await extractTextFromPage(instance);
        console.log('Extracted text:', text);
        onTextExtracted(text);

      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    })();

    // Cleanup function
    return () => {
      if (PSPDFKit) {
        PSPDFKit.unload(container);
        window.instance = undefined;
      }
      // Clean up the blob URL if it was created
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [documentUrl, onTextExtracted]);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}