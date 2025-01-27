import { Panel, Text } from "@baseline-ui/core";
import PdfViewerComponent from "../PdfViewerComponent";
import PropTypes from "prop-types";
import TopBar from "./TopBar";
const MainPanel = ({ uploadedFile, onTextExtracted, selectedDocumentId, documents }) => {
  console.log('MainPanel uploadedFile:', uploadedFile);
  console.log('MainPanel uploadedFile type:', uploadedFile instanceof File, typeof uploadedFile);

  return (
    <Panel order={2} defaultSize={60} minSize={40} className="main-panel">
      <TopBar
        documents={documents}
        selectedDocumentId={selectedDocumentId}
      />
      <div className="viewer-cont">
        <div className="viewer-doc-area">
          {uploadedFile ? (
            <PdfViewerComponent
              document={uploadedFile}
              onTextExtracted={onTextExtracted}
            />
          ) : (
            <div className="no-doc-text">
              <Text type="value" size="sm">Upload a new document or select from the existing ones.</Text>
            </div>
          )}
        </div>
      </div>

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