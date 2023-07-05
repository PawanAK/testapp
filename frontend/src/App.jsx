import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

import "./App.css";

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const chat = async (e, message) => {
    e.preventDefault();

    setIsTyping(true);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);
    setMessage("");

    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a RizzGPT. You help with busness plan writting",
          },
          ...chats,
        ],
      })
      .then((result) => {
        msgs.push(result.data.choices[0].message);
        setChats(msgs);
        setIsTyping(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <main>
      <h1>React ChatGPT App</h1>

      <section>
        {
          chats && chats.length?(
            chats.map((chat)=>)
          ):""
        }
      </section>


      {isTyping && (
        <div>
          <p>
            <i>Typing</i>
          </p>
        </div>
      )}

      {errorMessage && <p>{errorMessage}</p>}

      <form onSubmit={(e) => chat(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Type a message"
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>

      <div>
        {chats.map((chat, index) => (
          <div key={index}>
            <p>{chat.role === "user" ? "User: " : "Assistant: "}</p>
            <p>{chat.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
