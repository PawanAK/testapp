import React from "react";
import "./chatwindow.css";

const ChatWindow = ({ chats, isTyping, message, setMessage, chat }) => {
  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <section className="chat-window">
      <div className="chat-messages">
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`message ${chat.role}`}
            onClick={() =>
              chat.role === "assistant" && handleCopy(chat.content)
            }>
            <p>{chat.content}</p>
          </div>
        ))}
      </div>

      <div className={`typing-indicator ${isTyping ? "" : "hide"}`}>
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>

      <form className="chat-input" onSubmit={(e) => chat(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Type a message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </section>
  );
};

export default ChatWindow;
