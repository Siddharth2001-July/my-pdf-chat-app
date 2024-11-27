import React, { useState, useEffect } from 'react';
import { Panel } from "@baseline-ui/core";
import PdfViewerComponent from "../PdfViewerComponent";
import DocAuthViewer from "../DocAuth/DocAuthViewer";
import './MainPanel.css';

const AnimatedContent = ({ isVisible, isPrevious, children, contentType }) => {
  return (
    <div 
      className={`animated-content 
        ${isVisible ? 'visible' : ''}
        ${isPrevious ? (contentType === 'WEB_SDK' ? 'hidden-bottom' : 'hidden-top') : ''}`}
      style={{
        zIndex: isVisible ? 1 : 0
      }}
    >
      {children}
    </div>
  );
};

const MainPanel = ({ uploadedFile, onTextExtracted, mainPanelContent }) => {
  const [previousContent, setPreviousContent] = useState(null);
  
  useEffect(() => {
    if (mainPanelContent !== previousContent) {
      setPreviousContent(mainPanelContent);
    }
  }, [mainPanelContent]);

  const isPdfViewerVisible = mainPanelContent === "WEB_SDK";
  const isDocAuthVisible = mainPanelContent === "DOC_AUTH";

  return (
    <Panel 
      order={2} 
      defaultSize={60} 
      minSize={40} 
      className="panel main-panel"
    >
      <div className="animation-container">
        <AnimatedContent 
          isVisible={isPdfViewerVisible}
          isPrevious={previousContent === "DOC_AUTH"}
          contentType="WEB_SDK"
        >
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

        <AnimatedContent 
          isVisible={isDocAuthVisible}
          isPrevious={previousContent === "WEB_SDK"}
          contentType="DOC_AUTH"
        >
          <DocAuthViewer />
        </AnimatedContent>
      </div>
    </Panel>
  );
};

export default MainPanel;