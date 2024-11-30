import  { useState } from 'react';
import { Navbar, Nav, Button, InputGroup, FormControl, Container } from 'react-bootstrap';
import { FiSearch } from "react-icons/fi";
import avtar from '../assets/Avatar.png';
import { FaBell } from "react-icons/fa";
import { Link } from 'react-router-dom';
import notification1 from '../assets/Ellipse 1092.png'
import notification2 from '../assets/Group 1000004305.png'
import notification3 from '../assets/Group 1000004173.png'
import { IoCheckmarkDoneSharp } from "react-icons/io5";

function Header() {
    const [notifications, setNotifications] = useState([
        {
            img: notification1,
            title: 'Evelyn Harper (A-101)',
            dateTime: 'Monday 11:41 AM',
            content: 'Evelyn Harper gave a fund of 1000 rupees for Navratri.',
            timestamp: '32 Minutes ago'
        },
        {
            img: notification2,
            title: 'Evelyn Harper (A-101)',
            dateTime: 'Tuesday 11:41 AM',
            content: 'Evelyn Harper gave a Maintenance of 1000 rupees. ',
            timestamp: '2 days ago'
        },
        {
            img: notification3,
            title: 'Ganesh Chaturthi (A- 101)',
            dateTime: 'Saturday 11:41 AM',
            amt: 'Per Person Amount : ₹ 1,500',
            content: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Lord Ganesa in  OurResident. ',
            timestamp: '2 days ago'
        },
        {
            img: notification2,
            title: 'Update Maintenance',
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
                <Container fluid>
                    {/* Search Bar for Large Screens */}
                    <Navbar.Brand className="d-none d-lg-block w-20 ms-4">
                        <InputGroup
                            className="align-items-center search-bar rounded-2 px-3 py-2"
                            style={{ marginLeft: "290px", width: "300px" }}
                        >
                            <FiSearch className="search-icon" />
                            <FormControl
                                className="border-0"
                                placeholder="Search Here"
                                aria-label="Search"
                            />
                        </InputGroup>
                    </Navbar.Brand>

                    {/* Right-aligned Icons (Always Visible) */}
                    <Nav className="ms-auto d-flex align-items-center justify-content-end flex-row py-sm-2 py-md-0 me-3">
                        {/* Search Icon for Small Screens */}
                        <div className="d-lg-none me-3">
                            <FiSearch className="fs-4 text-dark" />
                        </div>

                        {/* Notification Icon */}
                        <Button
                            variant="light"
                            className="position-relative me-3 px-2 text-black notification-icon"
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <FaBell />
                            {notifications.length > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {notifications.length}
                                </span>
                            )}
                        </Button>

                        {/* Notification Dropdown */}
                        {showNotifications && (
                            <div
                                className="notification-dropdown bg-white border shadow-sm px-3 py-2 rounded"
                                style={{
                                    position: 'absolute',
                                    right: '150px',
                                    top: '90px',
                                    width: '280px',
                                    zIndex: 1000,
                                    width: '540px',
                                }}
                            >
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h6 className="mb-0">Notifications</h6>
                                    <Button
                                        variant="link"
                                        size="sm"
                                        onClick={clearNotifications}
                                        className="text-primary mt-0 text-decoration-none"
                                    >
                                        Clear All
                                    </Button>
                                </div>
                                <ul className="list-unstyled">
                                    {notifications.length > 0 ? (
                                        notifications.map((notification, index) => (
                                            <li
                                                key={index}
                                                className="border-bottom text-dark"
                                            >
                                                <div className='d-flex'>
                                                    <div className='pe-2'>
                                                        <img src={notification.img} />
                                                    </div>
                                                    <div>
                                                        <strong>{notification.title}</strong>
                                                        <br />
                                                        <small className="text-muted">
                                                            {notification.dateTime}
                                                        </small>
                                                        <p className='mb-0'>{notification.amt}</p>
                                                        <p className="mb-0">{notification.content}</p>


                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-end justify-content-between'>
                                                    <div className='mx-5 mb-2'>
                                                        <Button className='me-3 mt-2 text-decoration-none bg-light text-dark' style={{ border: '1px solid rgba(211, 211, 211, 1)' }}>Accept</Button>
                                                        <Button className='text-decoration-none mt-2'>Decline</Button>
                                                    </div>
                                                    <div className='mb-2'>
                                                        <small className="text-muted d-flex align-items-center">{notification.timestamp}<IoCheckmarkDoneSharp className='ms-1' /></small>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-muted">No new notifications</li>
                                    )}
                                </ul>
                            </div>
                        )}

                        {/* User Profile */}
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
