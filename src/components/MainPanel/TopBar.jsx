import {
  ActionButton,
  Box,
  Separator,
  Text,
  Toolbar,
} from "@baseline-ui/core";
import { useState } from "react";
import { PagePortraitIcon } from "@baseline-ui/icons/24";
import "./TopBar.css";

const TopBar = ({ documents, selectedDocumentId }) => {
  const [selectedItem, setSelectedItem] = useState("view-markup");

  const handleAction = (actionId) => {
    setSelectedItem(actionId); // Update selected state
  };
  return (
    <Toolbar
      className="topBarContainer">
      <div className="topBarLeft">
        <PagePortraitIcon style={{ width: "24px", height: "24px", color: "var(--bui-color-icon-secondary)" }} />
        <Text style={{ fontSize: "12px", color: "var(--bui-color-text-helper)" }}>
          {(selectedDocumentId && documents.length > 0) ? documents.find(doc => doc.id == selectedDocumentId).name : ""}
        </Text>
      </div>
      <div className="TopBarToggleButtonContainer">
        <Separator className="TopBarSeparator" />
        <ActionButton
          onClick={() => handleAction("view-markup")}
          variant="secondary"
          className="TopBarToggleButton"
          label="View & Markup"
          style={{
            background: `${selectedItem === "view-markup" ? "var(--bui-color-background-interactive-enabled, #4537DE)" : ""
              }`,
            color: `${selectedItem === "view-markup" ? "var(--bui-color-text-oninteractive)" : ""}`,
          }}
        />
        <Separator className="TopBarSeparator" />
        <ActionButton
          variant="secondary"
          className="TopBarToggleButton"
          label="Edit Content"
          onClick={() => handleAction("edit-content")}
          style={{
            backgroundColor: `${selectedItem === "edit-content" ? "#4537DE" : "#fff"
              }`,
            color: `${selectedItem === "edit-content" ? "#fff" : "#000"}`,
          }}
        />
        <Separator className="TopBarSeparator" />
      </div>
      <div className="TopBarRight">
        <ActionButton
          variant="primary"
          size="md"
          isDisabled={true}
          label=" Save Document"
          style={{
            borderRadius: "var(--bui-rounded-xs, 2px)",
            background: "var(--bui-color-background-interactive-disabled, #A9AEB7)",
          }}
        />
      </div>
    </Toolbar>
  );
};

export default TopBar;
