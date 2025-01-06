import { ImageGallery } from "@baseline-ui/core";
import PropTypes from "prop-types";

export const PDFGallery = ({
  selectedDocumentId,
  onSelectDocument,
  allDocuments,
}) => {
    console.log(allDocuments, "allDocuments");
  return (
    <>
      {allDocuments?.length > 0 ? (
        <ImageGallery
          aria-label="PDF gallery"
          defaultItems={allDocuments}
          enableReorder={true}
          selectionMode="single"
          fit="cover"
          selectionBehavior="replace"
          onSelectionChange={(e) => {
            console.log(e);
          }}
          onSelect={(id) => {
            if (id !== "upload-button") {
              onSelectDocument(id);
            }
          }}
          selectedItemId={selectedDocumentId}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "16px",
            padding: "16px",
          }}
        />
      ) : (
        ""
      )}
    </>
  );
};

PDFGallery.propTypes = {
  allDocuments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      thumbnail: PropTypes.string,
    })
  ).isRequired,
  selectedDocumentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelectDocument: PropTypes.func.isRequired,
  onUploadClick: PropTypes.func.isRequired,
};
