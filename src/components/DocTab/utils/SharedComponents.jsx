import PropTypes from 'prop-types';
import { ProgressSpinner } from "@baseline-ui/core";

export const DocumentPreview = ({ document }) => {
  console.log(document, "document");

  return (
    <div>
      {document.thumbnail ? (
        <img src={document.thumbnail} alt={`${document.name} preview`} />
      ) : (
        <ProgressSpinner
          aria-label="Loading"
          size="md"
          style={{ color: "black" }}
        />
      )}
    </div>
  );
};

DocumentPreview.propTypes = {
  document: PropTypes.shape({
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.string
  }).isRequired
};

export const DocumentName = ({ name, maxLength }) => (
  <div className="document-name">
    {name.length > maxLength ? `${name.slice(0, maxLength)}...` : name}
  </div>
);

DocumentName.propTypes = {
  name: PropTypes.string.isRequired,
  maxLength: PropTypes.number.isRequired
};
