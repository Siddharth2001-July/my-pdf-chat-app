import { useRef, useState, useEffect } from "react";
import { ActionButton, PanelResizeHandle } from "@baseline-ui/core";
import "./App.css";
import { usePdfManager } from "./hooks/usePdfManager";
import { useChat } from "./hooks/useChat";
import MainLayout from "./components/Layout/MainLayout";
import Sidebar from "./components/Sidebar/Sidebar";
import MainPanel from "./components/MainPanel/MainPanel";
import { AiIcon } from "@baseline-ui/icons/24";
import ChatPanel from "./components/ChatPanel/ChatPanel";

const DebugComponent = ({ uploadedFile }) => {
  useEffect(() => {
    console.log('Debug Component - uploadedFile:', uploadedFile);
  }, [uploadedFile]);
  return null;
};

function App() {
  const panelGroupRef = useRef();
  const sidebarRef = useRef();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const {
    documents,
    selectedDocumentId,
    uploadedFile,
    isUploading,
    handleFileUpload,
    handleSelectDocument,
    handleDeleteDocument,
  } = usePdfManager();

  const { messages, setExtractedText, handleChatMessageSubmit } = useChat();
  const [chatPenalShow, setChatPenalShow] = useState(false);
  const handleLayout = (e) => {
    const sidebarSize = e[0];
    sidebarSize < 15 ? setIsSidebarOpen(false) : setIsSidebarOpen(true);
  };
  // console.log(isOpen)

  useEffect(() => {
    console.log('App: uploadedFile changed:', uploadedFile);
    console.log('App: selectedDocumentId changed:', selectedDocumentId);
  }, [uploadedFile, selectedDocumentId]);

  return (
    <div className="App">
      <MainLayout setOnLayout={handleLayout} panelGroupRef={panelGroupRef}>
        <Sidebar
          key={"Sidebar"}
          documents={documents}
          selectedDocumentId={selectedDocumentId}
          onSelectDocument={handleSelectDocument}
          isUploading={isUploading}
          onFileUpload={handleFileUpload}
          onDeleteDocument={handleDeleteDocument}
          sidebarRef={sidebarRef}
          isSidebarOpen={isSidebarOpen}
        />

        <PanelResizeHandle />
        <MainPanel
          key={"MainPanel"}
          uploadedFile={uploadedFile}
          onTextExtracted={setExtractedText}
          selectedDocumentId={selectedDocumentId}
          documents={documents}
        />
        {chatPenalShow && (
          <ChatPanel
            key={"ChatPanel"}
            messages={messages}
            setChatPenalShow={setChatPenalShow}
            onMessageSubmit={handleChatMessageSubmit}
          />
        )}
        {!chatPenalShow && (
          <ActionButton
            label={<AiIcon style={{color: "var(--bui-color-icon-oninteractive) !important"}}/>}
            variant="primary"
            className="AiButton"
            onClick={() => setChatPenalShow(!chatPenalShow)}
          />
        )}
      </MainLayout>
    </div>
  );
}

export default App;
