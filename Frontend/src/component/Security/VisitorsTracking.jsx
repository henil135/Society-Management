import { useState } from "react";
import SecuritySidebar from "../../component/layout/SecuritySidebar";
import Header from "../Navbar";
import { Button, Table, Form, Modal } from "react-bootstrap";
import Avtar from "../../assets/Avatar.png";
import { FaPlus } from "react-icons/fa";

function VisitorsTracking() {
  const [details, setDetails] = useState([
    { id: 1, name: "Evelyn Harper", phoneNumber: "9313876347", date: "20/02/2002", unit: "A", number: "1001", time: "3:45 PM" },
    { id: 2, name: "Esther Howard", phoneNumber: "9313876347", date: "20/02/2002", unit: "B", number: "1002", time: "3:45 PM" },
  ]);

  const [showModal, setShowModal] = useState(false);

  // Form inputs
  const [newVisitor, setNewVisitor] = useState({
    name: "",
    phoneNumber: "",
    date: "",
    unit: "",
    number: "",
    time: "",
  });

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewVisitor({
      name: "",
      phoneNumber: "",
      date: "",
      unit: "",
      number: "",
      time: "",
    });
  };
  
  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVisitor({ ...newVisitor, [name]: value });
  };

  // Handle save button click
  const handleSaveDetails = () => {
    if (
        !newVisitor.name ||
        !newVisitor.phoneNumber ||
        !newVisitor.date ||
        !newVisitor.unit ||
        !newVisitor.number ||
        !newVisitor.time
      ) {
        alert("All fields marked with * are required!");
        return;
      }
      
    // Add new entry to the details table
    setDetails([
      ...details,
      {
        id: details.length + 1, // Unique ID
        ...newVisitor,
      },
    ]);

    // Close modal and reset form
    handleCloseModal();
  };

  return (
    <div className="d-flex flex-column flex-md-row dashboard-bg">
      <div className="flex-shrink-0">
        <SecuritySidebar />
      </div>

      <div className="flex-grow-1">
        <Header />


        <div className="container-fluid p-3 stickyHeader marginLeft">

          <div
            className="table-responsive"
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              padding: "20px",
              marginTop: "20px",
            }}
          >
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
              <h4 className="mb-0">Visitors Tracking</h4>
              <div className="d-flex gap-3 align-items-center">
                <select
                  style={{ height: "50px", marginTop: "15px" }}
                  className="month-btn rounded-2 d-flex align-items-center bg-light text-dark"
                >
                  <option>Last week</option>
                  <option>Last month</option>
                  <option>Last year</option>
                </select>

                <Button
                  className="btn mainColor2 d-flex align-items-center justify-content-center p-2"
                  style={{ height: "45px", marginBottom: "5px", border:"none" }}
                  onClick={handleOpenModal}
                >
                  <FaPlus
                    style={{
                      fontSize: "18px",
                      borderRadius: "5px",
                      background: "rgba(255, 255, 255, 1)",
                      color: "#FE512E",
                      marginRight: "8px",
                    }}
                  />
                 Add Visiter details
                </Button>
              </div>
            </div>
            <Table >
              <thead style={{ background: "rgb(185, 198, 242)", color: "black" }}>
                <tr className="text-start" >
                  <th >Visitor Name</th>
                  <th>Phone Number</th>
                  <th>Date</th>
                  <th className="text-center">Unit Number</th>
                  <th className="text-center">Time</th>
                </tr>
              </thead>
              <tbody>
                {details.map((details) => (
                  <tr key={details.id} className="text-start">
                    <td style={{ paddingTop: "15px", paddingBottom: "15px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "start",
                        }}
                      >
                        <img
                          src={Avtar}
                          alt="avatar"
                          className="rounded-circle"
                          style={{ width: "30px", height: "30px", marginRight: "10px" }}
                        />
                        {details.name}
                      </div>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>{details.phoneNumber}</td>
                    <td style={{ verticalAlign: "middle" }}>{details.date}</td>
                    <td style={{ verticalAlign: "middle" }} className="text-center">
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <div
                          style={{
                            border: "1px solid ",
                            borderRadius: "50%",
                            width: "28px",
                            height: "28px",
                            display: "inline-flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "skyblue",
                            verticalAlign: "middle",
                          }}
                        >
                          {details.unit}
                        </div>
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
                          display: "inline-block",
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
      {/* Modal Component */}
      <Modal show={showModal} onHide={handleCloseModal} centered className="square-modal">
        <Modal.Header style={{ border: "none" }} >
          <Modal.Title>Add Visitor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
  {/* Visitor Name */}
  <Form.Group className="mb-3" controlId="formVisitorName">
    <Form.Label>
      Visitor Name<span className="text-danger">*</span>
    </Form.Label>
    <Form.Control
      type="text"
      placeholder="Enter Name"
      name="name"
      value={newVisitor.name}
      onChange={handleInputChange}
      required
    />
  </Form.Group>

  {/* Phone Number */}
  <Form.Group className="mb-3" controlId="formPhoneNumber">
    <Form.Label>
      Phone Number<span className="text-danger">*</span>
    </Form.Label>
    <Form.Control
      type="text"
      placeholder="Enter Phone Number"
      name="phoneNumber"
      value={newVisitor.phoneNumber}
      onChange={handleInputChange}
      required
    />
  </Form.Group>

  <div className="d-flex gap-2">
    {/* Wing */}
    <Form.Group className="mb-3" controlId="formWing">
      <Form.Label>
        Wing<span className="text-danger">*</span>
      </Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter Wing"
        name="unit"
        value={newVisitor.unit}
        onChange={handleInputChange}
        required
      />
    </Form.Group>

    {/* Unit Number */}
    <Form.Group className="mb-3" controlId="formUnitNumber">
      <Form.Label>
        Unit Number<span className="text-danger">*</span>
      </Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter Unit Number"
        name="number"
        value={newVisitor.number}
        onChange={handleInputChange}
        required
      />
    </Form.Group>
  </div>

  <div className="d-flex gap-2">
    {/* Date */}
    <Form.Group controlId="formDate">
      <Form.Label>
        Date<span className="text-danger">*</span>
      </Form.Label>
      <Form.Control
      style={{width:"180px"}}
        type="date"
        name="date"
        value={newVisitor.date}
        onChange={handleInputChange}
        required
      />
    </Form.Group>

    {/* Time */}
    <Form.Group controlId="formTime">
      <Form.Label>
        Time<span className="text-danger">*</span>
      </Form.Label>
      <Form.Control
      style={{width:"180px"}}
        type="time"
        name="time"
        value={newVisitor.time}
        onChange={handleInputChange}
        required
      />
    </Form.Group>
  </div>
</Form>
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}>
          <Button
            style={{
              width: "175px",
              height: "51px",
              border: "1px solid #202224",
              background: "#FFFFFF",
              color: "#202224",
            }}
            onClick={handleCloseModal}
            className="cancle"
          >
            Cancel
          </Button>
          <Button
          className="save"
            style={{
              width: "175px",
              height: "51px",
              border: "1px",
              color: "#FFFFFF",
              background: "#FE512E",
            }}
            onClick={handleSaveDetails}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default VisitorsTracking;
