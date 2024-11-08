import { ActionButton } from "@baseline-ui/core";
import { PlusIcon } from "@baseline-ui/icons/12";
import { useRef } from "react";

const DocsTabComponent = ({ documents, selectedDocumentId, onSelectDocument, isUploading, onFileUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target?.files?.[0];
    console.log("File selected:", file);
    
    if (file) {
      onFileUpload(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input 
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <ActionButton
        label="Upload PDF"
        iconBefore={PlusIcon}
        onPress={handleUploadClick}
        className="button"
      />
      <div className="list">
        {documents.map((doc) => (
          <div
            key={doc.id}
            onClick={() => onSelectDocument(doc.id)}
            className={`list-item ${selectedDocumentId === doc.id ? "selected" : ""}`}
          >
            {doc.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocsTabComponent;