import React from 'react';
import { Panel } from "@baseline-ui/core";
import PdfViewerComponent from "../PdfViewerComponent";
import DocAuthViewer from "../DocAuth/DocAuthViewer";
import './MainPanel.css';

const AnimatedContent = ({ isVisible, children }) => {
  return (
    <div className={`animated-content ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  );
};

const MainPanel = ({ uploadedFile, onTextExtracted, mainPanelContent }) => {
  const isPdfViewerVisible = mainPanelContent === "WEB_SDK";
  const isDocAuthVisible = mainPanelContent === "DOC_AUTH";

  return (
    <Panel 
      order={2} 
      defaultSize={60} 
      minSize={40} 
      className="panel main-panel"
    >
      <AnimatedContent isVisible={isPdfViewerVisible}>
        {uploadedFile ? (
          <PdfViewerComponent
            document={uploadedFile}
            onTextExtracted={onTextExtracted}
          />
        ) : (
          <div className="upload-message">
            Upload a new document or select from the existing ones.
          </div>
        )}
      </AnimatedContent>

      <AnimatedContent isVisible={isDocAuthVisible}>
        {isDocAuthVisible && <DocAuthViewer />}
      </AnimatedContent>
    </Panel>
  );
};

export default MainPanel;