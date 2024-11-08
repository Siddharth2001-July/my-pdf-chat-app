import { Box, Menu, ProgressSpinner, Text } from "@baseline-ui/core";
import { DuplicateIcon, TrashIcon, TypeTextIcon } from "@baseline-ui/icons/24";
import { MenuContentWrapper } from "./helper/MenuContentWrapper";
import React, { forwardRef, useEffect, useState } from "react";
import { clsx } from "clsx";

const menuItems = [
  {
    children: [
      {
        id: "RENAME",
        label: "Rename",
        icon: TypeTextIcon,
      },
      {
        id: "DUPLICATE",
        label: "Duplicate",
        icon: DuplicateIcon,
      },
    ],
    id: "edit-section",
    title: "Edit",
    type: "section",
  },
  {
    children: [
      {
        id: "DELETE",
        label: "Delete",
        icon: TrashIcon,
      },
    ],
    id: "remove-section",
    title: "Remove",
    type: "section",
  },
];

const DocumentPreview = forwardRef(
  ({ docId, deDocumentId, docName, isSelected = false, onClick }, ref) => {
    const [minifiedDocName, setMinifiedDocName] = useState(docName);
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
    const [thumbUrl, setThumbUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDuplicating, setIsDuplicating] = useState(false);

    const minifyFileName = (fileName, maxLength = 9) => {
      const dotIndex = fileName.lastIndexOf(".");
      if (dotIndex === -1) return fileName;

      const name = fileName.substring(0, dotIndex);
      const extension = fileName.substring(dotIndex + 1);
      if (!name) return fileName;

      return name.length > maxLength
        ? `${name.substring(0, maxLength - 5)}...${name.slice(-3)}.${extension}`
        : fileName;
    };

    const onMenuActionClicked = async (menuAction) => {
      switch (menuAction) {
        case "RENAME":
          // Implement rename logic
          break;
        case "DUPLICATE":
          // Implement duplicate logic
          break;
        case "DELETE":
          // Implement delete logic
          break;
        default:
          break;
      }
    };

    useEffect(() => {
      const minifiedName = minifyFileName(docName);
      setMinifiedDocName(minifiedName);
    }, [docName]);

    useEffect(() => {
      const getThumb = async () => {
        // Implement your thumbnail fetching logic here
        return `path/to/thumbnail/${deDocumentId}`;
      };

      getThumb().then((r) => {
        setThumbUrl(r);
      });
    }, [deDocumentId]);

    const isPerformingAction =
      !thumbUrl || isLoading || isUpdating || isDuplicating;
    const documentOrThumbExists = document && thumbUrl;
    const shouldRenderLoadingIndicator = () =>
      !documentOrThumbExists || isPerformingAction;

    if (shouldRenderLoadingIndicator()) {
      return (
        <Box
          ref={ref}
          className="flex flex-col items-center justify-center gap-2"
        >
          <span className="shadow-elevation-sm flex h-[164px] w-[124px] items-center justify-center">
            <ProgressSpinner aria-label="Label" size="md" />
          </span>
          <Box
            typography="label.md.medium"
            borderRadius="full"
            paddingY="sm"
            paddingX="md"
            color={isSelected ? "text.inverse" : "text.secondary"}
            backgroundColor={
              isSelected
                ? "background.inverse.strong"
                : "background.secondary.subtle"
            }
            className="flex h-[27px] w-full animate-pulse items-center justify-center text-center"
          />
        </Box>
      );
    }

    return (
      <Box
        ref={ref}
        className="flex flex-col items-center justify-center gap-2"
      >
        <Menu
          className="w-[215px]"
          offset={20}
          onOpenChange={(e) => setIsContextMenuOpen(e)}
          placement="right top"
          isOpen={isContextMenuOpen}
          items={menuItems}
          onAction={onMenuActionClicked}
        >
          <MenuContentWrapper>
            <img
              tabIndex={0}
              className={clsx([
                "shadow-elevation-sm block h-[164px] w-[124px] cursor-pointer object-cover outline-none outline-offset-0 transition-all",
                isSelected &&
                  "outline-2 outline-[var(--bui-color-border-interactive)]",
                "hover:outline-2 hover:outline-[var(--bui-color-border-interactive)]",
                "focus-visible:outline-2 focus-visible:outline-[var(--bui-color-border-interactive)]",
              ])}
              onClick={onClick}
              src={thumbUrl}
              // Remove the priority prop as it's Next.js specific
              alt={docName}
              onContextMenu={(e) => {
                e.preventDefault();
                setIsContextMenuOpen(true);
              }}
            />
          </MenuContentWrapper>
        </Menu>
        <Box
          typography="label.md.medium"
          borderRadius="full"
          paddingY="sm"
          paddingX="md"
          color={isSelected ? "text.inverse" : "text.secondary"}
          backgroundColor={
            isSelected
              ? "background.inverse.strong"
              : "background.secondary.subtle"
          }
        >
          <Text
            className="text-inherit"
            title={docName}
            type="label"
            size="lg"
            elementType="p"
            placeholder="document name"
          >
            {minifiedDocName}
          </Text>
        </Box>
      </Box>
    );
  }
);

DocumentPreview.displayName = "DocumentPreview";

export default DocumentPreview;
