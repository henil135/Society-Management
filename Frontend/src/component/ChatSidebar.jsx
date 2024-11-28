import React from 'react';

const ChatSidebar = () => {
  const contacts = [
    {
      id: 1,
      name: "Michael John",
      lastMessage: "Hi, How are you doing?",
      time: "10:27",
      unread: 0,
      active: false
    },
    {
      id: 2,
      name: "Elizabeth Sarah",
      lastMessage: "Thank you for your order!",
      time: "9:20",
      unread: 0,
      active: false
    },
    {
      id: 3,
      name: "Jenny Wilson",
      lastMessage: "Hello, Jenny",
      time: "7:00",
      unread: 1,
      active: false
    },
    {
      id: 4,
      name: "Arlene McCoy",
      lastMessage: "Typing...",
      time: "9:20",
      unread: 0,
      active: true
    }
  ];

  return (
    <div className="chat-sidebar-container">
      {/* Search Bar */}
      <div className="p-3 border-bottom">
        <div className="input-group">
          <span className="input-group-text bg-transparent border-0">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control border-0"
            placeholder="Search Here"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="contacts-list">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`contact-item p-3 border-bottom ${
              contact.active ? 'active bg-light' : ''
            }`}
          >
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <div className="avatar">
                  {/* Add avatar image here if needed */}
                  <div className="avatar-placeholder bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ width: '40px', height: '40px' }}>
                    {contact.name.charAt(0)}
                  </div>
                </div>
              </div>
              <div className="flex-grow-1 ms-3">
                <div className="d-flex justify-content-between">
                  <h6 className="mb-0">{contact.name}</h6>
                  <small className="text-muted">{contact.time}</small>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">{contact.lastMessage}</small>
                  {contact.unread > 0 && (
                    <span className="badge bg-primary rounded-pill">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;