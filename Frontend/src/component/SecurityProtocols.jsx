import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa';


import Header from './Navbar';
import Sidebar from "../component/layout/Sidebar";
import viewICon from '../Icons/view.png'
import deleteIcon from '../Icons/delete.png'
import editIcon from '../Icons/Edit.png'
import axios from 'axios';
function SecurityProtocols() {
  const [protocols, setProtocols] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editProtocolId, setEditProtocolId] = useState(null);
  const [deleteProtocolId, setDeleteProtocolId] = useState(null);
  const [protocolData, setProtocolData] = useState({ Title: "", Description: "", Date: "", Time: "" });

  const handleShowCreate = () => {
    setIsEdit(false);
    setProtocolData({ title: "", description: "", date: "", time: "" });
    setShowModal(true);
  };

  const handleShowEdit = (protocol) => {
    setIsEdit(true);
    setEditProtocolId(protocol._id);
    setProtocolData(protocol);
    setShowModal(true);
  };

  const handleShowView = (protocol) => {
    setProtocolData(protocol);
    setShowViewModal(true);
  };

  const handleShowDelete = (protocolId) => {
    setDeleteProtocolId(protocolId);
    setShowDeleteModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
    setShowViewModal(false);
    setShowDeleteModal(false); // Close the delete confirmation modal when handleClose is called
    setProtocolData({ Title: "", Description: "", Date: "", Time: "" });
    setDeleteProtocolId(null); // Clear the ID of the protocol to delete
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProtocolData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchProtocols = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v2/securityprotocol/');
        if (response.data.success) {
          setProtocols(response.data.data); // Assuming data contains the list of protocols
        } else {
          console.error('Failed to fetch protocols:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching protocols:', error);
      }
    };

    fetchProtocols();
  }, []);

  const handleSave = async () => {
    try {
      if (isEdit) {
        // Update protocol
        const response = await axios.put(`http://localhost:5000/api/v2/securityprotocol/update/${editProtocolId}`, protocolData);
        if (response.data.success) {
          setProtocols((prev) =>
            prev.map((protocol) =>
              protocol.id === editProtocolId ? { ...protocol, ...protocolData } : protocol
            )
          );
        } else {
          console.error('Error updating protocol:', response.data.message);
        }
      } else {
        // Add new protocol
        const response = await axios.post('http://localhost:5000/api/v2/securityprotocol/addsecurityprotocol', protocolData);
        if (response.data.success) {
          setProtocols((prev) => [...prev, response.data.data]); // Assuming the new protocol is returned in data
        } else {
          console.error('Error adding protocol:', response.data.message);
        }
      }
    } catch (error) {
      console.error('Error saving protocol:', error);
    }

    handleClose();
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/v2/securityprotocol/delete/${deleteProtocolId}`);
      if (response.data.success) {
        setProtocols((prev) => prev.filter((protocol) => protocol._id !== deleteProtocolId));
      } else {
        console.error('Error deleting protocol:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting protocol:', error);
    }

    handleClose();
  };
  return (
    <div className="d-flex flex-column flex-md-row">
      <div className="flex-shrink-0" >
        <Sidebar />
      </div>

      <div className="flex-grow-1 dashboard-bg" style={{ width: "1920px" }}>
        <Header />

        <div className="container-fluid stickyHeader p-3" style={{ width: "1620px",marginLeft:"300px" }}>



          {/* Modal for creating or editing a protocol */}
          <Modal show={showModal} onHide={handleClose} centered className='Round-modal'>
            <Modal.Header >
              <Modal.Title>{isEdit ? "Edit Security Protocol" : "Create Security Protocol"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formTitle">
                  <Form.Label>Title<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    name="Title"
                    value={protocolData.Title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formDescription" className="mt-3">
                  <Form.Label>Description<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Description"
                    name="Description"
                    value={protocolData.Description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="d-flex gap-3 mt-3">
                  <div className="flex-fill">
                    <Form.Label>Date<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="date"
                      name="Date"
                      value={protocolData.Date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex-fill">
                    <Form.Label>Time<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="time"
                      name="Time"
                      value={protocolData.Time}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
              <Button style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px 10px 55px", background: "#FFFFFF", color: "#202224", }} className='cancle' onClick={handleClose}>
                Cancel
              </Button>
              <Button style={{
                width: "175px", height: "51px", border: "1px", padding: "10px 55px 10px 55px", color: "#202224",

              }} className='save' onClick={handleSave}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>


          <Modal show={showDeleteModal} onHide={handleClose} centered className='Round-modal'>
            <Modal.Header >
              <Modal.Title>Delete Protocol?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to delete this protocol?</p>
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
              <Button className='cancle' onClick={handleClose} style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px 10px 55px", background: "#FFFFFF", color: "#202224", }}>
                Cancel
              </Button>
              <Button onClick={handleDelete} style={{
                width: "175px", height: "51px", border: "1px", padding: "10px 55px 10px 55px", color: "#202224", background: "rgba(231, 76, 60, 1)"
              }}>
                Delete
              </Button>

            </Modal.Footer>
          </Modal>
          {/* View-only modal for displaying protocol details */}
          <Modal show={showViewModal} onHide={handleClose} centered className='Round-modal'> 
            <Modal.Header closeButton>
              <Modal.Title>View Security Protocols</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Title<br />
                <strong style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "24px",
                  textAlign: "left",
                  textUnderlinePosition: "from-font",
                  textDecorationSkipInk: "none",
                  color: "black",
                }}>
                  {protocolData.Title}
                </strong>

              </p>
              <p> Description<br />
                <strong style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "24px",
                  textAlign: "left",
                  textUnderlinePosition: "from-font",
                  textDecorationSkipInk: "none",
                  color: "black",
                }}>{protocolData.Description}</strong>
              </p>
              <div className="d-flex" style={{ gap: "70px" }}>
                <div>
                  <p>Date</p>
                  <strong style={{

                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "24px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                    color: "black",
                  }}>{protocolData.Date}</strong>
                </div>
                <div>
                  <p>Time</p>
                  <strong style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "24px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                    color: "black",
                  }}>{protocolData.Time}</strong>
                </div>
              </div>
            </Modal.Body>

          </Modal>

          <div className="table-responsive" style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", backgroundColor: "#fff", padding: "20px", marginTop: "20px" }}>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
              <h4 className="mb-0" >Security Protocols</h4>
              <Button className="btn mainColor2 d-flex align-items-center justify-content-center p-2" style={{ border:"none"}} onClick={handleShowCreate}><FaPlus
                 style={{
                  fontSize: "18px",
                  borderRadius: "5px",
                  background: "rgba(255, 255, 255, 1)",
                  color: "#FE512E",
                  marginRight: "8px",
                }}
              
              />Create Protocols</Button>
            </div>
            <Table  style={{ width: "1545px" }}>
              <thead style={{ background: "rgb(185, 198, 242)", color: "black" }}>
                <tr className="text-start" >
                  <th style={{ width: "20%" }}>Title</th>
                  <th style={{ width: "30%" }} className="text-start">Description</th>
                  <th className="text-center" style={{ width: "20%" }}>Date</th>
                  <th className="text-center" style={{ width: "20%" }}>Time</th>
                  <th className="text-center" style={{ width: "20%" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {protocols.map((protocol) => (
                  <tr key={protocol.id} className="text-start" >
                    <td style={{ padding: "15px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
                        {protocol.Title}
                      </div>
                    </td>
                    <td style={{ verticalAlign: "middle", width: "300px" }}>{protocol.Description}</td>
                    <td style={{ verticalAlign: "middle" }} className="text-center">{protocol.Date}</td>
                    <td style={{ verticalAlign: "middle" }} className="text-center">
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <div
                          style={{
                            width: "100px",
                          
                            padding: "5px 15px",
                            gap: "10px",
                            borderRadius: "50px",
                            background: "#F6F8FB",
                            color: "#4F4F4F",
                            display: "inline-block",
                          }}
                        >
                          {protocol.Time}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
                      <div className="d-flex align-items-center justify-content-center">
                      <img src={editIcon} className="text-success me-2" style={{ cursor: "pointer" }} onClick={() => handleShowEdit(protocol)} />
                  <img src={viewICon} className="text-primary me-2" style={{ cursor: "pointer" }} onClick={() => handleShowView(protocol)} />
                  <img src={deleteIcon} className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleShowDelete(protocol._id)} />
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
export default SecurityProtocols;