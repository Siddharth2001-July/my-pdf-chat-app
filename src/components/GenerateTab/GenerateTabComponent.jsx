import React, { useEffect, useState } from "react";
import placeholderData from "../../assets/payload.json";
import { ActionButton, Box, Select, TextInput } from "@baseline-ui/core";
import "./GenerateTabComponent.css";

const GenerateTabComponent = ({ onEditDocument, onGenerateDocument, generateTab }) => {
  const [placeholders, setPlaceholders] = useState(
    generateTab.placeholders
  );
  const [isGenerated, setIsGenerated] = useState(false);

  const handleInputChange = (templatePlaceholder, value) => {
    setPlaceholders((prevPlaceholders) =>
      prevPlaceholders.map((p) =>
        p.templatePlaceholder === templatePlaceholder
          ? { ...p, value: value }
          : p
      )
    );
  };

  return (
    <div>
      <Box
        key={"generateTabContainer"}
        padding="md"
        backgroundColor="background.primary.medium"
        color="text.primary"
        typography="label.md.medium"
        style={{ height: "91vh" }}
      >
        {isGenerated && (
          <ActionButton
            label="Save Document"
            className="action-button action-button-edit"
            size="lg"
            onPress={() => {
              window.alert("Document Saved");
            }}
          />
        )}
        {!isGenerated &&
          placeholders && placeholders.length > 0 &&
          placeholders.map((placeholder) => (
            <Box
              key={`${placeholder.templatePlaceholder}FormBox`}
              padding="md"
              backgroundColor="background.primary.medium"
              color="text.primary"
              typography="label.md.medium"
            >
              {placeholder.isDropdown ? (
                <Select
                  label={placeholder.placeholder}
                  key={placeholder.templatePlaceholder}
                  items={placeholder.values.map((value) => ({
                    id: value,
                    label: value,
                  }))}
                  onSelectionChange={(selectedKey) =>
                    handleInputChange(
                      placeholder.templatePlaceholder,
                      selectedKey
                    )
                  }
                />
              ) : (
                <TextInput
                  key={placeholder.templatePlaceholder}
                  label={placeholder.placeholder}
                  value={placeholder.value ?? placeholder.values.join(", ")}
                  onChange={(value) =>
                    handleInputChange(placeholder.templatePlaceholder, value)
                  }
                />
              )}
            </Box>
          ))}
        {!isGenerated && (
          <div
            style={{
              display: "block",
              // justifyContent: "space-between",
              margin: "10px",
            }}
          >
            <ActionButton
              label="Edit Document"
              className="action-button action-button-edit"
              // style={{ backgroundColor: "#6EB579", width: "100%", color: "#FFFFFF", display: "block", margin: "5px 0px" }}
              size="lg"
              onPress={onEditDocument}
            />
            <ActionButton
              label="Generate"
              className="action-button action-button-generate"
              // style={{ backgroundColor: "#F0C968", width: "100%", color: "#FFFFFF" , display: "block", margin: "5px 0px" }}
              size="lg"
              onPress={() => {
                onGenerateDocument();
                setIsGenerated(true);
              }}
            />
          </div>
        )}
      </Box>
    </div>
  );
};

export default GenerateTabComponent;
