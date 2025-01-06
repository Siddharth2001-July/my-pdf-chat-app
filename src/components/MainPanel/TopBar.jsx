import {
  ActionButton,
  Box,
  Text,
  Toolbar,
} from "@baseline-ui/core";
import { useState } from "react";
import { DocumentArrowRightIcon } from "@baseline-ui/icons/24";
const TopBar = ({documents, selectedDocumentId}) => {
  const [selectedItem, setSelectedItem] = useState("view-markup");
  
  const handleAction = (actionId) => { 
    setSelectedItem(actionId); // Update selected state
  };
  return (
    <Box backgroundColor="background.primary.strong">
      <Toolbar
        className="topBar"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <DocumentArrowRightIcon style={{ width: "24px", height: "24px" }} />
          <Text variant="body1" style={{ fontSize: "12px", color: "#606671" }}>
            {(selectedDocumentId && documents.length > 0) ? documents.find(doc => doc.id == selectedDocumentId).name: ""}
          </Text>
        </div>
        <div>
          <ActionButton
            onClick={() => handleAction("view-markup")}
            variant="secondary"
            className="document-save"
            label="View & Markup"
            style={{
              height: "100%",
              minHeight: "48px",
              backgroundColor: `${
                selectedItem === "view-markup" ? "#4537DE" : "#fff"
              }`,
              color: `${selectedItem === "view-markup" ? "#fff" : "#000"}`,
              borderRadius: "0px",
              border: "none",
              boxShadow: "none",
            }}
          />
          <ActionButton
            variant="secondary"
            className="document-save"
            label="Edit Content"
            onClick={() => handleAction("edit-content")}
            style={{
              height: "100%",
              minHeight: "48px",
              backgroundColor: `${
                selectedItem === "edit-content" ? "#4537DE" : "#fff"
              }`,
              color: `${selectedItem === "edit-content" ? "#fff" : "#000"}`,
              borderRadius: "0px",
              border: "none",
              boxShadow: "none",
            }}
          />
        </div>
        <ActionButton
          variant="secondary"
          className="document-save"
          label=" Save Document"
          style={{
            height: "100%",
            minHeight: "40px",
            backgroundColor: "#A9AEB7",
            color: "#fff",
            borderRadius: "5px",
          }}
        />
      </Toolbar>
    </Box>
  );
};

export default TopBar;
