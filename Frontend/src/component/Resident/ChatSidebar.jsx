import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import avatar from '../../assets/Avatar.png';

const ChatSidebar = ({ onContactClick }) => {
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const contacts = [
    { id: 1, name: 'Michael John', lastMessage: 'Hi, How are you doing?', time: '10:27', unread: 0, active: false, avatar: avatar },
    { id: 2, name: 'Elizabeth Sarah', lastMessage: 'Thank you for your order!', time: '9:20', unread: 0, active: false, avatar: avatar },
    { id: 3, name: 'Jenny Wilson', lastMessage: 'Hello, Jenny', time: '7:00', unread: 1, active: false, avatar: avatar },
    { id: 4, name: 'Arlene McCoy', lastMessage: 'Typing...', time: '9:20', unread: 0, active: true, avatar: avatar },

    // Add more contacts as necessary
  ];

  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactClick = (contact) => {
    // Clear the search query and show all contacts again
    setSearchQuery('');
    onContactClick(contact); // Call the passed function to handle contact click
  };

  return (

    <div className="chat-sidebar-container bg-white shadow-sm ">
      <div className="search-bar p-3 border-0">
        <div className="input-group rounded shadow-sm overflow-hidden">

          <span className="input-group-text bg-light border-0">
            <FiSearch className="text-muted" style={{ fontSize: '18px' }} />
          </span>
          <input
            type="text"
            className="form-control border-0 bg-light"
            placeholder="Search Here"
            style={{ fontSize: '14px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />
        </div>
      </div>

      <div className="contacts-list">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`contact-item p-3 d-flex align-items-center ${contact.active ? 'bg-blue' : ''}`}
              style={{ cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }}
              onClick={() => handleContactClick(contact)} // Handle contact click
            >
              <div className="avatar">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="rounded-circle shadow-sm"
                  style={{ width: '50px', height: '50px' }}
                />
              </div>
              <div className="ms-3 flex-grow-1">
                <div className="d-flex justify-content-between">
                  <h6 className="mb-0 text-truncate" style={{ fontSize: '16px', fontWeight: '600' }}>
                    {contact.name}
                  </h6>
                  <small className="text-muted">{contact.time}</small>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <small
                    className={`text-truncate ${contact.active ? 'text-primary' : 'text-muted'}`}
                    style={{ fontSize: '14px' }}
                  >
                    {contact.lastMessage}
                  </small>
                  {contact.unread > 0 && (
                    <span className="badge bg-primary rounded-pill">{contact.unread}</span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-3 text-center text-muted">No contacts found</div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
