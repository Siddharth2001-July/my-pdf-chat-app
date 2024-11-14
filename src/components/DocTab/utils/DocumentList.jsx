import DocumentItem from "./DocumentItem";
import SelectedDocument from "./SelectedDocument";
import UploadButton from "./UploadButton";

const DocumentList = ({
  documents,
  selectedDocumentId,
  onSelectDocument,
  onUploadClick,
}) => (
  <div className="list">
    <UploadButton onClick={onUploadClick} />
    {documents.map((doc) =>
      selectedDocumentId === doc.id ? (
        <SelectedDocument
          key={doc.id}
          document={doc}
          onSelect={() => onSelectDocument(doc.id)}
        />
      ) : (
        <DocumentItem
          key={doc.id}
          document={doc}
          onSelect={() => onSelectDocument(doc.id)}
        />
      )
    )}
  </div>
);

export default DocumentList