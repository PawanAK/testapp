import React from "react";
import PropTypes from "prop-types";
import "./Modal.css";

const Modal = ({ apiKey, setApiKey, showModal, handleApiKeySubmit }) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Enter OpenAI API Key</h2>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your OpenAI API key..."
          className="modal-input"
        />
        <button onClick={handleApiKeySubmit} className="modal-button">
          Submit
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  apiKey: PropTypes.string.isRequired,
  setApiKey: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  handleApiKeySubmit: PropTypes.func.isRequired,
};

export default Modal;
