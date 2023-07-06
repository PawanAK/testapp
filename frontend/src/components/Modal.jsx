import React from "react";
import "./Modal.css";

const Modal = ({ apiKey, setApiKey, showModal, setShowModal }) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">Enter OpenAI API Key</h2>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your OpenAI API key..."
          className="modal-input"
        />
        <button onClick={() => setShowModal(false)} className="modal-button">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Modal;
