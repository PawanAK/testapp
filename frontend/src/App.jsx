import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import ChatWindow from "./components/ChatWindow";
import Modal from "./components/Modal";
import "./App.css";

const App = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showModal, setShowModal] = useState(true);

  const configuration = new Configuration({
    apiKey: apiKey,
  });

  const openai = new OpenAIApi(configuration);

  const handleChatSubmit = async (e, message) => {
    e.preventDefault();

    setIsTyping(true);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a PlanGPT. You help with business plan writing",
          },
          ...chats,
        ],
      });

      const { choices } = response.data;

      if (choices && choices.length > 0) {
        msgs.push(choices[0].message);
        setChats(msgs);
      }

      setIsTyping(false);
      window.scrollTo(0, document.body.scrollHeight);
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred. Please try again later.");
      setIsTyping(false);
    }
  };

  return (
    <main className="app-container">
      <h1 className="app-title">React ChatGPT App</h1>

      <Modal
        apiKey={apiKey}
        setApiKey={setApiKey}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      {!showModal && (
        <ChatWindow
          chats={chats}
          isTyping={isTyping}
          message={message}
          setMessage={setMessage}
          chat={handleChatSubmit}
        />
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </main>
  );
};

export default App;
