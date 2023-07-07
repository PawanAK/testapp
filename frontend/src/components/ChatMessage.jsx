import PropTypes from "prop-types";
import "./ChatMessage.css";

const ChatMessage = ({ role, content }) => {
  const isUserMessage = role === "user";

  return (
    <div
      className={`chat-message ${
        isUserMessage ? "user-msg" : "assistant-msg"
      }`}>
      <p className="msg-content">{content}</p>
    </div>
  );
};

ChatMessage.propTypes = {
  role: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default ChatMessage;
