import { ActionButton, Box } from "@baseline-ui/core";
import { PlusIcon } from "@baseline-ui/icons/12";
import { useRef } from "react";
import "./DocsTabComponents.css";

const DocsTabComponent = ({
  documents,
  selectedDocumentId,
  onSelectDocument,
  isUploading,
  onFileUpload,
}) => {
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
        style={{ display: "none" }}
      />
      <ActionButton
        label="Upload PDF"
        iconBefore={PlusIcon}
        onPress={handleUploadClick}
        className="button"
      />
      <div className="list">
        {documents.map((doc) => (
          <div>
            <Box
              key={doc.id}
              width="full"
              borderRadius="full"
              padding={["2xl", "3xl", "4xl"]}
              className={`list-item ${
                selectedDocumentId === doc.id ? "selected" : ""
              }`}
              onClick={() => onSelectDocument(doc.id)}
              backgroundColor="background.primary.strong"
              style={{ padding: "10px" }}
            >
              <div>
                {doc.thumbnail ? (
                  <img src={doc.thumbnail} alt={`${doc.name} preview`} />
                ) : (
                  <div className="loading-thumbnail">
                    <div className="loading-spinner"></div>
                  </div>
                )}
              </div>
              <div className="document-name">
                {doc.name.length > 12 // Adjust the character limit as needed
                  ? `${doc.name.slice(0, 12)}...`
                  : doc.name}
              </div>
            </Box>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocsTabComponent;
