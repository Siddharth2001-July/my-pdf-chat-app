import {
  Box,
  ImageDropZone,
  NumberInput,
  ProgressSpinner,
  Select,
} from "@baseline-ui/core";
import { PlusIcon } from "@baseline-ui/icons/12";
import { useRef } from "react";
import "./DocsTabComponents.css";
import { DocsTabFooter } from "./DocsTabFooter";
import { EllipseIcon, SquareIcon, PolygonIcon } from "@baseline-ui/icons/24";
import DocumentList from "./utils/DocumentList";

const DocsTabComponent = ({
  documents,
  selectedDocumentId,
  onSelectDocument,
  isUploading,
  onFileUpload,
  onDeleteDocument,
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
    <div style={{ display: "flex", flexDirection: "column", height: "88vh" }}>
      <div style={{ overflowY: "auto", flex: 1 }}>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <DocumentList
          documents={documents}
          selectedDocumentId={selectedDocumentId}
          onSelectDocument={onSelectDocument}
          onUploadClick={handleUploadClick}
        />
      </div>
      {documents.length > 0 && (
        <div className="docs-tab-footer">
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
