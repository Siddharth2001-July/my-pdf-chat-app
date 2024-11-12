import { Box } from "@baseline-ui/core";
import { TrashIcon } from "@baseline-ui/icons/24/index";
import React from "react";
import { ActionIconButton as BUIActionIconButton } from "@baseline-ui/core";

export const DocsTabFooter = ({ selectedDocumentId, onDeleteDocument }) => {
  const handleDelete = async () => {
    if (selectedDocumentId) {
      await onDeleteDocument(selectedDocumentId);
    }
  };

  return (
    <Box display="flex">
      <BUIActionIconButton
        style={{ width: "90%" }}
        icon={TrashIcon}
        onPress={handleDelete}
        isDisabled={!selectedDocumentId}
      />
    </Box>
  );
};
