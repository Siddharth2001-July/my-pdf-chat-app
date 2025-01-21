import { Panel, Box, ToggleIconButton, Text, Separator } from "@baseline-ui/core";
import { SidebarIcon } from "@baseline-ui/icons/24";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Toolbar } from "./Toolbar";
import DocsTabComponent from "../DocTab/DocsTabComponent";
import "./Sidebar.css"

const Sidebar = ({ key, sidebarRef, isSidebarOpen, onSelectDocument, selectedDocumentId, isUploading, onFileUpload, onDeleteDocument, documents }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  useEffect(() => {
    isCollapsed
      ? sidebarRef.current?.resize?.(4)
      : sidebarRef.current?.resize?.(19.1);
  }, [isCollapsed])
  return (
    <Panel
      key={key}
      order={1}
      defaultSize={19}
      collapsible={isSidebarOpen}
      className="sidebar"
      collapsedSize={4}
      minSize={4}
      ref={sidebarRef}
    >
      <Box className="sidebar-container">
        <Box className="toggle-sidebar">
          {!isCollapsed && <Text className="header-text" type="title" size="small">Documents</Text>}
          <ToggleIconButton
            aria-label="Toggle Icon Button"
            icon={{
              selected: SidebarIcon,
              unselected: SidebarIcon,
            }}
            size="lg"
            className="toggle-menu"
            onChange={() => setIsCollapsed(!isCollapsed)}
          />
        </Box>
        <Separator variant="primary" orientation="horizontal" className="separator"/>
        <Box className="toolbar-container">
          <Toolbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </Box>
        <Separator variant="primary" orientation="horizontal" className="separator"/>
        {!isCollapsed &&
          <DocsTabComponent
            documents={documents}
            selectedDocumentId={selectedDocumentId}
            onSelectDocument={onSelectDocument}
            isUploading={isUploading}
            onFileUpload={onFileUpload}
            onDeleteDocument={onDeleteDocument}
          />}
      </Box>
    </Panel>
  );
};
Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  key: PropTypes.string.isRequired,
  sidebarRef: PropTypes.object,
};
export default Sidebar;
