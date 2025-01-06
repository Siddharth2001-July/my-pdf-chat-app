import { ActionButton, Box } from "@baseline-ui/core";
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
          justifyContent: "space-between",
          minHeight: "48px",
          padding: "0px 12px",
          background: "white",
        }}
      >
        <h3
          style={{ fontSize: "14px", letterSpacing: "0.1px", color: "#2B2E36" }}
        >
          Chat With AI
        </h3>
        <ActionButton
          style={{ backgroundColor: "white", padding: "0px" }}
          label={
            <XIcon style={{ width: "20px", height: "20px", color: "black" }} />
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
