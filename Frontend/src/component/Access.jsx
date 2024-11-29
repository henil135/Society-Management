import React, { useState } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import Sidebar from './layout/Sidebar';
import Header from './Navbar';
import Avatar from '../assets/Avatar.png';
import call from '../Icons/call.png';
import videocall from '../Icons/videocall.png';
import threedots from '../Icons/threedots.png';
import './Chat.css';

const ChatLayout = () => {
  const [selectedContact, setSelectedContact] = useState(null); // To hold selected contact
  const [messagesByContact, setMessagesByContact] = useState({}); // Store messages by contact id
  const [showOptions, setShowOptions] = useState(false); // State to control options modal visibility

  // Handle contact click
  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  // Function to send a message
  const sendMessage = (message) => {
    if (selectedContact) {
      const newMessage = {
        sender: "You",
        message,
        time: new Date().toLocaleTimeString(),
        type: "sent",
      };

      // Update the messages for the selected contact
      setMessagesByContact((prevMessages) => {
        const contactMessages = prevMessages[selectedContact.id] || [];
        return {
          ...prevMessages,
          [selectedContact.id]: [...contactMessages, newMessage],
        };
      });
    }
  };

  // Handle the options visibility (Copy, Forward)
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  // Handle copy action
  const handleCopy = () => {
    navigator.clipboard.writeText(messagesByContact[selectedContact.id]?.message || '');  // Copy last message to clipboard
    alert("Message copied!");
  };

  // Handle forward action
  const handleForward = () => {
    alert("Forwarding message...");  // You can implement forward logic as needed
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      <div className="flex-shrink-0">
        <Sidebar />
      </div>


      <div className="flex-grow-1 dashboard-bg">

        <Header />

        <div className="container-fluid stickyHeader p-3" style={{ marginLeft: "315px", width: "1590px" }}>
          <div className="row">
            {/* Left Sidebar */}

            <div className="col-md-3 chat-sidebar custom-scrollbar p-0">
              <div className="sidebar-header  mt-3 mx-3">
                <h5 className="mb-0">Chat</h5>
              </div>
              <ChatSidebar onContactClick={handleContactClick} />
            </div>

            {/* Chat Area */}
            <div className="col-md-9 chat-area p-0  custom-scrollbar">
              {selectedContact && (
                <div>
                  <div className="chat-header p-3 border-bottom">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex gap-2">
                        <div className="avatar">
                          <img src={Avatar} alt="Avatar" />
                        </div>
                        <div>
                          <h6 className="mt-1">{selectedContact.name}</h6>
                          <h6 className="text-muted">{selectedContact.time}</h6>
                        </div>
                      </div>
                      <div className='d-flex gap-1'>
                        <img src={call} />
                        <img src={videocall} />
                        <button
                          type="button"
                          className="btn"
                          onClick={toggleOptions}
                          style={{ background: 'transparent', border: 'none' }}
                        >
                          <img src={threedots} alt="options" />
                        </button>

                        {/* Options Modal */}
                        {showOptions && (
                          <div className="options-modal" style={{ position: 'absolute', top: '35px', right: '0' }}>
                            <ul>
                              <li onClick={handleCopy}>Copy</li>
                              <li onClick={handleForward}>Forward</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="chat-messages custom-scrollbar">
                    {/* Render messages for the selected contact */}
                    <ChatMessage messages={messagesByContact[selectedContact.id] || []} />
                  </div>

                  <ChatInput onSendMessage={sendMessage} />
                </div>
              )}
            </div>
          </div>
        </div>  

      </div>
    </div>
  );
};

export default ChatLayout;
