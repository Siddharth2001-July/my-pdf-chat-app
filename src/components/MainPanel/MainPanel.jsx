import { Panel } from "@baseline-ui/core";
import PdfViewerComponent from "../PdfViewerComponent";
import PropTypes from "prop-types";
import TopBar from "./TopBar";
const MainPanel = ({ uploadedFile, onTextExtracted, selectedDocumentId, documents }) => {
  console.log('MainPanel uploadedFile:', uploadedFile);
  console.log('MainPanel uploadedFile type:', uploadedFile instanceof File, typeof uploadedFile);
  
  return (
    <Panel order={2} defaultSize={60} minSize={40} className="panel main-panel">
      <TopBar 
        documents = {documents}
        selectedDocumentId={selectedDocumentId}
      />
      {uploadedFile ? (
        <PdfViewerComponent
          document={uploadedFile}
          onTextExtracted={onTextExtracted}
        />
      ) : (
        <div style={{ marginTop: "45%", fontWeight: 800, textAlign: "center" }}>
          Upload a new document or select from the existing ones.
        </div>
      )}
    </Panel>
  );
};
MainPanel.propTypes = {
  uploadedFile: PropTypes.oneOfType([
    PropTypes.instanceOf(File),
    PropTypes.object  // For when the file comes from cache
  ]),
  onTextExtracted: PropTypes.func.isRequired,
};
export default MainPanel;