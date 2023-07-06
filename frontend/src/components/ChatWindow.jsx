import React from "react";
import "./ChatWindow.css";

const ChatWindow = ({ chats, isTyping, message, setMessage, chat }) => {
  return (
    <section className="chat-window">
      <div className="chats">
        {chats && chats.length ? (
          chats.map((chat, index) => (
            <div
              key={index}
              className={`chat-message ${
                chat.role === "user" ? "user-msg" : ""
              }`}>
              <span className="chat-role">{chat.role}:</span>
              <span className="chat-separator">-</span>
              <span className="chat-content">{chat.content}</span>
            </div>
          ))
        ) : (
          <p className="no-chat">No chats available</p>
        )}
      </div>

      <div className={`typing-indicator ${isTyping ? "" : "hide"}`}>
        <p>
          <i>Typing</i>
        </p>
      </div>

      <form onSubmit={(e) => chat(e, message)} className="message-form">
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
