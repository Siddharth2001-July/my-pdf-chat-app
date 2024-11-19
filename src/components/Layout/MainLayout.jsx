import { ThemeProvider, I18nProvider, PanelGroup } from "@baseline-ui/core";

const MainLayout = ({ children, setOnLayout, panelGroupRef }) => {
  const handleLayout = (e) => {
    setOnLayout(e);
  };
  return (
    <ThemeProvider>
      <I18nProvider locale="en-US">
        <PanelGroup onLayout={handleLayout} ref={panelGroupRef} direction="horizontal">
          {children}
        </PanelGroup>
      </I18nProvider>
    </ThemeProvider>
  );
};
export default MainLayout;
