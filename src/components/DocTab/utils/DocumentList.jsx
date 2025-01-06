import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  ImageGallery,
  ProgressSpinner,
  Tooltip,
  Menu,
  // MenuItem,
} from "@baseline-ui/core"; // Import Menu and MenuItem instead of ComboBox
import { truncateText } from "../../TruncateText";
import UploadButton from "./UploadButton";
const sortItems = [
  {
    label: "Newest",
    id: "newest",
  },
  {
    label: "Oldest",
    id: "oldest",
  },
  {
    label: "Name (A - Z)",
    id: "name",
  },
  {
    label: "Recently used",
    id: "recent_used",
  },
];
const DocumentList = ({
  documents = [],
  selectedDocumentId,
  onSelectDocument,
  onUploadClick,
  handleFileChange,
  fileInputRef,
}) => {
  const uploadItem = {
    id: "upload-button",
    alt: "Upload PDF",
    label: (
      <Tooltip content="Upload PDF">
        <span>
          <UploadButton
            onClick={(e) => {
              e.stopPropagation();
              onUploadClick();
            }}
          />
        </span>
      </Tooltip>
    ),
    src: "/assets/drop-thumbnail.jpg",
  };

  const [allDocuments, setAllDocuments] = useState([]);
  const [dropdownPosition, setDropdownPosition] = useState(null);
  const [rightClickedItem, setRightClickedItem] = useState(null);

  useEffect(() => {
    const updatedDocuments = [
      ...documents.map((doc) => ({
        id: doc.id,
        alt: doc.name,
        label: (
          <Tooltip content={doc.name}>
            <span>{truncateText(doc.name)}</span>
          </Tooltip>
        ),
        src: doc.thumbnail || "/placeholder.png",
      })),
    ];
    setAllDocuments(updatedDocuments);
  }, [documents]);

  const handleContextMenu = (event, item) => {
    event.preventDefault();
    setRightClickedItem(item);
    setDropdownPosition({
      top: event.clientY,
      left: event.clientX,
    });
  };

  const handleMenuAction = (action) => {
    if (rightClickedItem) {
      console.log(`Performing "${action}" on`, rightClickedItem);
      // Add your custom action logic here
    }
    setDropdownPosition(null); // Close the menu
  };

  const handleCloseMenu = () => {
    setDropdownPosition(null); // Close menu on outside click
  };

  const renderItemsWithContextMenu = (items) =>
    items.map((item) => ({
      ...item,
      label: (
        <div
          onContextMenu={(event) => handleContextMenu(event, item)}
          style={{ display: "inline-block", width: "100%" }}
        >
          {item.label}
        </div>
      ),
    }));

  return (
    <div onClick={handleCloseMenu} style={{ position: "relative" }}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {allDocuments?.length === 0 || allDocuments?.length > 0 ? (
        <div style={{ position: 'relative'}}>
          <ImageGallery
            aria-label="PDF gallery"
            items={renderItemsWithContextMenu([uploadItem, ...allDocuments])}
            enableReorder={true}
            selectionMode="single"
            fit="cover"
            selectionBehavior="replace"
            onSelectionChange={(e) => {
              if (e.anchorKey !== "upload-button") {
                onSelectDocument(e?.anchorKey);
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
          {dropdownPosition && (
            <Menu
              isOpen={rightClickedItem}
              onClose={handleCloseMenu}
              items={sortItems}
            />
          )}
        </div>
      ) : (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ProgressSpinner aria-label="Loading..." />
        </div>
      )}
    </div>
  );
};

DocumentList.propTypes = {
  documents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  selectedDocumentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelectDocument: PropTypes.func.isRequired,
  onUploadClick: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  fileInputRef: PropTypes.object.isRequired,
};

export default DocumentList;
