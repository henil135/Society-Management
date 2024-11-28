import React, { useState } from 'react';

const ChatInput = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="chat-input p-3 border-top">
      <form onSubmit={handleSubmit} className="d-flex align-items-center">
        <div className="input-group">
          <button type="button" className="btn">
            <i className="bi bi-link-45deg"></i>
          </button>
          <input
            type="text"
            className="form-control"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="button" className="btn">
            <i className="bi bi-image"></i>
          </button>
          <button type="button" className="btn">
            <i className="bi bi-emoji-smile"></i>
          </button>
          <button type="button" className="btn">
            <i className="bi bi-mic-fill"></i>
          </button>
          <button type="submit" className="btn btn-primary rounded-circle ms-2">
            <i className="bi bi-send-fill"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;