import { Box, Menu, SearchInput } from "@baseline-ui/core";
import { StrikeoutTextAltIcon } from "@baseline-ui/icons/16";
import { SearchIcon } from "@baseline-ui/icons/20";
import {
  FolderIcon,
  FilterIcon,
  XCircleFilledIcon,
} from "@baseline-ui/icons/24";
import PropTypes from "prop-types";
import { useState } from "react";

export const Toolbar = ({ isCollapsed, setIsCollapsed }) => {
  const [searchShow, setSearchShow] = useState(false);
  const items = [
    {
      label: "All",
      id: "all",
    },
    {
      label: "Salesforce",
      id: "salesforce",
    },
    {
      label: "Google Drive",
      id: "drive",
    },
    {
      label: "My Custom Folder",
      id: "custom_folder",
    }
  ];
  const multiItems = [
    {
      label: "All",
      id: "all",
    },
    {
      label: "Salesforce",
      id: "salesforce",
    },
    {
      label: "Google Drive",
      id: "drive",
    },
    {
      label: "My Custom Folder",
      id: "custom_folder",
    },
  ];
  const sortItems = [
    {
      label: "Newest",
      id: "newest",
    },
    {
      label: "Oldest",
      id: "oldest",
    },
    {
      label: "Name (A - Z)",
      id: "name",
    },
    {
      label: "Recently used",
      id: "recent_used",
    },
  ];
  const handleSearchShow = () => {
    setSearchShow(true);
    setIsCollapsed(false);
  };
  return (
    <Box backgroundColor="background.primary.strong" className="toolBar">
      {isCollapsed ? (
        <div
          onClick={() => handleSearchShow()}
          style={{ display: "flex", alignItems: "center", height: "52px" }}
        >
          <SearchIcon />
        </div>
      ) : (
        <>
          {searchShow ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                width: "100%",
              }}
            >
              <SearchInput
                aria-label="Search"
                placeholder="Search"
                style={{ width: "100%" }}
              />
              <XCircleFilledIcon
                onClick={() => setSearchShow(false)}
                style={{ width: "22px", height: "22px" }}
              />
            </div>
          ) : (
            <>
              <div
                onClick={() => setSearchShow(true)}
                style={{
                  width: "40%",
                  height: "52px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <SearchIcon />
              </div>
              <div
                style={{
                  width: "20%",
                }}
              >
                <Menu
                  items={items}
                  onSelectionChange={function Rs() {}}
                  selectionMode="single"
                  triggerLabel={FolderIcon}
                  defaultSelectedKeys={["all"]}
                />
              </div>
              <div style={{ width: "20%" }}>
                <Menu
                  items={multiItems}
                  onSelectionChange={function Rs() {}}
                  selectionMode="multiple"
                  triggerLabel={FilterIcon}
                  defaultSelectedKeys={["all"]}
                />
              </div>
              <div style={{ width: "20%" }}>
                <Menu
                  items={sortItems}
                  selectionMode="single"
                  defaultSelectedKeys={["oldest"]}
                  onSelectionChange={function Rs() {}}
                  triggerLabel={StrikeoutTextAltIcon}
                />
              </div>
            </>
          )}
        </>
      )}
    </Box>
  );
};
Toolbar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  sidebarRef: PropTypes.object,
  setIsCollapsed: PropTypes.func.isRequired,
};
