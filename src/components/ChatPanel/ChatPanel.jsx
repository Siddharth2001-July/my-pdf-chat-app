import { Panel } from "@baseline-ui/core";
import ChatComponent from "./ChatComponent";

const ChatPanel = ({ messages, onMessageSubmit }) => (
  <Panel order={3} defaultSize={25} minSize={15} className="panel aside-panel">
    <ChatComponent onMessageSubmit={onMessageSubmit} messages={messages} />
  </Panel>
);

export default ChatPanel;
