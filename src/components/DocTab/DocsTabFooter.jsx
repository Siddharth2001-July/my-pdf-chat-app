import {
  ActionButton,
  Box,
  Dialog,
  DialogTitle,
  Modal,
  ModalContent,
  ModalTrigger,
  Tooltip,
} from "@baseline-ui/core";
import { TrashIcon } from "@baseline-ui/icons/24/index";
import PropTypes from "prop-types";
import { DuplicateIcon } from "@baseline-ui/icons/20";
import { useState } from "react";

export const DocsTabFooter = ({ selectedDocumentId, onDeleteDocument }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = async () => {
    if (selectedDocumentId) {
      await onDeleteDocument(selectedDocumentId);
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          <Dialog size="sm">
            <DialogTitle style={{ padding: "12px" }}>
              <p>Are you sure you want to permanently delete this document?</p>
            </DialogTitle>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                gap: "10px",
              }}
            >
              <ActionButton
                label="Cancel"
                variant="secondary"
                className="btn-secondary"
                style={{ width: "48%", justifyContent: "center" }}
                onClick={() => setIsOpen(false)}
              />
              <ActionButton
                variant="error"
                label="Delete"
                className="btn-danger"
                style={{ width: "48%", justifyContent: "center" }}
                onClick={() => handleDelete()}
                isDisabled={!selectedDocumentId}
              />
            </div>
          </Dialog>
        </ModalContent>
      </Modal>
      <Box
        style={{ display: "flex", justifyContent: "center" }}
        className="document-footer"
      >
        <Tooltip text="Duplicate" delay={0} closeDelay={1000} placement="top">
          <ActionButton
            style={{
              width: "50%",
              padding: "5px",
              minHeight: "50px",
              justifyContent: "center",
            }}
            label={<DuplicateIcon style={{ width: '20px', height: '20px'}} />}
            // onClick={() => setIsOpen(true)}
          />
        </Tooltip>
        <ModalTrigger>
          <ActionButton
            style={{
              width: "50%",
              padding: "5px",
              minHeight: "50px",
              justifyContent: "center",
            }}
            label={<TrashIcon style={{ width: '20px', height: '20px'}} />}
            onClick={() => setIsOpen(true)}
          />
        </ModalTrigger>
      </Box>
    </>
  );
};
DocsTabFooter.propTypes = {
  selectedDocumentId: PropTypes.string.isRequired,
  onDeleteDocument: PropTypes.func.isRequired,
};
