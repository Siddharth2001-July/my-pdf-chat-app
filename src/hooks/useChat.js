import { useState } from 'react';

export const useChat = () => {
  const [messages, setMessages] = useState([
    { sender: "Assistant", text: "Hello! How can I help you?" },
  ]);
  const [extractedText, setExtractedText] = useState("");

  const handleChatMessageSubmit = async (message) => {
    const userMessage = { sender: "User", text: message };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch("http://localhost:6001/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "python1",
          messages: [{ role: "user", content: message }],
          context: { document_text: extractedText },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage = {
          sender: "Assistant",
          text: data.choices[0].message.content,
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        sender: "Assistant",
        text: `Error: ${error.message || 'Please check the backend connection.'}`,
      }]);
    }
  };

  return {
    messages,
    extractedText,
    setExtractedText,
    handleChatMessageSubmit,
  };
};