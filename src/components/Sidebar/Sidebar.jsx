import { Panel, Box, ToggleIconButton } from "@baseline-ui/core";
import { SidebarIcon } from "@baseline-ui/icons/24";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Toolbar } from "../Toolbar";
import DocsTabComponent from "../DocTab/DocsTabComponent";

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
      defaultSize={19.1}
      className={`panel sidebar-panel ${isCollapsed ? 'sidebar-collapsed' : ''} `}
      collapsible={isSidebarOpen}
      collapsedSize={4}
      minSize={4}
      ref={sidebarRef}
    >
      <Box backgroundColor="background.primary.strong">
        <Box className="toggle-sidebar">
          {!isCollapsed && <span className="pl-1">Documents</span>}
          <ToggleIconButton
            aria-label="Toggle Icon Button"
            icon={{
              selected: SidebarIcon,
              unselected: SidebarIcon,
            }}
            size="sm"
            onChange={() => setIsCollapsed(!isCollapsed)}
          />
        </Box>
        <Box>
          <Toolbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </Box>
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
