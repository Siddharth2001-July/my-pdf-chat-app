import { ThemeProvider, I18nProvider, PanelGroup } from "@baseline-ui/core";

const MainLayout = ({ children }) => (
  <ThemeProvider>
    <I18nProvider locale="en-US">
      <PanelGroup direction="horizontal">{children}</PanelGroup>
    </I18nProvider>
  </ThemeProvider>
);

export default MainLayout;
