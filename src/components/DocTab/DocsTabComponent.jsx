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

  const items = [
    { id: "ellipse", icon: EllipseIcon, label: "Ellipse" },
    { id: "square", icon: SquareIcon, label: "Square" },
    { id: "polygon", icon: PolygonIcon, label: "Polygon" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "93vh" }}>
      <div style={{ overflowY: "auto", flex: 1 }}>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <Box
          borderRadius="full"
          padding={["2xl", "3xl", "4xl"]}
          className={`list-item`}
          onClick={handleUploadClick}
          backgroundColor="background.primary.strong"
          style={{ margin: "15px 0px", padding: "40px", width: "" }}
        >
          <PlusIcon />
        </Box>
        <div className="list">
          {documents.map((doc) =>
            selectedDocumentId == doc.id ? (
              // Selected Document
              <div style={{ flex: "0 0 100%" }}>
                <Box
                  key={doc.id}
                  width="full"
                  borderRadius="full"
                  padding={["2xl", "3xl", "4xl"]}
                  className={`list-item selected`}
                  onClick={() => onSelectDocument(doc.id)}
                  backgroundColor="background.primary.strong"
                  style={{ padding: "10px" }}
                >
                  <div className="document-name">
                    {doc.name.length > 50 // Adjust the character limit as needed
                      ? `${doc.name.slice(0, 50)}...`
                      : doc.name}
                  </div>
                  <div>
                    <Select
                      className="form-field"
                      items={items}
                      placeholder="Choose an item"
                    />
                    <NumberInput
                      className="form-field"
                      placeholder="Enter a number"
                    />
                    <ImageDropZone
                      className="form-field"
                      buttonLabel="Upload"
                      onValueChange={(files) => {
                        console.log(files);
                      }}
                    />
                  </div>
                </Box>
              </div>
            ) : (
              // Other Documents
              <div>
                <Box
                  key={doc.id}
                  width="full"
                  borderRadius="full"
                  padding={["2xl", "3xl", "4xl"]}
                  className={`list-item`}
                  onClick={() => onSelectDocument(doc.id)}
                  backgroundColor="background.primary.strong"
                  style={{ padding: "10px" }}
                >
                  <div>
                    {doc.thumbnail ? (
                      <img src={doc.thumbnail} alt={`${doc.name} preview`} />
                    ) : (
                      <ProgressSpinner
                        aria-label={"Label"}
                        size="md"
                        style={{ color: "black" }}
                      />
                    )}
                  </div>
                  <div className="document-name">
                    {doc.name.length > 12 // Adjust the character limit as needed
                      ? `${doc.name.slice(0, 12)}...`
                      : doc.name}
                  </div>
                </Box>
              </div>
            )
          )}
        </div>
      </div>
      {documents.length > 0 ? (
        <div className="docs-tab-footer">
          <DocsTabFooter
            selectedDocumentId={selectedDocumentId}
            onDeleteDocument={onDeleteDocument}
          />
        </div>
      ) : null}
    </div>
  );
};

export default DocsTabComponent;
