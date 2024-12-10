import { useEffect, useRef, useState } from "react";
import { DateFormat, PanelResizeHandle } from "@baseline-ui/core";
import "./App.css";
import { usePdfManager } from "./hooks/usePdfManager";
import { useChat } from "./hooks/useChat";
import MainLayout from "./components/Layout/MainLayout";
import Sidebar from "./components/Sidebar/Sidebar";
import MainPanel from "./components/MainPanel/MainPanel";
import ChatPanel from "./components/ChatPanel/ChatPanel";
import DocsTabComponent from "./components/DocTab/DocsTabComponent";
import GenerateTabComponent from "./components/GenerateTab/GenerateTabComponent";
import { SDK } from "./constantsAndEnums/enums";
import placeholderData from "./assets/payload.json";

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
  const [showAIAssistant, setShowAIAssistant] = useState(true);
  const [generateTab, setGenerateTab] = useState(null);
  const [docsTab, setDocsTab] = useState(null);

  useEffect(() => {
    let postMessage = {
      initialSDK: SDK.WEB_SDK,
      initialDocuments: [
        {
          id: "initial1",
          name: "Intial Document 1",
          file: "locationToPDF",
          thumbnail: "",
        },
      ],
      showAIAssistant: true,
      generateTab: placeholderData || null,
      docsTab: {} || null,
    };
    if (postMessage) {
      setMainPanelContent(postMessage.initialSDK);
      setShowAIAssistant(postMessage.showAIAssistant);
      setGenerateTab(postMessage.generateTab);
      setDocsTab(postMessage.docsTab);
    }
    const handleMessage = (event) => {
      // For security, verify the origin of the message
      const allowedOrigin = import.meta.env.VITE_SALESFORCE_DOMAIN;

      if (event.origin !== allowedOrigin) {
        console.warn(
          "Received message from unauthorized origin:",
          event.origin,
        );
        return;
      }

      const data = JSON.parse(event.data);
      if (data) {
        setMainPanelContent(data.initialSDK);
        setShowAIAssistant(data.showAIAssistant);
        setGenerateTab(data.generateTab);
        setDocsTab(data.docsTab);
      }
    };
    window.addEventListener("message", handleMessage);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const onEditDocument = () => {
    setMainPanelContent("DOC_AUTH");
  };

  const onGenerateDocument = () => {
    setMainPanelContent("WEB_SDK");
  };

  return (
    <div className="App">
      <MainLayout setOnLayout={handleLayout} panelGroupRef={panelGroupRef}>
        {(docsTab || generateTab) && (
          <>
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
              docsTab={docsTab}
              generateTab={generateTab}
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
              {selectedTab == "generate" && (
                <GenerateTabComponent
                  onEditDocument={onEditDocument}
                  onGenerateDocument={onGenerateDocument}
                  generateTab={generateTab}
                />
              )}
            </Sidebar>

            <PanelResizeHandle className="resizeBar" />
          </>
        )}

        <MainPanel
          key={"MainPanel"}
          uploadedFile={uploadedFile}
          onTextExtracted={setExtractedText}
          mainPanelContent={mainPanelContent}
        />

        {showAIAssistant && (
          <>
            <PanelResizeHandle className="resizeBar" />

            <ChatPanel
              key={"ChatPanel"}
              messages={messages}
              onMessageSubmit={handleChatMessageSubmit}
            />
          </>
        )}
      </MainLayout>
    </div>
  );
}

export default App;
