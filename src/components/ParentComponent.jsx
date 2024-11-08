import { useState } from 'react';
import FileUpload from './FileUpload';
import PdfViewerComponent from './PdfViewerComponent';

export default function ParentComponent() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const handleFileUpload = (file) => {
    setUploadedFile(file);
  };

  return (
    <div>
      <FileUpload onFileUpload={handleFileUpload} />
      {uploadedFile && (
        <PdfViewerComponent 
          document={uploadedFile}
          onTextExtracted={setExtractedText}
        />
      )}
    </div>
  );
} 