import { useRef, useState } from "react";
import { PanelResizeHandle } from "@baseline-ui/core";
import "./App.css";
import { usePdfManager } from "./hooks/usePdfManager";
import { useChat } from "./hooks/useChat";
import MainLayout from "./components/Layout/MainLayout";
import Sidebar from "./components/Sidebar/Sidebar";
import MainPanel from "./components/MainPanel/MainPanel";
import ChatPanel from "./components/ChatPanel/ChatPanel";
import DocsTabComponent from "./components/DocTab/DocsTabComponent";
import GenerateTabComponent from "./components/GenerateTab/GenerateTabComponent";

function App() {
  const [selectedTab, setSelectedTab] = useState("generate");
  const panelGroupRef = useRef(null);
  const sidebarRef = useRef(null);

  const {
    documents,
    selectedDocumentId,
    uploadedFile,
    isUploading,
    handleFileUpload,
    handleSelectDocument,
    handleDeleteDocument,
  } = usePdfManager();

  const { messages, extractedText, setExtractedText, handleChatMessageSubmit } =
    useChat();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLayout = (e) => {
    const sidebarSize = e[0];
    // sidebarSize < 15 ? setIsSidebarOpen(false) : setIsSidebarOpen(true);
  };

  const [mainPanelContent, setMainPanelContent] = useState("WEB_SDK");
  const onEditDocument = () => {
    // window.alert("on edit");
    setMainPanelContent("DOC_AUTH");
    
  }

  return (
    <div className="App">
      <MainLayout setOnLayout={handleLayout} panelGroupRef={panelGroupRef}>
        <Sidebar
          key={"Sidebar"}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          documents={documents}
          selectedDocumentId={selectedDocumentId}
          onSelectDocument={handleSelectDocument}
          isUploading={isUploading}
          onFileUpload={handleFileUpload}
          onDeleteDocument={handleDeleteDocument}
          sidebarRef={sidebarRef}
        >
          {selectedTab == "docs" && (
            <DocsTabComponent
              documents={documents}
              selectedDocumentId={selectedDocumentId}
              onSelectDocument={handleSelectDocument}
              isUploading={isUploading}
              onFileUpload={handleFileUpload}
              onDeleteDocument={handleDeleteDocument}
            />
          )}
          {selectedTab == "generate" && <GenerateTabComponent onEditDocument={onEditDocument} />}
        </Sidebar>

        <PanelResizeHandle />

        <MainPanel
          key={"MainPanel"}
          uploadedFile={uploadedFile}
          onTextExtracted={setExtractedText}
          mainPanelContent = {mainPanelContent}
        />

        <PanelResizeHandle />

        <ChatPanel
          key={"ChatPanel"}
          messages={messages}
          onMessageSubmit={handleChatMessageSubmit}
        />
      </MainLayout>
    </div>
  );
}

export default App;
