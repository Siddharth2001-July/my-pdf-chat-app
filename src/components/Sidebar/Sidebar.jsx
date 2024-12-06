import { Panel, Box, Tabs, TabItem, ToggleIconButton } from "@baseline-ui/core";
import { CaretLeftIcon, CaretRightIcon } from "@baseline-ui/icons/20";
import { useState } from "react";

const Sidebar = ({
  selectedTab,
  setSelectedTab,
  key,
  children,
  sidebarRef,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const collapse = (isCollapsed) => {
    setIsCollapsed(isCollapsed);
    isCollapsed
      ? sidebarRef.current?.resize?.(5)
      : sidebarRef.current?.resize?.(22);
  };
  return (
    <Panel
      key={key}
      order={1}
      defaultSize={22}
      className="panel sidebar-panel"
      collapsible={true}
      collapsedSize={5}
      minSize={5}
      ref={sidebarRef}
    >
      <Box padding="md">
        <ToggleIconButton
          aria-label="Toggle Icon Button"
          icon={{
            selected: CaretRightIcon,
            unselected: CaretLeftIcon,
          }}
          size="sm"
          onChange={collapse}
        />
        {isCollapsed ? null : (
          <Tabs
            aria-label="Document Types"
            selectedValue={selectedTab}
            onSelectionChange={setSelectedTab}
          >
            <TabItem value="docs" title="Docs">
              {children}
            </TabItem>
            <TabItem value="generate" title="Generate">
              {children}
            </TabItem>
          </Tabs>
        )}
      </Box>
    </Panel>
  );
};

export default Sidebar;
