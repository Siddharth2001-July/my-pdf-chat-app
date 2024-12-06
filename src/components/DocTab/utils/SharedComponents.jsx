import {ProgressSpinner} from "@baseline-ui/core"
export const DocumentPreview = ({ document }) => (
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

export const DocumentName = ({ name, maxLength }) => (
  <div className="document-name">
    {name.length > maxLength ? `${name.slice(0, maxLength)}...` : name}
  </div>
);
