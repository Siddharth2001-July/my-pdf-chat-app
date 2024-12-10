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
      style={
        isCollapsed ? { backgroundColor: "#efebe7", boxShadow: "0 0" } : {}
      }
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
          <>
            <Text size="lg" style={{ display: "inline-block", height: "4vh", margin: '5px 10px' }}>
              {generateTab && selectedTab == "generate" ? (
                <>Generate Document</>
              ) : null}
              {docsTab && selectedTab == "docs" ? <>Documents</> : null}
            </Text>
            <Tabs
              aria-label="Document Types"
              selectedValue={selectedTab}
              onSelectionChange={setSelectedTab}
            >
              {docsTab != null && (
                <TabItem value="docs" title="Docs">
                  {children}
                </TabItem>
              )}
              {generateTab != null && (
                <TabItem value="generate" title="Generate">
                  {children}
                </TabItem>
              )}
            </Tabs>
          </>
        )}
      </Box>
    </Panel>
  );
};

export default Sidebar;
