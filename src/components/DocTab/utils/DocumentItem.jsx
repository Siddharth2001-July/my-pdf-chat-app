import { Box, ProgressSpinner } from "@baseline-ui/core";
import { DocumentName, DocumentPreview } from "./SharedComponents";

const DocumentItem = ({ document, onSelect }) => (
  <div>
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

export default DocumentItem