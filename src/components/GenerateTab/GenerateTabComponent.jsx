import React, { useEffect, useState } from "react";
import placeholderData from "../../assets/payload.json";
import { ActionButton, Box, Select, TextInput } from "@baseline-ui/core";
import "./GenerateTabComponent.css"

const GenerateTabComponent = ({onEditDocument}) => {
  const [placeholders, setPlaceholders] = useState(
    placeholderData.placeholders
  );

  useEffect(() => {
    const handleMessage = (event) => {
      // For security, verify the origin of the message
      const allowedOrigin = import.meta.env.VITE_SALESFORCE_DOMAIN;

      if (event.origin !== allowedOrigin) {
        console.warn(
          "Received message from unauthorized origin:",
          event.origin
        );
        return;
      }

      try {
        const data = JSON.parse(event.data);
        if (data.placeholders) {
          console.log("Received placeholders data:", data.placeholders);
          setPlaceholders(data.placeholders);
        } else {
          console.warn("Received message without placeholders:", data);
        }
      } catch (error) {
        console.error("Error parsing message data:", error);
      }
    };

    window.addEventListener("message", handleMessage);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const handleInputChange = (templatePlaceholder, value) => {
    setPlaceholders((prevPlaceholders) =>
      prevPlaceholders.map((p) => p.templatePlaceholder === templatePlaceholder ? { ...p, value: value } : p)
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
        {placeholders.map((placeholder) => (
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
              window.alert("Generate clicked!");
            }}
          />
        </div>
      </Box>
    </div>
  );
};

export default GenerateTabComponent;
