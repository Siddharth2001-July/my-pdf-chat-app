// src/App.jsx
import PdfViewerComponent from "./components/PdfViewerComponent";
import ChatComponent from "./components/ChatComponent";
import FileUpload from "./components/FileUpload";
import { useState } from "react";
import {
  ThemeProvider,
  I18nProvider,
  Panel,
  PanelGroup,
  PanelResizeHandle,
  Box,
  Tabs,
  TabItem,
  ActionButton,
} from "@baseline-ui/core";
import { PlusIcon } from "@baseline-ui/icons/12";
import "./App.css";
import DocsTabComponent from "./components/DocTab/DocsTabComponent"

function App() {
  const [messages, setMessages] = useState([
    { sender: "Assistant", text: "Hello! How can I help you?" },
  ]);

  const [documents, setDocuments] = useState([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [selectedTab, setSelectedTab] = useState("reports");
  const [isUploading, setIsUploading] = useState(false);

  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (file) => {
    console.log('File received:', file);
    console.log('File type:', file instanceof File);
    console.log('File properties:', {
      name: file?.name,
      size: file?.size,
      type: file?.type,
      constructor: file?.constructor?.name
    });

    if (file instanceof File) {
      setUploadedFile(file);
      // Create a new document entry
      const newDoc = { 
        id: Date.now(), 
        name: file.name,
        file: file
      };
      setDocuments([...documents, newDoc]);
      setSelectedDocumentId(newDoc.id);
    } else {
      console.error('Invalid file object received');
    }
  };

  const [extractedText, setExtractedText] = useState("");

  const handleTextExtraction = (text) => {
    setExtractedText(text);
  };

  const handleChatMessageSubmit = async (message) => {
    const userMessage = { sender: "User", text: message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await fetch(
        "http://localhost:6001/v1/chat/completions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "python1",
            messages: [{ role: "user", content: message }],
            context: {
              document_text: extractedText,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const assistantMessage = {
          sender: "Assistant",
          text: data.choices[0].message.content,
        };
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      } else {
        console.error("Error from backend:", response.statusText);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "Assistant",
            text: "Sorry, there was an error processing your request.",
          },
        ]);
      }
    } catch (error) {
      console.error("Network error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "Assistant",
          text: "Network error: Please check the backend connection.",
        },
      ]);
    }
  };

  const handleNewDocument = () => {
    const newDoc = { id: Date.now(), name: `Document ${documents.length + 1}` };
    setDocuments([...documents, newDoc]);
  };

  const handleSelectDocument = (id) => {
    setSelectedDocumentId(id);
  };

  const handleDeleteDocument = () => {
    setDocuments((prevDocs) =>
      prevDocs.filter((doc) => doc.id !== selectedDocumentId)
    );
    setSelectedDocumentId(null);
  };

  return (
    <div className="App">
      <ThemeProvider>
        <I18nProvider locale="en-US">
          <PanelGroup direction="horizontal">
            {/* Sidebar for File Upload */}
            <Panel
              order={1}
              defaultSize={15}
              minSize={10}
              className="panel sidebar-panel"
            >
              <Box padding="md">
                {/* Tabs for Reports and Docs */}
                <Tabs
                  aria-label="Document Types"
                  selectedValue={selectedTab}
                  onSelectionChange={setSelectedTab}
                >
                  <TabItem value="reports" title="Reports">
                    {/* Content for Reports */}
                    <ActionButton
                      label="New Document"
                      iconBefore={PlusIcon}
                      onPress={handleNewDocument}
                      className="button"
                    />
                    <div className="list">
                      {documents.map((doc) => (
                        <div
                          key={doc.id}
                          onClick={() => handleSelectDocument(doc.id)}
                          className={`list-item ${
                            selectedDocumentId === doc.id ? "selected" : ""
                          }`}
                        >
                          {doc.name}
                        </div>
                      ))}
                    </div>
                    {selectedDocumentId && <Box marginTop="auto"></Box>}
                  </TabItem>
                  <TabItem value="docs" title="Docs">
                    {/* Content for Docs */}
                    {/* Similar structure as Reports */}
                    <DocsTabComponent
                      documents={documents}
                      selectedDocumentId={selectedDocumentId}
                      onSelectDocument={handleSelectDocument}
                      isUploading={isUploading}
                      onFileUpload={handleFileUpload}
                    />
                  </TabItem>
                </Tabs>
              </Box>
            </Panel>

            <PanelResizeHandle />

            {/* Main Section for PDF Viewer */}
            <Panel
              order={2}
              defaultSize={60}
              minSize={40}
              className="panel main-panel"
            >
              <PdfViewerComponent
                document={uploadedFile || "./document.pdf"}
                onTextExtracted={handleTextExtraction}
              />
            </Panel>

            <PanelResizeHandle />

            {/* Aside Section for Chat */}
            <Panel
              order={3}
              defaultSize={25}
              minSize={15}
              className="panel aside-panel"
            >
              <ChatComponent
                onMessageSubmit={handleChatMessageSubmit}
                messages={messages}
              />
            </Panel>
          </PanelGroup>
        </I18nProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
