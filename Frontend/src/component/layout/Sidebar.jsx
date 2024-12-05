import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import "../../style.css";
import dashboardIcon from "../../Icons/image.png";
import residentIcon from "../../Icons/money.png";
import financialIcon from "../../Icons/dollar-square.png";
import facalityIcon from "../../Icons/building.png";
import complainrtrackingIcon from "../../Icons/sms-tracking.png";
import securitymanagementIcon from "../../Icons/shield-security.png";
import securityguardIcon from "../../Icons/security-user.png";
import announcementIcon from "../../Icons/Announcement.png";

import Logo from "../Logo";
import HideBgCopy from "../../assets/HideBgCopy.png";
import BlackImage from '../../assets/Rectangle 1888.png'

import ArrowIcon from '../../Icons/arrow-down.png'
import { logout } from "../../services/authentication";
import {useDispatch} from "react-redux"
// import { Toast } from "bootstrap";
import toast from 'react-hot-toast'
import axios from "axios";
function Sidebar() {
  const dispatch = useDispatch()
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");
  const [isComplaintDropdownOpen, setComplaintDropdownOpen] = useState(false);
  const [isSecurityDropdownOpen, setSecurityDropdownOpen] = useState(false);
  const [isFinancialDropdownOpen, setFinancialDropdownOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar toggle state
  const [isMobile, setIsMobile] = useState(window.innerWidth < 576); // Mobile screen check


  // Update active item on location change
  useEffect(() => {
    const currentPath = location.pathname;
    let foundActiveItem = false;
    menuItems.forEach((item) => {
      if (item.subItems) {
        item.subItems.forEach((subItem) => {
          if (currentPath === subItem.path) {
            setActiveItem(subItem.key);
            if (item.key === "complaint-tracking") setComplaintDropdownOpen(true);
            if (item.key === "security-management") setSecurityDropdownOpen(true);
            if (item.key === "financialmanagement") setFinancialDropdownOpen(true);


            foundActiveItem = true;
          }
        });
      } else if (currentPath === item.path) {
        setActiveItem(item.key);
        foundActiveItem = true;
      }
    });

    if (!foundActiveItem) {
      setActiveItem("");
    }
  }, [location]);

  const handleDropdownClick = (key) => {
    if (key === "complaint-tracking") {
      setComplaintDropdownOpen(!isComplaintDropdownOpen);
      setSecurityDropdownOpen(false);
      setFinancialDropdownOpen(false);

    } else if (key === "security-management") {
      setSecurityDropdownOpen(!isSecurityDropdownOpen);
      setComplaintDropdownOpen(false);
      setFinancialDropdownOpen(false);

    } else if (key === "financialmanagement") {
      setFinancialDropdownOpen(!isFinancialDropdownOpen);
      setComplaintDropdownOpen(false);
      setSecurityDropdownOpen(false);

    }

    setActiveItem(key);
  };

  // const handleLogout = async()=>{
  //   try {
  //     const response = await axios.get(`http://localhost:5000/api/v1/logout`)
  //     Navigate('/login')
  //     dispatchEvent(logout())
  //     toast.success(response.data.message)
  //   } catch (error) {
  //     toast.error(error.response.data.message)
  //   }
  // }

  const handleLogout = async () => {
    const navigate = useNavigate();
  
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/logout`, {
        withCredentials: true, // Include credentials if required (e.g., cookies)
      });
      dispatch(logout()); // Ensure this is defined
      toast.success(response.data.message);
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(error.response?.data?.message || 'Logout failed. Please try again.');
    }
  };
  // Update the mobile screen state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 576);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <img src={dashboardIcon} />,
      path: "/dashboard",
    },
    {
      key: "residentmanagement",
      label: "Resident Management",
      icon: <img src={residentIcon} />,
      path: "/residentmanagement",
    },
    {
      key: "financialmanagement",
      label: "Financial Management",
      icon: <img src={financialIcon} />,
      subItems: [
        { key: "income", label: "Income", path: "/Financial-Maintenance" },
        { key: "expenses", label: "Expenses", path: "/expense" },
        { key: "note", label: "Note", path: "/note" },
      ],
    },
    {
      key: "facility-management",
      label: "Facility Management",
      icon: <img src={facalityIcon} />,
      path: "/facility-management",
    },
    {
      key: "complaint-tracking",
      label: "Complaint Tracking",
      icon: <img src={complainrtrackingIcon} />,
      subItems: [
        { key: "request-tracking", label: "Request Tracking", path: "/request-tracking" },
        { key: "create-complaint", label: "Create Complaint", path: "/create-complaint" },
      ],
    },
    {
      key: "security-management",
      label: "Security Management",
      icon: <img src={securitymanagementIcon} />,
      subItems: [
        { key: "visitors-log", label: "Visitors Log", path: "/visitors-log" },
        { key: "security-protocols", label: "Security Protocols", path: "/security-protocols" },
      ],
    },
    {
      key: "security-guard",
      label: "Security Guard",
      icon: <img src={securityguardIcon} />,
      path: "/security-guard",
    },
    {
      key: "announcement",
      label: "Announcement",
      icon: <img src={announcementIcon} />,
      path: "/announcement",
    },

  ];

  return (
    <div style={{ fontSize: '14px' }}>
      <button
        className="btn btn-primary d-sm-none d-md-none d-lg-none"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        style={{
          position: "fixed",
          top: "10px",
          left: "10px",
          zIndex: 1050,
          padding: "10px",
        }}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar offcanvas offcanvas-start ${isSidebarOpen || !isMobile ? "show" : ""}`}
        tabIndex="-1"
        style={{
          width: "300px",
          zIndex: 1049,
          transition: "transform 0.3s ease",
          transform: isSidebarOpen || !isMobile ? "translateX(0)" : "translateX(-100%)",
        }}
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header justify-content-center ">
          <h1 className="offcanvas-title mainColor" id="offcanvasExampleLabel">
            <Logo />
          </h1>
        </div>
        <hr />

        <div className="offcanvas-body custom-scrollbar">
          <ul className="list-unstyled">
            {menuItems.map((item) =>
              item.subItems ? (
                <li key={item.key} className="position-relative p-3 rounded">
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ cursor: "pointer", color: "black" }}
                    onClick={() => handleDropdownClick(item.key)}
                  >
                    {activeItem === item.key && (
                      <img
                        src={HideBgCopy}
                        alt="Active Indicator"
                        style={{
                          position: "absolute",
                          left: "-15px", // Adjust this value as needed
                          height: "50px",

                        }}
                      />
                    )}
                    <div className="d-flex align-items-center">
                      {item.icon}
                      <span className="ms-2">{item.label}</span>
                    </div>


                    {
                      (item.key === "complaint-tracking" && isComplaintDropdownOpen) ||
                        (item.key === "security-management" && isSecurityDropdownOpen) ||
                        (item.key === "financialmanagement" && isFinancialDropdownOpen) ? (
                        <img src={ArrowIcon} />
                      ) : (
                        <img src={ArrowIcon} />
                      )
                    }


                  </div>
                  {(item.key === "complaint-tracking" && isComplaintDropdownOpen) ||
                    (item.key === "security-management" && isSecurityDropdownOpen) ||
                    (item.key === "financialmanagement" && isFinancialDropdownOpen) ? (

                    <ul className="list-unstyled ms-4">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.key} className="p-2 rounded position-relative">
                          {activeItem === subItem.key && (
                            <img
                              src={BlackImage}
                              alt="Active Indicator" // Adding alt for better accessibility
                              style={{
                                position: "absolute",
                                left: "-15px", // Adjust this value as needed
                                height: "30px",
                              }}
                            />
                          )}
                          <Link
                            to={subItem.path}
                            className="d-flex align-items-center"
                            style={{
                              textDecoration: "none",
                              fontWeight: activeItem === subItem.key ? "bold" : "normal", // Bold only active submenu item
                              color: "black", // Ensure consistent text color for submenu
                            }}
                            onClick={() => setActiveItem(subItem.key)} // Ensure submenu item gets set as active
                          >
                            <span>{subItem.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ) : (
                <li key={item.key} className={`p-3 rounded position-relative ${activeItem === item.key ? "mainColor2" : ""}`}>
                  {activeItem === item.key && (
                    <img
                      src={HideBgCopy}
                      alt="Active Indicator"
                      style={{
                        position: "absolute",
                        left: "-15px", // Adjust this value as needed
                        height: "50px",
                        top: "2px"
                      }}
                    />
                  )}
                  <Link
                    to={item.path}
                    className="d-flex align-items-center"
                    style={{
                      textDecoration: "none",
                      color: activeItem === item.key ? "white" : "black",
                    }}
                    onClick={() => setActiveItem(item.key)}
                  >
                    {item.icon}
                    <span className="ms-2">{item.label}</span>
                  </Link>
                </li>
              )
            )}
          </ul>

        </div>

        <div className="p-3">
          <Link to="/login" className="d-flex align-items-center text-danger" onClick={handleLogout} style={{ textDecoration: "none" }}>
            <FaSignOutAlt className="me-3" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
