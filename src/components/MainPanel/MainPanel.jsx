import { Panel } from "@baseline-ui/core";
import PdfViewerComponent from "../PdfViewerComponent";

const MainPanel = ({ uploadedFile, onTextExtracted }) => (
  <Panel order={2} defaultSize={60} minSize={40} className="panel main-panel">
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

export default MainPanel;