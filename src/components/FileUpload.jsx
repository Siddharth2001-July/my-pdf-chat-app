import { useState } from "react";

export default function FileUpload({ onFileUpload }) {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && onFileUpload) {
      onFileUpload(file);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        border: "2px dashed #bbb",
        padding: "1rem",
        borderRadius: "8px",
        textAlign: "center",
        backgroundColor: dragOver ? "#e0e0e0" : "#f4f4f4"
      }}
    >
      {dragOver ? "Drop the file here" : "Drag and drop a PDF here"}
    </div>
  );
}