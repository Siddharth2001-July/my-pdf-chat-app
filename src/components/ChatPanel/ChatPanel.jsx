import { ActionButton, Box, Text } from "@baseline-ui/core";
import ChatComponent from "./ChatComponent";
import { XIcon } from "@baseline-ui/icons/20";
import PropTypes from "prop-types";

const ChatPanel = ({ messages, onMessageSubmit, setChatPenalShow }) => {
  return (
    <div
      className="panel aside-panel chat-penal"
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--bui-spacing-lg, 12px)",
          alignSelf: "stretch",
        }}
      >
        <Text type="title" size="sm" style={{
          display: "flex",
          padding: "var(--bui-spacing-md, 8px) 0px",
          alignItems: "flex-start",
          gap: "10px",
          flex: "1 0 0",
        }}>
          Chat With AI
        </Text>
        <ActionButton
          style={{
            display: "flex",
            alignItems: "flex-start",
           }}
        label={
          <XIcon style={{ width: "20px", height: "20px", color: "var(--bui-color-icon-primary)" }} />
        }
        onClick={() => setChatPenalShow(false)}
        />
      </Box>
      <ChatComponent onMessageSubmit={onMessageSubmit} messages={messages} />
    </div>
  );
};
ChatPanel.propTypes = {
  setChatPenalShow: PropTypes.func.isRequired,
  onMessageSubmit: PropTypes.func.isRequired,
  messages: PropTypes.string.isRequired,
};
export default ChatPanel;
