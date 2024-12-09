import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ResidentSidebar from "./layout/ResidentSidebar";
import Header from "./Navbar";


const SecurityProtocolsResident = () => {
  const protocols = [
    { title: "Cameron Williamson", description: "A visual representation of your spending categories.", date: "11/02/2024", time: "2:45 PM" },
    { title: "Darrell Steward", description: "Securing critical government systems.", date: "12/02/2024", time: "3:00 PM" },
    { title: "Courtney Henry", description: "Implementing surveillance in public spaces.", date: "13/02/2024", time: "4:30 AM" },
    { title: "Kathryn Murphy", description: "Tailor the dashboard to your unique financial.", date: "14/02/2024", time: "6:45 AM" },
    { title: "Kathryn Murphy", description: "Expenses will become way that makes sense.", date: "15/02/2024", time: "2:45 PM" },
    { title: "Arlene McCoy", description: "Helping you identify where your money is going.", date: "16/02/2024", time: "5:45 PM" },
    { title: "Eleanor Pena", description: "Simply navigate through the different sections.", date: "17/02/2024", time: "4:45 AM" },
    { title: "Brooklyn Simmons", description: "Expenses will become way that makes sense.", date: "18/02/2024", time: "3:45 PM" },
    { title: "Wade Warren", description: "Implementing surveillance in public spaces.", date: "19/02/2024", time: "9:45 AM" },
    { title: "Jane Cooper", description: "Expenses will become way that makes sense.", date: "20/02/2024", time: "3:45 PM" },
    { title: "Esther Howard", description: "A visual representation of your spending categories.", date: "21/02/2024", time: "9:45 PM" },
  ];

  return (
    <div className="container-fluid d-flex flex-column dashboard-bg">
      {/* Header Section */}
      <div className="bg-white border-bottom shadow-sm mb-4 stickyHeader">
        <Header />
      </div>

      {/* Main Content */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div className="text-white p-3" >
          <ResidentSidebar />
        </div>

        {/* Main Content Area */}

        <div
      className="container-fluid p-4 marginLeft"
      style={{
        
        height: "100vh",
      }}
    >
      <h3 className="mb-4">Security Protocols</h3>

      {/* Table Wrapper with Responsive Scrolling */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          className="table-responsive custom-scrollbar"
          style={{
            maxHeight: "500px",
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
          <table className="table  ">
            <thead>
              <tr style={{ backgroundColor: "#EAF0F6", fontWeight: "bold" }}>
                <th style={{ minWidth: "200px" }}>Title</th>
                <th style={{ minWidth: "300px" }}>Description</th>
                <th style={{ minWidth: "150px" }}>Date</th>
                <th style={{ minWidth: "150px" }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {protocols.map((protocol, index) => (
                <tr key={index}>
                  <td>{protocol.title}</td>
                  <td>{protocol.description}</td>
                  <td>{protocol.date}</td>
                  <td>
                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "12px",
                        backgroundColor: "#F4F6F9",
                        display: "inline-block",
                      }}
                    >
                      {protocol.time}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

      </div>
    </div>
  );
};

export default SecurityProtocolsResident;
