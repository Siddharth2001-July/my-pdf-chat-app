import { useState } from "react";
import { PanelResizeHandle } from "@baseline-ui/core";
import "./App.css";
import { usePdfManager } from "./hooks/usePdfManager";
import { useChat } from "./hooks/useChat";
import MainLayout from "./components/Layout/MainLayout";
import Sidebar from "./components/Sidebar/Sidebar";
import MainPanel from "./components/MainPanel/MainPanel";
import ChatPanel from "./components/ChatPanel/ChatPanel";
import DocsTabComponent from "./components/DocTab/DocsTabComponent";

function App() {
  const [selectedTab, setSelectedTab] = useState("generate");

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

  return (
    <div className="App">
      <MainLayout>
        <Sidebar
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          documents={documents}
          selectedDocumentId={selectedDocumentId}
          onSelectDocument={handleSelectDocument}
          isUploading={isUploading}
          onFileUpload={handleFileUpload}
          onDeleteDocument={handleDeleteDocument}
        >
          <DocsTabComponent
            documents={documents}
            selectedDocumentId={selectedDocumentId}
            onSelectDocument={handleSelectDocument}
            isUploading={isUploading}
            onFileUpload={handleFileUpload}
            onDeleteDocument={handleDeleteDocument}
          />
        </Sidebar>

        <PanelResizeHandle />

        <MainPanel
          uploadedFile={uploadedFile}
          onTextExtracted={setExtractedText}
        />

        <PanelResizeHandle />

        <ChatPanel
          messages={messages}
          onMessageSubmit={handleChatMessageSubmit}
        />
      </MainLayout>
    </div>
  );
}

export default App;
