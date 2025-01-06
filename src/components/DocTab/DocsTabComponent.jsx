import { useRef } from "react";
import "./DocsTabComponents.css";
import { DocsTabFooter } from "./DocsTabFooter";
import DocumentList from "./utils/DocumentList";

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
    <div style={{ display: "flex", flexDirection: "column", height: "86vh", justifyContent: 'space-between' }}>
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
        <div style={{ borderTop: "1px solid #F0F3F9" }}>
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
