import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { Link, useLocation } from "react-router-dom";
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import "../../style.css";
import securityIcon from "../../Icons/security.png";
import Logo from "../Logo";
import HideBgCopy from "../../assets/HideBgCopy.png";
import BlackImage from '../../assets/Rectangle 1888.png'
import ArrowIcon from '../../Icons/arrow-down.png'
function SecuritySidebar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");
  const [isGeneralSecurityDropdownOpen, setGeneralSecurityDropdownOpen] = useState(false);
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
            if (item.key === "security") setGeneralSecurityDropdownOpen(true);
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
 
   if (key === "security") {
      setGeneralSecurityDropdownOpen(!isGeneralSecurityDropdownOpen);
    
    } 
    setActiveItem(key);
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
      key: "security",
      label: "Security",
      icon: <img src={securityIcon} />,
      subItems: [
        { key: "visitor-tracking", label: "Visitor Tracking", path: "/visitor-tracking" },
        { key: "emergency-management", label: "Emergency Management", path: "/emergency-management" },
      ],
    },
   

  ];

  return (
    <div style={{fontSize:'14px'}}>
      <button
        className="btn d-sm-none d-md-none d-lg-none"
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

  (item.key === "security" && isGeneralSecurityDropdownOpen) 
   ? (
    <img src={ArrowIcon}  />
  ) : (
    <img src={ArrowIcon} />
  )
}


                  </div>
                  {
                    (item.key === "security" && isGeneralSecurityDropdownOpen)       ? (

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
          <Link to="/login" className="d-flex align-items-center text-danger" style={{ textDecoration: "none" }}>
            <FaSignOutAlt className="me-3" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SecuritySidebar;
