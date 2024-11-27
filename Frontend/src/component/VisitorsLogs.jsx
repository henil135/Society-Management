import React, { useState, useEffect } from 'react';
import {Table } from 'react-bootstrap';


import Avtar from "../assets/Avatar.png"
import Header from './Navbar';
import Sidebar from "../component/layout/Sidebar";
 function DetailTracking() {
  const [details, setDetails] = useState([
    { id: 1, name: "Evelyn Harper", phoneNumber: "9313876347", date: "20/02/2002", unit: "A", number: "1001", time: "3:45 PM" },
    { id: 2, name: "Esther Howard", phoneNumber: "9313876347", date: "20/02/2002", unit: "B", number: "1002", time: "3:45 PM" },
  ]);


  return (
    <div className="d-flex flex-column flex-md-row">
      <div className="flex-shrink-0" >
        <Sidebar />
      </div>

      <div className="flex-grow-1 dashboard-bg"  style={{width:"1920px"}}>
        <Header/>

        <div className="container-fluid stickyHeader p-3" style={{ width:"1615px",marginLeft:"300px" }}>

          

          <div className="table-responsive" style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", backgroundColor: "#fff", padding: "20px", marginTop: "20px" }}>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
            <h4 className="mb-0">Detail Tracking</h4>
          </div>
            <Table  style={{ width: "1525px" }}>
              <thead style={{background:"rgb(185, 198, 242)", color: "black" }}>
                <tr className="text-start" >
                  <th style={{width:"300px"}}>Visitor Name</th>
                  <th style={{width:"350px"}} className='text-center'>Phone Number</th>
                  <th style={{width:"350px"}} className="text-center">Date</th>
                  <th style={{width:"350px"}} className="text-center">Unit Number</th>
                  <th style={{width:"350px"}} className="text-center">Time</th>
                </tr>
              </thead>
              <tbody >
                {details.map((details) => (
                  <tr key={details.id} className="text-start" >
                    <td style={{ padding: "15px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
                        <img
                          src={Avtar}
                          alt="avatar"
                          className="rounded-circle"
                          style={{ width: "30px", height: "30px", marginRight: "10px" }}
                        />
                        {details.name}
                      </div>
                    </td>
                    <td style={{ verticalAlign: "middle" }} className='text-center'>{details.phoneNumber}</td>
                    <td style={{ verticalAlign: "middle" }} className="text-center">{details.date}</td>
                    <td style={{ verticalAlign: "middle" }} className="text-center">
                      {/* Unit in a round circle */}
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <div
                          style={{
                            border: "1px solid ", borderRadius: "50%", width: "28px", height: "28px", display: "inline-flex", justifyContent: "center", alignItems: "center", color: "skyblue", verticalAlign: "middle"
                          }}
                        >
                          {details.unit}
                        </div>
                        {/* Unit number without any special formatting */}
                        <div>{details.number}</div>

                      </div>
                    </td>
                    <td style={{ verticalAlign: "middle" }} className="text-center">
                      <div
                        style={{
                          width: "92px",
                          height: "34px",
                          padding: "5px 15px",
                          gap: "10px",
                          borderRadius: "50px",
                          background: "#F6F8FB",
                          color: "#4F4F4F",
                          display: "inline-block", // Ensures width and height are applied properly
                        }}
                      >
                        {details.time}
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>


    </div>
  );
}
export default DetailTracking;