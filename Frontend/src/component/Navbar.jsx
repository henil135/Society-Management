import React, { useState } from 'react';
import { Navbar, Nav, Button, InputGroup, FormControl, Container } from 'react-bootstrap';
import { FiSearch } from "react-icons/fi";
import avtar from '../assets/Avatar.png';
import { FaBell } from "react-icons/fa";
import { Link } from 'react-router-dom';
import notification1 from '../assets/Ellipse 1092.png'
import notification2 from '../assets/Group 1000004305.png'
import notification3 from '../assets/Group 1000004173.png'
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaGreaterThan } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import noNotification from '../assets/Group 1000004472.png'

function Header() {
    const [notifications, setNotifications] = useState([
        // {
        //     img: notification1,
        //     title: 'Evelyn Harper (A-101)',
        //     dateTime: 'Monday 11:41 AM',
        //     content: 'Evelyn Harper gave a fund of 1000 rupees for Navratri.',
        //     timestamp: '32 Minutes ago'
        // },
        // {
        //     img: notification2,
        //     title: 'Evelyn Harper (A-101)',
        //     dateTime: 'Tuesday 11:41 AM',
        //     content: 'Evelyn Harper gave a Maintenance of 1000 rupees. ',
        //     timestamp: '2 days ago'
        // },
        {
            img: notification3,
            title: 'Ganesh Chaturthi (A- 101)',
            dateTime: 'Monday 11:41 AM',
            amt: 'Per Person Amount : ₹ 1,500',
            content: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Lord Ganesa in  OurResident. ',
            timestamp: '2 days ago'
        },
        {
            img: notification2,
            title: 'Update Maintenance',
            dateTime: 'Monday 11:41 AM',
            mamt: '₹ 1,500',
            pamt: '₹ 350',
            timestamp: '32 Minutes ago'
        },
    ]);

    const [showNotifications, setShowNotifications] = useState(false);

    const clearNotifications = () => {
        setNotifications([]);
        setShowNotifications(false);
    };


    const location = useLocation();


    const getPageName = (path) => {
        const pathParts = path.split('/');
        return pathParts[pathParts.length - 1] || 'Home';
    };

    return (
        <div
            className="header"
            style={{
                width: "100%",
                position: "fixed",
                zIndex: 999,
                top: 0,
            }}
        >
            <Navbar expand="lg" className="navbar bg-white border-bottom" style={{ height: "109px" }}>
                <Container fluid className='navbar-marginLeft'>

                    <h5 className='home-routing d-none d-md-block'>
                        Home
                        <span className='home-routing-span'>
                            <FaGreaterThan style={{ fontSize: "12px" }} />
                        </span>
                        <span className="current-page-routing"> {getPageName(location.pathname)}</span>
                    </h5>


                    <Nav className="ms-auto d-flex align-items-center justify-content-end flex-row py-sm-2 py-md-0 me-3">

                        <div className="d-lg-none me-3">
                            <FiSearch className="fs-4 text-dark" />
                        </div>


                        <Button
                            variant="light"
                            className="position-relative me-3 px-2 text-black notification-icon mt-0"
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <FaBell />

                        </Button>


                        {showNotifications && (
                            <div
                                className="notification-dropdown bg-white border shadow-sm px-3 pb-2 pt-3 rounded"
                            >
                                <div className="d-flex justify-content-between  mb-2">
                                    <h6 className="mb-0" style={{ fontSize: '20px' }}>Notifications</h6>
                                    {notifications.length > 0 ? (
                                        <Button
                                            variant="link"
                                            style={{ fontSize: '12px' , fontWeight:'600'}}
                                            onClick={clearNotifications}
                                            className="text-primary mt-0 text-decoration-none"
                                        >
                                            Clear All
                                        </Button>
                                    ) : (
                                        <IoClose
                                            className="cursor-pointer fs-4"
                                            onClick={() => setShowNotifications(false)}
                                        />
                                    )}
                                </div>
                                <ul className="list-unstyled">
                                    {notifications.length > 0 ? (
                                        notifications.map((notification, index) => (
                                            <li
                                                key={index}
                                                className="border-bottom text-dark"
                                            >
                                                <div className="d-flex">
                                                    {/* Notification Image */}
                                                    <div className="flex-shrink-0 pe-3">
                                                        <img src={notification.img} alt="Notification" />
                                                    </div>

                                                    {/* Notification Content */}
                                                    <div className="flex-grow-1">
                                                        {
                                                            notification.title === 'Update Maintenance' ? (
                                                                <div>
                                                                    <strong className='mb-1'>{notification.title}</strong>
                                                                    <p className="text-muted mb-0">{notification.dateTime}</p>
                                                                    <div>
                                                                        <div className='d-flex align-items-center justify-content-between p-2 my-2 rounded' style={{ background: 'rgba(246, 248, 251, 1)' }}>
                                                                            <p className='mb-1'>Maintenance Amount:</p>
                                                                            <p className='mb-1 text-success' style={{ fontWeight:'600' }}>{notification.mamt}</p>
                                                                        </div>
                                                                        <div className='d-flex align-items-center justify-content-between p-2 rounded' style={{ background: 'rgba(246, 248, 251, 1)' }}>
                                                                            <p className='mb-1'>Maintenance Penalty:</p>
                                                                            <p className='mb-1 text-danger' style={{ fontWeight:'600' }}>{notification.pamt}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <strong>{notification.title}</strong>
                                                                    <br />
                                                                    <small className="text-muted">{notification.dateTime}</small>
                                                                    <p className='mb-0'>{notification.amt}</p>
                                                                    <p className="mb-0">{notification.content}</p>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>

                                                {
                                                    notification.title == 'Update Maintenance' ? (
                                                        <div>
                                                            {<div className='d-flex align-items-end justify-content-between mt-2'>
                                                                <div className='mx-5 mb-2'>

                                                                </div>
                                                                <div className='mb-2'>
                                                                    <small className="text-muted d-flex align-items-center">{notification.timestamp}<IoCheckmarkDoneSharp className='ms-1' /></small>
                                                                </div>
                                                            </div>}
                                                        </div>
                                                    ) : (<div className='notificationButton-timestamp'>
                                                        <div className='mx-5 mb-2'>
                                                            <Button className='me-3 mt-2 text-decoration-none bg-light text-dark' style={{ border: '1px solid rgba(211, 211, 211, 1)', fontWeight:'600' }}>Accept</Button>
                                                            <Button className='text-decoration-none mt-2'>Decline</Button>
                                                        </div>
                                                        <div className='mb-2 notification-timestamp'>
                                                            <small className="text-muted d-flex align-items-center">{notification.timestamp}<IoCheckmarkDoneSharp className='ms-1' /></small>
                                                        </div>
                                                    </div>)
                                                }
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-center">
                                            <img src={noNotification} />
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}


                        <div className="d-flex align-items-center">
                            <Link
                                to="/profile"
                                className="d-flex align-items-center text-decoration-none"
                            >
                                <img
                                    src={avtar}
                                    alt="User"
                                    className="rounded-circle me-2"
                                    width="35"
                                    height="35"
                                />
                                <div className="d-none d-lg-block">
                                    <span className="navbar-span">Moni Roy</span>
                                    <br />
                                    <small className="text-muted">Admin</small>
                                </div>
                            </Link>
                        </div>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
