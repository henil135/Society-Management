import React from 'react';

const ChatMessage = ({ messages }) => {
  return (
    <div className="chat-messages-container">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.type}`}>
          {msg.type === 'received' && (
            <div className="sender-name text-muted small mb-1">{msg.sender}</div>
          )}
          <div className="message-content" style={{color:"#FFFFFF"}}>
            {msg.message}
          </div>
          <span className="time small ms-2 " style={{float:"right",marginRight:"10px",color:"#A7A7A7"}}>{msg.time}</span> {/* Time here */}
        </div>
      ))}
    </div>
  );
};

export default ChatMessage;
