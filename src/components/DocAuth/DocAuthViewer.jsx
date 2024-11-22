import DocAuth from "@pspdfkit/document-authoring";
import { useEffect, useState } from "react";
import { ProgressSpinner } from "@baseline-ui/core";
import defaultDocxFile from "../../assets/Sample Case Document.docx"

const DocAuthViewer = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function initializeDocAuth() {
      try {
        const docAuthSystem = await DocAuth.createDocAuthSystem();
        const defaultDocument = await fetch(defaultDocxFile);
        const defDocJSON = await docAuthSystem.importDOCX(defaultDocument);
        const editor = await docAuthSystem.createEditor(
          document.getElementById("editor"), {document: defDocJSON}
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to initialize DocAuth:", error);
      }
    }

    initializeDocAuth();

    // Optional cleanup function
    return () => {
      // Add any cleanup logic here if needed
    };
  }, []);

  return (
    <>
      <div
        id="editor"
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          border: "1px solid #dcdcdc",
        }}
      ></div>
      {isLoading ? (
        <div style={{ marginTop: "45%", fontWeight: 800, textAlign: "center" }}>
          <ProgressSpinner size="md" aria-label={"Label"}/>
        </div>
      ) : null}
    </>
  );
};

export default DocAuthViewer;
