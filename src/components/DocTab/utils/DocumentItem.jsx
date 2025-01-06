import { Box } from "@baseline-ui/core";
import { DocumentName, DocumentPreview } from "./SharedComponents";
import PropTypes from 'prop-types';
import './DocumentItem.css';

const DocumentItem = ({ document, onSelect }) => (
  <div className="document-item">
    {/* {document.thumbnail && (
      <img 
        src={document.thumbnail} 
        alt={`${document.name} thumbnail`}
        className="document-thumbnail"
      />
    )} */}
    <Box
      width="full"
      borderRadius="full"
      padding={["2xl", "3xl", "4xl"]}
      className="list-item"
      onClick={onSelect}
      backgroundColor="background.primary.strong"
      style={{ padding: "10px" }}
    >
      <DocumentPreview document={document} />
      <DocumentName name={document.name} maxLength={12} />
    </Box>
  </div>
);

DocumentItem.propTypes = {
  document: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    file: PropTypes.instanceOf(File)
  }).isRequired,
  onSelect: PropTypes.func.isRequired
};

export default DocumentItem;