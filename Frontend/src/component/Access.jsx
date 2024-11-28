import React from 'react';
import ChatSidebar from './ChatSidebar';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import './Chat.css'
import Sidebar from './layout/Sidebar';
import Header from './Navbar';
import Avtar from '../assets/Avatar.png'
const ChatLayout = () => {
  return (
    <div className="d-flex flex-column flex-md-row">
      <div className="flex-shrink-0" >
        <Sidebar />
      </div>

      <div className="flex-grow-1 dashboard-bg " >
        <Header/>

        <div className="container-fluid stickyHeader p-3" style={{ marginLeft:"315px" ,width:"1590px"}}>
      <div className="row">
        {/* Left Sidebar */}
        <div className="col-md-3 chat-sidebar p-0">
          <div className="sidebar-header p-3 border-bottom">
            <h5 className="mb-0">Chat</h5>
          </div>
          <ChatSidebar />
        </div>
        
        {/* Chat Area */}
        <div className="col-md-9 chat-area p-0">
          <div className="chat-header p-3 border-bottom">
            <div className="d-flex align-items-center justify-content-between">
            <div className='d-flex'>
            <div className="avatar">
              <img src={Avtar}/>
                  {/* Add avatar image here if needed */}
                  <div className=" rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ width: '40px', height: '40px' }}>
                    
                  </div>
                </div>
              <div >
                <h6 className="mb-1">Arlene McCoy (A/1001)</h6>
                <h6 className="text-muted ">9:00 Pm</h6>
              </div>
            </div>
              <div className="d-flex align-items-center">
                <button className="btn">
                  <i className="bi bi-camera-video-fill"></i>
                </button>
                <button className="btn">
                  <i className="bi bi-telephone-fill"></i>
                </button>
                <div className="dropdown">
                  <button className="btn" data-bs-toggle="dropdown">
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Copy</a></li>
                    <li><a className="dropdown-item" href="#">Forward</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="chat-messages">
            <ChatMessage />
          </div>
          
          <ChatInput />
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ChatLayout;