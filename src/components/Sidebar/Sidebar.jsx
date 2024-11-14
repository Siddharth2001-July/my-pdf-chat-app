import { Panel, Box, Tabs, TabItem } from "@baseline-ui/core";

const Sidebar = ({
  selectedTab,
  setSelectedTab,
  children
}) => (
  <Panel
    order={1}
    defaultSize={22}
    minSize={10}
    className="panel sidebar-panel"
  >
    <Box padding="md">
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
    </Box>
  </Panel>
);

export default Sidebar;
