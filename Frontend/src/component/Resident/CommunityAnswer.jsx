import React, { useState } from 'react';
import ResidentSidebar from '../layout/ResidentSidebar';
import Navbar from '../Navbar';
import ChatSidebar from './ChatSidebar';
import Avtar from '../../assets/Avatar plain.png';
import { Button } from 'react-bootstrap';
import { IoEyeSharp } from "react-icons/io5";
import threedotbtn from '../../assets/threedotes-btn.png';
import { Link, useNavigate } from 'react-router-dom';
import arrowup from '../../assets/Frame 1000003482.png'
import arrowdown from '../../assets/Frame 1116603270.png'

const CommunityAnswer = () => {
    const [newQuestion, setNewQuestion] = useState("");
    const navigate = useNavigate();

    const handleAddQuestion = () => {
        if (newQuestion.trim()) {
            // Create new question object
            const questionData = {
                title: newQuestion,
                votes: 0,
                answers: 0,
                content: "This is a newly added question.",
                views: 0,
            };
            // Save question to localStorage
            localStorage.setItem('newQuestion', JSON.stringify(questionData));

            // Reset input field
            setNewQuestion("");

            // Navigate to the CommunitiesDiscussion page
            navigate('/Community-Discussion');
        }
    };

    const [count, setCount] = useState(5);

    const increaseCount = () => {
      setCount(count + 1);
    };
  
    const decreaseCount = () => {
      setCount(count - 1);
    };
    

    return (
        <div className='dashboard-bg w-100'>
            <ResidentSidebar />
            <Navbar />
            <div className="container-fluid stickyHeader p-3" style={{ marginLeft: "315px", width: "1590px" }}>
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
                                        <img src={Avtar} alt="Avatar" />
                                    </div>
                                    <div className='ps-3'>
                                        <h6 className="mb-1">Community</h6>
                                        <h6 className="text-muted">9:00 PM</h6>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <Link to={'/Community-Question'} className='text-decoration-none'>
                                        <Button className='ask-que-btn'>Ask Question</Button>
                                    </Link>
                                    <div className='ps-2'>
                                        <img src={threedotbtn} alt="More Options" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-lg-1'>
                                <div className='p-3 d-flex flex-column align-items-center'>
                                    <img src={arrowup} alt="up" width={42} onClick={increaseCount}  />
                                    <h6 className='mb-0 py-1' style={{fontSize: '16px', fontWeight: '600' , color: '#F09619'}}> {count} </h6>
                                    <img src={arrowdown} alt="down" width={42} onClick={decreaseCount}  />
                                </div>
                            </div>
                            <div className='col-lg-11'>
                                <div className='p-3'>
                                    <div className="p-4  border rounded" style={{ backgroundColor: '#5678E90D' }}>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <h6 className="mb-3 good-question-title" style={{ fontSize: '16px', fontWeight: '500' }}>What is the capital of France?
                                            </h6>
                                            <div className='community-view'>
                                                <p className='d-flex align-items-center bg-light justify-content-center rounded-pill' style={{ padding: "5px" }}>
                                                    <IoEyeSharp className='community-icon' style={{ marginRight: "5px" }} />
                                                    20
                                                </p>
                                            </div>
                                        </div>
                                        <p className='good-question-p mb-3' style={{ fontSize: '16px', fontWeight: '300' }}>Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content! Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your.
                                        </p>

                                        <h6 className='mb-3 good-question-title' style={{ fontSize: '14px', fontWeight: '600', color: '#5678E9' }}>Answers</h6>
                                        <ul className='list-group list-group-numbered'>
                                            <li className='list-group-item good-question-p mb-2 border-0' style={{ fontSize: '16px', fontWeight: '300', backgroundColor: '#5678E90D' }}> Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content! Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your..</li>
                                            <li className='list-group-item good-question-p mb-2 border-0' style={{ fontSize: '16px', fontWeight: '300', fontWeight: '300', backgroundColor: '#5678E90D' }}>Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content! Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your.</li>
                                            <li className='list-group-item good-question-p border-0' style={{ fontSize: '16px', fontWeight: '300', fontWeight: '300', backgroundColor: '#5678E90D' }}>Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content! Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className='p-3'>
                                    <h6 className="mb-3 good-question-title" style={{ fontSize: '14px', fontWeight: '500' }}>Your Answer
                                    </h6>
                                    <form action="">
                                        <textarea class="form-control w-100" rows="5" placeholder="Type Here" style={{ fontSize: '14px', fontWeight: '400', color: '#A7A7A7' }}></textarea>
                                    </form>
                                    <div className='text-end'>
                                        <Link to={'/Community-Discussion'} className='text-decoration-none'>
                                            <Button className='post-ans-btn'>Post Your Answer</Button>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityAnswer;
