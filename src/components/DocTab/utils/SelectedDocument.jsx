import { Box } from "@baseline-ui/core";
import { DocumentName } from "./SharedComponents";
import DocumentForm from "./DocumentForm"

const SelectedDocument = ({ document, onSelect }) => (
  <div style={{ flex: "0 0 100%" }}>
    <Box
      width="full"
      borderRadius="full"
      padding={["2xl", "3xl", "4xl"]}
      className="list-item selected"
      onClick={onSelect}
      backgroundColor="background.primary.strong"
      style={{ padding: "10px" }}
    >
      <DocumentName name={document.name} maxLength={50} />
      <DocumentForm />
    </Box>
  </div>
);

export default SelectedDocument