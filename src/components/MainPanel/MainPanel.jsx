import { Panel } from "@baseline-ui/core";
import PdfViewerComponent from "../PdfViewerComponent";
import DocAuthViewer from "../DocAuth/DocAuthViewer";

const MainPanel = ({ uploadedFile, onTextExtracted, mainPanelContent }) => (
  <Panel order={2} defaultSize={60} minSize={40} className="panel main-panel">
    {mainPanelContent == "WEB_SDK" ? (
      <>
        {uploadedFile ? (
          <PdfViewerComponent
            document={uploadedFile}
            onTextExtracted={onTextExtracted}
          />
        ) : (
          <div
            style={{ marginTop: "45%", fontWeight: 800, textAlign: "center" }}
          >
            Upload a new document or select from the existing ones.
          </div>
        )}
      </>
    ) : null}
    {mainPanelContent == "DOC_AUTH" ? <DocAuthViewer /> : null}
  </Panel>
);

export default MainPanel;
