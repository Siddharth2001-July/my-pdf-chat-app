// src/components/ChatComponent.jsx
import { useState } from "react";
import { ChatDialog } from "@baseline-ui/recipes";

export default function ChatComponent({ onMessageSubmit, messages }) {
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = async (text) => {
    setInputValue("");
    await onMessageSubmit(text);
  };

  const formattedMessages = messages?.map((msg) => ({
    type: "PLAIN",
    text: msg.text,
    sender: msg.sender,
    isComplete: true,
  }));

  return (
    <ChatDialog
      style={{ height: "92vh" }}
      messages={formattedMessages}
      // inputValue={inputValue}
      // onInputChanged={setInputValue}
      // onMessageSubmit={handleSendMessage}
      // variant="full-width"
      isOpen
    />
  );
}
