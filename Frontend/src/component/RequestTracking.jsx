import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import axios from 'axios'
import Avtar from "../assets/Avatar.png"
import Header from './Navbar';
import Sidebar from "../component/layout/Sidebar";
import viewICon from '../Icons/view.png'
import deleteIcon from '../Icons/delete.png'
import editIcon from '../Icons/Edit.png'

function RequestTracking() {
  const [requests, setRequests] = useState([
    // { id: 1, name: "Evelyn Harper", type: "Unethical Behavior", description: "Providing false information or", date: "20/10/2002", unit: "A", number: "1001", Priority: "Medium", Status: "Pending" },
    // { id: 2, name: "Esther Howard", type: "Preventive Measures", description: "Regular waste collection services", date: "20/10/2002", unit: "B", number: "1002", Priority: "High", Status: "Solve" },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteRequestId, setDeleteRequestId] = useState(null);

  // New state for the "Create Request" feature
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRequest, setNewRequest] = useState({
    Requester_name: "",
    Request_name: "",
    // description: "",
    Request_date: "",
    Wing: "",
    Unit: "",
    Priority: "Medium",
    Status: "Open",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const handleEdit = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSave = async () => {
    if (!selectedRequest.Requester_name || !selectedRequest.Request_name || !selectedRequest.Request_date || !selectedRequest.Wing || !selectedRequest.Unit) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/v2/requests/updaterequest/${selectedRequest._id}`, selectedRequest);
      setRequests((prevRequests) =>
        prevRequests.map((r) => (r._id === selectedRequest._id ? response.data.request : r)) // Assuming `request` is returned in the response
      );
      setShowModal(false);
      setErrorMessage("");
    } catch (error) {
      console.error("Error updating request:", error);
      setErrorMessage("Failed to update request. Please try again.");
    }
  };

  const handleView = (request) => {
    setSelectedRequest(request);
    setShowViewModal(true);
  };
  const handleClose = () =>{
    setShowDeleteModal(false); 
    setDeleteRequestId(null); 
  }
 
  const handleCloseViewModal = () => setShowViewModal(false);

  const getPriorityByStatus = (Status) => {
    if (Status === "Pending") return "Medium";
    if (Status === "Open") return "Low";
    if (Status === "Solve") return "High";
    return "Medium";
  };

  const badgeStyle = (Priority) => {
    if (Priority === "High") return { backgroundColor: "#E74C3C", color: "white" };
    if (Priority === "Medium") return { backgroundColor: "#5678E9", color: "white" };
    if (Priority === "Low") return { backgroundColor: "#39973D", color: "white" };
    return { backgroundColor: "#28a745", color: "white" };
  };

  const StatusBadgeStyle = (Status) => {
    if (Status === "Pending") return { backgroundColor: " #FFC3131A", color: "#FFC313" };
    if (Status === "Open") return { backgroundColor: "#5678E91A", color: "#5678E9" };
    if (Status === "Solve") return { backgroundColor: "#39973D1A", color: "#39973D" };
    return { backgroundColor: "#f8f9fa", color: "black" };
  };

  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  useEffect(() => {
    fetchRequests();
  }, []);
  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v2/requests/");
      setRequests(response.data.requests); // Assuming the API returns a `requests` array
    } catch (error) {
      console.error("Error fetching requests:", error);
      setErrorMessage("Failed to load requests.");
    }
  };

  const handleCreateRequest = async () => {
    if (!newRequest.Requester_name || !newRequest.Request_name || !newRequest.Request_date || !newRequest.Wing || !newRequest.Unit) {
      setErrorMessage("All fields are required.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/v2/requests/addrequest", newRequest);
      if (response.status === 201) {
        // Re-fetch the data after adding a request
        fetchRequests(); // Assuming you have a `fetchRequests` function that fetches the latest requests
        setNewRequest({ Requester_name: "", Request_name: "", Request_date: "", Wing: "", Unit: "", Priority: "Medium", Status: "Open" });
        setShowCreateModal(false);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error creating request:", error);
      setErrorMessage("Failed to create request. Please try again.");
    }
  };
  



  const imageColumnStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "10px",
  };
  const tableColumnStyle = {
    whiteSpace: "normal",
    wordWrap: "break-word",
    padding: "15px",
    textAlign: "center",
    verticalAlign: "middle",
    maxWidth: "350px",
  };

  // const handleDelete = (id) => {
  //   setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
  // };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v2/requests/deleterequest/${_id}`);
      setRequests((prevRequests) => prevRequests.filter((request) => request._id !== _id));
      
    } catch (error) {
      console.error("Error deleting request:", error);
      setErrorMessage("Failed to delete request. Please try again.");
    }

  };

  const handleShowDelete = (requestId) => {
    setDeleteRequestId(requestId);
    setShowDeleteModal(true);
  };

  return (
    <div className="d-flex flex-column flex-md-row">


      <div className="flex-shrink-0" >
        <Sidebar />
      </div>

      <div className="flex-grow-1 dashboard-bg " style={{ width: "1920px" }}>
        <Header />
        <div className="container-fluid stickyHeader p-4" style={{ marginLeft: "295px", width: "1620px" }}>



          <div className="table-responsive" style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", backgroundColor: "#fff", padding: "5px", marginTop: "20px" }}>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-2 mb-4">
              <h4 className="mb-0" style={{ marginLeft: "20px" }}>Request Tracking</h4>
              <Button className="btn mainColor2 d-flex align-items-center justify-content-center p-2" style={{ marginRight: "20px", border: "none" }} onClick={handleShowCreateModal}>
          Create Request</Button>
            </div>
            <Table style={{ width: "1535px", marginLeft: "15px" }}>
              <thead >
                <tr className="rmHead " >
                  <th className="text-start" style={{ padding: "5px", fontSize: "14px", paddingLeft: "20px", background: "rgb(185, 198, 242)" }}>Requester Name</th>
                  <th className="text-start" style={{ padding: "8px", fontSize: "14px", background: "rgb(185, 198, 242)" }}>Request Name</th>
                  <th className="text-start" style={{ padding: "8px", fontSize: "14px", background: "rgb(185, 198, 242)" }}>Description</th>
                  <th className="text-center" style={{ padding: "8px", fontSize: "14px", background: "rgb(185, 198, 242)" }}>Request Date</th>
                  <th className="text-center" style={{ padding: "8px", fontSize: "14px", background: "rgb(185, 198, 242)" }}>Unit Number</th>
                  <th className="text-center" style={{ padding: "5px", fontSize: "14px", background: "rgb(185, 198, 242)" }}>Priority</th>
                  <th className="text-center" style={{ padding: "5px", fontSize: "14px", background: "rgb(185, 198, 242)" }}>Status</th>
                  <th className="text-center" style={{ padding: "15px", fontSize: "14px", background: "rgb(185, 198, 242)" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id} >
                    <td style={tableColumnStyle}>
                      <div style={imageColumnStyle} className="text-center">
                        <img
                          src={Avtar}
                          alt="avatar"
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
                          {request?.Requester_name}
                        </span>
                      </div>
                    </td>

                    <td style={{ textAlign: "center", verticalAlign: "middle" }} className="text-start">
                      {request?.Request_name}
                    </td>
                    <td style={{
                      ...tableColumnStyle,
                      width: "200px",
                      height: "24px",
                      top: "21px",
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fontWeight: "500",
                      lineHeight: "24px",
                      textAlign: "left",
                    }}>
                      {request?.Description}
                    </td>

                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle", width: "150px" }} className="text-center">
                      {new Date(request?.Request_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
                      <span style={{ border: "1px solid ", borderRadius: "50%", width: "28px", height: "28px", display: "inline-flex", justifyContent: "center", alignItems: "center", color: "skyblue" }}>
                        {request?.Wing}
                      </span>
                      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: "500", fontSize: "16px", lineHeight: "24px", marginLeft: "8px" }}>
                        {request?.Unit}
                      </span>
                    </td>
                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
                      <span className="badge" style={{ ...badgeStyle(request.Priority), width: "100px", height: "31px", padding: "5px 12px", gap: "8px", borderRadius: "50px", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                        {request?.Priority}
                      </span>
                    </td>
                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
                      <span style={{ ...StatusBadgeStyle(request.Status), width: "113px", height: "31px", padding: "5px 12px", gap: "5px", borderRadius: "50px", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                        {request?.Status}
                      </span>
                    </td>
                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
                      <div className="d-flex align-items-center justify-content-center">
                        <img src={editIcon} className="text-success me-2" style={{ cursor: "pointer" }} onClick={() => handleEdit(request)} />
                        <img src={viewICon} className="text-primary me-2" style={{ cursor: "pointer" }} onClick={() => handleView(request)} />
                        <img src={deleteIcon} className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleDelete(request._id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

          </div>



          {/* Create Complaint Modal */}

          <Modal show={showCreateModal} onHide={handleCloseCreateModal} centered className='Round-modal'>
            <Modal.Header >
              <Modal.Title>Create Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              <Form>
                <Form.Group className='mt-2'>
                  <Form.Label>Requester Name<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    value={newRequest.Requester_name}
                    onChange={(e) => setNewRequest({ ...newRequest, Requester_name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className='mt-2'>
                  <Form.Label>Request Name<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    value={newRequest.Request_name}
                    onChange={(e) => setNewRequest({ ...newRequest, Request_name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className='mt-2'>
                  <Form.Label>Description<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    value={newRequest.Description}
                    onChange={(e) => setNewRequest({ ...newRequest, Description: e.target.value })}
                  />
                  <Form.Group className='mt-2'>
                    <Form.Label>Request Date<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="date"
                      value={newRequest.Request_date}
                      onChange={(e) => setNewRequest({ ...newRequest, Request_date: e.target.value })}
                    />
                  </Form.Group>
                  <Form>
                    <div className='d-flex gap-2'>
                      <Form.Group className='mt-2'>
                        <Form.Label>Wing<span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="text"
                          value={newRequest.Wing}
                          onChange={(e) => setNewRequest({ ...newRequest, Wing: e.target.value })}
                        />
                      </Form.Group>

                      <Form.Group className='mt-2'>
                        <Form.Label>Unit<span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="text"
                          value={newRequest.Unit}
                          onChange={(e) => setNewRequest({ ...newRequest, Unit: e.target.value })}
                        />
                      </Form.Group>
                    </div>
                  </Form>
                </Form.Group>
                <Form.Group className='mt-2 '>
                  <Form.Label>Priority<span className="text-danger">*</span></Form.Label>
                  <div className="d-flex justify-content-around ">
                    <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
                      <Form.Check
                        className='radio-group'
                        type="radio"
                        label="High"
                        name="Priority"
                        value="High"
                        checked={newRequest.Priority === "High"}
                        onChange={(e) => setNewRequest({ ...newRequest, Priority: e.target.value })}
                      />
                    </div>
                    <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
                      <Form.Check
                        className='radio-group'
                        type="radio"
                        label="Medium"
                        name="Priority"
                        value="Medium"
                        checked={newRequest.Priority === "Medium"}
                        onChange={(e) => setNewRequest({ ...newRequest, Priority: e.target.value })}
                      />
                    </div>
                    <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
                      <Form.Check
                        className='radio-group'
                        type="radio"
                        label="Low"
                        name="Priority"
                        value="Low"
                        checked={newRequest.Priority === "Low"}
                        onChange={(e) => setNewRequest({ ...newRequest, Priority: e.target.value })}
                      />
                    </div>
                  </div>
                </Form.Group>

                <Form.Group className='mt-2'>
                  <Form.Label>Status<span className="text-danger">*</span></Form.Label>
                  <div className="d-flex justify-content-around">
                    <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
                      <Form.Check
                        className='radio-group'
                        type="radio"
                        label="Open"
                        name="Status"
                        value="Open"
                        checked={newRequest.Status === "Open"}
                        onChange={(e) => setNewRequest({ ...newRequest, Status: e.target.value })}
                      />
                    </div>
                    <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
                      <Form.Check
                        className='radio-group'
                        type="radio"
                        label="Pending"
                        name="Status"
                        value="Pending"
                        checked={newRequest.Status === "Pending"}
                        onChange={(e) => setNewRequest({ ...newRequest, Status: e.target.value })}
                      />
                    </div>
                    <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
                      <Form.Check
                        className='radio-group'
                        type="radio"
                        label="Solve"
                        name="Status"
                        value="Solve"
                        checked={newRequest.Status === "Solve"}
                        onChange={(e) => setNewRequest({ ...newRequest, Status: e.target.value })}
                      />
                    </div>
                  </div>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
              <Button className='cancle' onClick={handleCloseCreateModal} style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px 10px 55px", background: "#FFFFFF", color: "#202224" }}>
                Cancel
              </Button>
              <Button className="save" onClick={handleCreateRequest} style={{
                width: "175px", height: "51px", border: "1px", padding: "10px 55px 10px 55px", color: "#202224"
              }}>
                Create
              </Button>
            </Modal.Footer>
          </Modal>


          <Modal centered
            show={showViewModal}
            onHide={handleCloseViewModal}
            style={{
              width: "410px",
              left: "755px",
              padding: "20px 0px 0px 0px",
              borderRadius: "15px 0px 0px 0px",
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title
                style={{
                  width: "371px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                View Request
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                width: "371px",
                height: "400px",
                display: "flex",
                flexDirection: "column",
                gap: "25px",
                fontFamily: "Poppins, sans-serif",
              }}
            >




              {selectedRequest && (
                <div>
                  <div style={{
                    width: "285px",
                    height: "70px",
                    display: "flex",
                    gap: "15px",
                    fontFamily: "Poppins, sans-serif",
                  }}>
                    <img
                      src={Avtar}
                      alt="avatar"
                      style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%", // Ensures a perfect circle
                        border: "3px solid #F4F4F4",
                      }}
                    />
                    <div
                      style={{
                        height: "70px",
                        gap: "0px",
                        marginTop: "10px"
                      }}
                    >
                      <h5 style={{ margin: 0 }}>{selectedRequest.Requester_name}</h5>
                      <span style={{
                        color: "#A7A7A7",
                      }}>Aug 5, 2024</span>
                    </div>
                  </div>

                  <div style={{
                    height: "51px",
                    gap: "3px",
                    marginTop: "15px",
                  }}>
                    <strong style={{
                      color: "#A7A7A7",
                      fontWeight: "200"
                    }}>Request Name</strong> <br />
                    <span>{selectedRequest.Request_name}</span>
                  </div>
                  <div style={{
                    height: "75px",
                    gap: "3px",
                    marginTop: "15px",
                  }}>
                    <strong style={{
                      color: "#A7A7A7",
                      fontWeight: "200"
                    }}>Description</strong>
                    <p style={{ margin: 0 }}>{selectedRequest.Description}</p>
                  </div>

                  <div style={{
                    height: "51px",
                    gap: "3px",

                  }}>
                    <strong style={{
                      color: "#A7A7A7",
                      fontWeight: "200"
                    }}>Request Date</strong> <br />
                    <span>{new Date(selectedRequest.Request_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}</span>
                  </div>

                  <div
                    className="d-flex"
                    style={{
                      width: "370.25px",
                      gap: "10px",
                      justifyContent: "space-around",
                      marginTop: "20px"
                    }}
                  >
                    <div style={{
                      width: "41px",
                      height: "55px",
                      top: "166px",
                      gap: "3px",
                    }}>
                      <strong
                        style={{
                          fontFamily: "Poppins",
                          fontSize: "16px",
                          fontWeight: "400",
                          lineHeight: "24px",
                          textUnderlinePosition: "from-font",
                          textDecorationSkipInk: "none",
                          color: "#A7A7A7"
                        }}
                      >
                        Wing
                      </strong>

                      <p style={{ border: "1px solid ", borderRadius: "50%", width: "28px", height: "28px", display: "inline-flex", justifyContent: "center", alignItems: "center", color: "skyblue" }}>
                        {selectedRequest.Wing}
                      </p>
                    </div>

                    <div
                      style={{
                        width: "35px",
                        height: "51px",
                        top: "168px",
                        left: "89.25px",
                        gap: "3px",
                        textAlign: "center"
                      }}
                    >
                      <strong style={{
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontWeight: "400",
                        lineHeight: "24px",
                        textUnderlinePosition: "from-font",
                        textDecorationSkipInk: "none",
                        color: "#A7A7A7"
                      }}>Unit</strong>
                      <p
                        style={{
                          fontFamily: "Poppins",
                          fontSize: "16px",
                          fontWeight: "400",
                          lineHeight: "24px",
                          textUnderlinePosition: "from-font",
                          textDecorationSkipInk: "none",
                          color: "#202224",
                          width: "35px",
                          height: "24px",
                          margin: "0"
                        }}
                      >
                        {selectedRequest.Unit}
                      </p>
                    </div>

                    <div
                      style={{
                        width: "86px",
                        height: "55px",
                        top: "166px",
                        left: "172.25px",
                        gap: "3px",
                        textAlign: "center",
                      }}
                    >
                      <strong style={{
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontWeight: "400",
                        lineHeight: "24px",
                        textUnderlinePosition: "from-font",
                        textDecorationSkipInk: "none",
                        color: "#A7A7A7",
                      }}>Priority</strong>
                      <p
                        style={{
                          textAlign: "center",
                          borderRadius: "50px",
                          background: badgeStyle(selectedRequest.Priority).backgroundColor,
                          color: "white"
                        }}
                      >
                        {selectedRequest.Priority}
                      </p>
                    </div>

                    <div style={{
                      gap: "3px",
                      textAlign: "center",
                    }} >
                      <strong style={{
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontWeight: "400",
                        lineHeight: "24px",
                        textUnderlinePosition: "from-font",
                        textDecorationSkipInk: "none",
                        color: "#A7A7A7"
                      }}>Status</strong>
                      <p
                        style={{
                          textAlign: "center",
                          padding: "2px 10px",
                          borderRadius: "50px",
                          backgroundColor: StatusBadgeStyle(selectedRequest.Status).backgroundColor,
                          color: StatusBadgeStyle(selectedRequest.Status).color
                        }}
                      >
                        {selectedRequest.Status}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Modal.Body>
          </Modal>





          {/* edit model */}


          <Modal show={showModal} onHide={handleCloseModal} centered className='Round-modal'>
            <Modal.Header >
              <Modal.Title>Edit Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              <Form>
                <Form.Group className='mt-2'>
                  <Form.Label>Requester Name<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedRequest?.Requester_name || ""}
                    onChange={(e) =>
                      setSelectedRequest((prev) => ({
                        ...prev,
                        Requester_name: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group className='mt-2'>
                  <Form.Label>Request Name<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedRequest?.Request_name || ""}
                    onChange={(e) =>
                      setSelectedRequest((prev) => ({
                        ...prev,
                        Request_name: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group className='mt-2'>
                  <Form.Label>Description<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedRequest?.Description || ""}
                    onChange={(e) =>
                      setSelectedRequest((prev) => ({
                        ...prev,
                        Description: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group className='mt-2'>
                  <Form.Label>Request Date<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="date"
                    value={selectedRequest?.Request_date || ""}
                    onChange={(e) =>
                      setSelectedRequest((prev) => ({
                        ...prev,
                        Request_date: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
                <div className='d-flex gap-2'>
                  <Form.Group className='mt-2'>
                    <Form.Label>Wing<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedRequest?.Wing || ""}
                      onChange={(e) =>
                        setSelectedRequest((prev) => ({
                          ...prev,
                          Wing: e.target.value,
                        }))
                      }
                    />
                  </Form.Group>
                  <Form.Group className='mt-2'>
                    <Form.Label>Unit<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedRequest?.Unit || ""}
                      onChange={(e) =>
                        setSelectedRequest((prev) => ({
                          ...prev,
                          Unit: e.target.value,
                        }))
                      }
                    />
                  </Form.Group>
                </div>
                <Form.Group className='mt-2'>
                  <Form.Label>Priority<span className="text-danger">*</span></Form.Label>
                  <div className="d-flex justify-content-around">
                    {["High", "Medium", "Low"].map((Priority) => (
                      <Form.Check
                        className='radio-group'
                        type="radio"
                        style={{ border: "1px solid rgba(211, 211, 211, 1)", paddingLeft: "30px", paddingTop: "8px", paddingBottom: "8px", paddingRight: "30px", borderRadius: "5px" }}
                        label={Priority}
                        name="Priority"
                        value={Priority}
                        checked={selectedRequest?.Priority === Priority}
                        onChange={(e) =>
                          setSelectedRequest((prev) => ({
                            ...prev,
                            Priority: e.target.value,
                          }))
                        }
                        key={Priority}
                      />
                    ))}
                  </div>
                </Form.Group>
                <Form.Group className='mt-2'>
                  <Form.Label>Status<span className="text-danger">*</span></Form.Label>
                  <div className="d-flex justify-content-around">
                    {["Open", "Pending", "Solve"].map((Status) => (
                      <Form.Check
                        className='radio-group'
                        type="radio"
                        style={{ border: "1px solid rgba(211, 211, 211, 1)", paddingLeft: "30px", paddingTop: "8px", paddingBottom: "8px", paddingRight: "30px", borderRadius: "5px" }}
                        label={Status}
                        name="Status"
                        value={Status}
                        checked={selectedRequest?.Status === Status}
                        onChange={(e) =>
                          setSelectedRequest((prev) => ({
                            ...prev,
                            Status: e.target.value,
                          }))
                        }
                        key={Status}
                      />
                    ))}
                  </div>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
              <Button className='cancle' style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px", background: "#FFFFFF", color: "#202224" }} onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button style={{ width: "175px", height: "51px", padding: "10px 55px", color: "#202224" }} className="save" onClick={handleSave}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>


        </div>
      </div>
    </div>
  )
}
export default RequestTracking;