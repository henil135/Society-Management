import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./layout/Sidebar";
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
      <div className="bg-white border-bottom shadow-sm mb-4">
        <Header />
      </div>

      {/* Main Content */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div className="text-white p-3" >
          <Sidebar />
        </div>

        {/* Main Content Area */}

        <div className="p-3 flex-grow-1 stickyHeader " style={{  marginRight: "15px", marginLeft: "280px" }}>

  <div className="row">
    <div className="col-12">
      <div className="table-responsive bg-white shadow-sm rounded p-3">
        <h5 className="mb-4">Security Protocols</h5>
        <table className="table" style={{ width: "100%" }}>
          <thead className="thead-dark" style={{ background: "rgb(185, 198, 242)" }}>
            <tr>
              <th className="align-middle" style={{ width: "25%" }}>Title</th>
              <th className="align-middle" style={{ width: "35%" }}>Description</th>
              <th className="align-middle text-center" style={{ width: "20%" }}>Date</th>
              <th className="align-middle text-center" style={{ width: "20%" }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {protocols.map((protocol, index) => (
              <tr key={index}>
                <td className="text-wrap">{protocol.title}</td>
                <td className="text-wrap">{protocol.description}</td>
                <td className=" text-center">{protocol.date}</td>
                <td className=" text-center">
                    <div style={{width: "100px",padding: "5px ",borderRadius: "50px", background: "#F6F8FB",  color: "#4F4F4F",display: "inline-block",}}> {protocol.time} </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

    </div>
    </div>
  );
};

export default SecurityProtocolsResident;
