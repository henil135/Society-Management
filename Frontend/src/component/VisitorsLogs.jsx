import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../component/layout/Sidebar";
import Header from "./Navbar";
import Avtar from '../assets/Avatar.png';

const DetailsTracking = () => {
  const protocols = [
    { id: 1, name: "Evelyn Harper", phoneNumber: "9313876347", date: "20/02/2002", unit: "A", number: "1001", time: "3:45 PM" },
    { id: 2, name: "Esther Howard", phoneNumber: "9313876347", date: "20/02/2002", unit: "B", number: "1002", time: "3:45 PM" },
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
        <div className="text-white p-1" >
          <Sidebar />
        </div>

        {/* Main Content Area */}

        <div
      className="container-fluid p-4 marginLeft"
      style={{
        
        height: "100vh",
      }}
    >

      {/* Table Wrapper with Responsive Scrolling */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 className="mb-4">Visitor Logs</h3>
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
                <th >Visitor Name</th>
                <th className='text-start'>Phone Number</th>
                <th className='text-center'>Date</th>
                <th className='text-center'>Unit Number</th>
                <th className='text-center'>Time</th>
              </tr>
            </thead>
            <tbody>
  {protocols.map((protocol, index) => (
    <tr key={index}>
       <td >
                      <div  >
                        <img
                          src={Avtar}
                         
                          className="rounded-circle"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "36px",
                            border: "2px solid #F4F4F4",
                          }}
                        />

                       
                          <span
                            style={{
                              fontFamily: "Poppins",
                              fontSize: "16px",
                              fontWeight: "500",
                              lineHeight: "24px",
                              textAlign: "left",
                            }}
                          >
                            {protocol.name}
                          </span>
                       
                          
                        
                      </div>

                    </td>
      <td className='text-start'>{protocol.phoneNumber}</td>
      <td className='text-center'>{protocol.date}</td>
      <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
        <span style={{ border: "1px solid ", borderRadius: "50%", width: "28px", height: "28px", display: "inline-flex", justifyContent: "center", alignItems: "center", color: "skyblue" }}>
          {protocol.unit}
        </span>
        <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: "500", fontSize: "16px", lineHeight: "24px", marginLeft: "8px" }}>
          {protocol.number}
        </span>
      </td>
      <td className='text-center'>
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

export default DetailsTracking;
