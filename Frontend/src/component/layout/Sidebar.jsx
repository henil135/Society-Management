import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";
import {
  FaTh,
  FaBullhorn,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { PiBuildingOfficeBold, PiMoneyWavyFill } from "react-icons/pi";
import { AiFillDollarCircle } from "react-icons/ai";
import { TbMessage2Cancel } from "react-icons/tb";
import { BsShieldLockFill } from "react-icons/bs";
import { RiShieldUserFill } from "react-icons/ri";
import "../../style.css";

function Sidebar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");
  const [isComplaintDropdownOpen, setComplaintDropdownOpen] = useState(false);
  const [isSecurityDropdownOpen, setSecurityDropdownOpen] = useState(false);
  const [isFinancialDropdownOpen, setFinancialDropdownOpen] = useState(false);

  // Update active item on location change
  useEffect(() => {
    const currentPath = location.pathname;

    // Check if any sub-item matches the current path
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

    // If no match found, reset active item
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

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: <FaTh />, path: "/dashboard" },
    {
      key: "residentmanagement",
      label: "Resident Management",
      icon: <PiMoneyWavyFill />,
      path: "/residentmanagement",
    },
    {
      key: "financialmanagement",
      label: "Financial Management",
      icon: <AiFillDollarCircle />,
      subItems: [
        { key: "income", label: "Income", path: "/Financial-Maintenance" },
        { key: "expenses", label: "Expenses", path: "/expense" },
        { key: "note", label: "Note", path: "/note" },
      ],
    },
    {
      key: "facility-management",
      label: "Facility Management",
      icon: <PiBuildingOfficeBold />,
      path: "/facility-management",
    },
    {
      key: "complaint-tracking",
      label: "Complaint Tracking",
      icon: <TbMessage2Cancel />,
      subItems: [
        { key: "request-tracking", label: "Request Tracking", path: "/request-tracking" },
        { key: "create-complaint", label: "Create Complaint", path: "/create-complaint" },
      ],
    },
    {
      key: "security-management",
      label: "Security Management",
      icon: <BsShieldLockFill />,
      subItems: [
        { key: "visitors-log", label: "Visitors Log", path: "/visitors-log" },
        { key: "security-protocols", label: "Security Protocols", path: "/security-protocols" },
      ],
    },
    {
      key: "security-guard",
      label: "Security Guard",
      icon: <RiShieldUserFill />,
      path: "/security-guard",
    },
    {
      key: "announcement",
      label: "Announcement",
      icon: <FaBullhorn />,
      path: "/announcement",
    },
  ];

  return (
    <div className="sidebar">
      <div
        className="offcanvas offcanvas-start show"
        tabIndex="-1"
        style={{ visibility: "visible", width: "280px" }}
        aria-labelledby="offcanvasExampleLabel"
        data-bs-backdrop="false"
      >
        <div className="offcanvas-header justify-content-center">
          <h1 className="offcanvas-title mainColor mx-5" id="offcanvasExampleLabel">
            Dash<span className="text-dark">Stack</span>
          </h1>
        </div>
        <hr />

        <div className="offcanvas-body p-0">
          <ul className="list-unstyled">
            {menuItems.map((item) =>
              item.subItems ? (
                <li key={item.key} className="p-3 rounded">
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ cursor: "pointer", color: "black" }}
                    onClick={() => handleDropdownClick(item.key)}
                  >
                    <div className="d-flex align-items-center">
                      {item.icon}
                      <span className="ms-3">{item.label}</span>
                    </div>
                    {(item.key === "complaint-tracking" && isComplaintDropdownOpen) ||
                    (item.key === "security-management" && isSecurityDropdownOpen) ||
                    (item.key === "financialmanagement" && isFinancialDropdownOpen) ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </div>
                  {(item.key === "complaint-tracking" && isComplaintDropdownOpen) ||
                  (item.key === "security-management" && isSecurityDropdownOpen) ||
                  (item.key === "financialmanagement" && isFinancialDropdownOpen) ? (
                    <ul className="list-unstyled ms-4">
                      {item.subItems.map((subItem) => (
                        <li
                          key={subItem.key}
                          className={`p-2 rounded ${activeItem === subItem.key ? "mainColor2 text-white" : ""}`}
                        >
                          <Link
                            to={subItem.path}
                            className="d-flex align-items-center"
                            style={{
                              textDecoration: "none",
                              color: activeItem === subItem.key ? "white" : "black",
                            }}
                          >
                            <span>{subItem.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ) : (
                <li key={item.key} className={`p-3 rounded ${activeItem === item.key ? "mainColor2" : ""}`}>
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
                    <span className="ms-3">{item.label}</span>
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
        <hr />

        <div className="p-3">
          <Link to="/" className="d-flex align-items-center text-danger" style={{ textDecoration: "none" }}>
            <FaSignOutAlt className="me-3" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
