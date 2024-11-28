import React from 'react';

const ChatMessage = () => {
  const messages = [
    {
      id: 1,
      sender: "Michael John",
      message: "Hi there, How are you?",
      time: "10:27",
      type: "received"
    },
    {
      id: 2,
      sender: "Elizabeth Sarah",
      message: "Waiting for your reply. As I have to go back soon. I have to travel long distance.",
      time: "9:20",
      type: "received"
    },
    {
      id: 3,
      sender: "You",
      message: "Hi, I am coming there in few minutes. Please wait! I am in taxi right now.",
      time: "9:30",
      type: "sent"
    }
  ];

  return (
    <div className="chat-messages-container">
      {messages.map((msg) => (
        <div key={msg.id} className={`message ${msg.type}`}>
          {msg.type === 'received' && (
            <div className="sender-name text-muted small mb-1">{msg.sender}</div>
          )}
          <div className="message-content">
            {msg.message}
            <span className="time small ms-2">{msg.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessage;