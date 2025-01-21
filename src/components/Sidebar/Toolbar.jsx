import { Box, Menu, SearchInput, Separator } from "@baseline-ui/core";
import {
  SearchIcon,
  FolderIcon,
  FilterAltIcon,
  XCircleFilledIcon,
  ArrowUpArrowDownIcon
} from "@baseline-ui/icons/16";
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
    <Box className="toolbar-row">
      {!isCollapsed && (
        <>
          {searchShow ? (
            <div
              className="search-show-container"
            >
              <SearchInput
                aria-label="Search"
                placeholder="Search"
                variant="ghost"
                size="sm"
              />
              <XCircleFilledIcon
                onClick={() => setSearchShow(false)}
                className="close-search"
              />
            </div>
          ) : (
            <>
              <div
                onClick={() => setSearchShow(true)}
                className="search-container"
              >
                <SearchIcon />
              </div>
              <div
                className="menu-items-container"
              >
                <Separator variant="primary" orientation="vertical" className="toolmenu-separator" />
                <Menu
                  items={items}
                  onSelectionChange={function Rs() { }}
                  selectionMode="single"
                  triggerLabel={FolderIcon}
                  defaultSelectedKeys={["all"]}
                  className="menu-item"
                />
                <Separator variant="primary" orientation="vertical" className="toolmenu-separator" />
                <Menu
                  items={multiItems}
                  onSelectionChange={function Rs() { }}
                  selectionMode="multiple"
                  triggerLabel={FilterAltIcon}
                  defaultSelectedKeys={["all"]}
                  className="menu-item"
                />
                <Separator variant="primary" orientation="vertical" className="toolmenu-separator" />
                <Menu
                  items={sortItems}
                  selectionMode="single"
                  defaultSelectedKeys={["oldest"]}
                  onSelectionChange={function Rs() { }}
                  triggerLabel={ArrowUpArrowDownIcon}
                  className="menu-item"
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
