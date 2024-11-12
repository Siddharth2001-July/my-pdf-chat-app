// src/App.jsx
import PdfViewerComponent from "./components/PdfViewerComponent";
import ChatComponent from "./components/ChatComponent";
import FileUpload from "./components/FileUpload";
import { useState, useEffect } from "react";
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
import DocsTabComponent from "./components/DocTab/DocsTabComponent";
import { pdfCache } from "./utils/pdfCache";

function App() {
  const [messages, setMessages] = useState([
    { sender: "Assistant", text: "Hello! How can I help you?" },
  ]);

  const [documents, setDocuments] = useState([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [selectedTab, setSelectedTab] = useState("docs");
  const [isUploading, setIsUploading] = useState(false);

  const [uploadedFile, setUploadedFile] = useState(null);

  // Load cached PDFs on component mount
  useEffect(() => {
    const loadCachedPdfs = async () => {
      try {
        const cachedPdfs = await pdfCache.getAllPdfs();
        if (cachedPdfs.length > 0) {
          setDocuments(cachedPdfs);
        }
      } catch (error) {
        console.error("Error loading cached PDFs:", error);
      }
    };

    loadCachedPdfs();
  }, []);

  const handleFileUpload = async (file) => {
    console.log("File received:", file);
    console.log("File type:", file instanceof File);
    console.log("File properties:", {
      name: file?.name,
      size: file?.size,
      type: file?.type,
      constructor: file?.constructor?.name,
    });

    if (file instanceof File) {
      // Create a new document entry
      const newDoc = {
        id: Date.now(),
        name: file.name,
        file: file,
        thumbnail: "",
      };
      setDocuments([...documents, newDoc]);
      setSelectedDocumentId(newDoc.id);
      setUploadedFile(file);

      // Function to generate thumbnail with retry mechanism
      const generateThumbnail = async (
        docId,
        maxRetries = 100,
        retryInterval = 500
      ) => {
        let retries = 0;

        while (retries < maxRetries) {
          try {
            if (!window.instance) {
              console.log(
                `Waiting for PDF to load... (Attempt ${
                  retries + 1
                }/${maxRetries})`
              );
              await new Promise((resolve) =>
                setTimeout(resolve, retryInterval)
              );
              retries++;
              continue;
            }

            const thumbnailUrl = await window.instance.renderPageAsImageURL(
              { width: 200 },
              0
            );

            const updatedDoc = {
              ...newDoc,
              thumbnail: thumbnailUrl,
            };

            // Update state and cache the PDF with thumbnail
            setDocuments((prevDocs) =>
              prevDocs.map((doc) => (doc.id === docId ? updatedDoc : doc))
            );

            // Cache the PDF with its thumbnail
            await pdfCache.storePdf(updatedDoc);
            console.log("PDF cached successfully");
            console.log("Thumbnail generated successfully");
            return;
          } catch (error) {
            console.error("Error generating thumbnail:", error);
            retries++;
          }
        }

        console.error("Failed to generate thumbnail: Max retries reached");
      };
      // Start the thumbnail generation process
      await generateThumbnail(newDoc.id);
    } else {
      console.error("Invalid file object received");
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
    // Get the selected document
    const selectedDoc = documents.find((doc) => doc.id === id);
    if (selectedDoc) {
      setUploadedFile(selectedDoc.file);
    }
  };

  const handleDeleteDocument = async (id) => {
    try {
      await pdfCache.deletePdf(id);
      setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
      if (selectedDocumentId === id) {
        setSelectedDocumentId(null);
        setUploadedFile(null);
      }
    } catch (error) {
      console.error("Error deleting PDF:", error);
    }
  };

  return (
    <div className="App">
      <ThemeProvider>
        <I18nProvider locale="en-US">
          <PanelGroup direction="horizontal">
            {/* Sidebar for File Upload */}
            <Panel
              order={1}
              defaultSize={22}
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
                      onDeleteDocument={handleDeleteDocument}
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
              {uploadedFile ? (
                <PdfViewerComponent
                  document={uploadedFile || "./document.pdf"}
                  onTextExtracted={handleTextExtraction}
                />
              ) : (
                <div
                  style={{
                    marginTop: "45%",
                    fontWeight: 800,
                    textAlign: "center",
                  }}
                >
                  Upload a new document or select from the existing ones.
                </div>
              )}
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
