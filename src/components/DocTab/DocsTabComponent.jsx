import { useRef } from "react";
import "./DocsTabComponents.css";
import { DocsTabFooter } from "./DocsTabFooter";
import DocumentList from "./utils/DocumentList";
import { Separator } from "@baseline-ui/core";

const DocsTabComponent = ({onSelectDocument, selectedDocumentId, isUploading, onFileUpload, onDeleteDocument, documents}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target?.files?.[0];

    if (file) {
      onFileUpload(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <div className="doc-nav-container">
      <div
        className="document-list"
      >
        <DocumentList
          handleFileChange={handleFileChange}
          documents={documents}
          fileInputRef={fileInputRef}
          selectedDocumentId={selectedDocumentId}
          onSelectDocument={onSelectDocument}
          onUploadClick={handleUploadClick}
        />
      </div>
      {selectedDocumentId && (
        <div className="bottom-container">
          <Separator className="footer-separator"/>
          <DocsTabFooter
            selectedDocumentId={selectedDocumentId}
            onDeleteDocument={onDeleteDocument}
          />
        </div>
      )}
    </div>
  );
};
export default DocsTabComponent;
