import  { useEffect, useState } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import {  FaPlus,} from 'react-icons/fa';
// import { useEffect } from 'react';
import Avtar from "../assets/Avatar.png"
import Header from './Navbar';
import Sidebar from "../component/layout/Sidebar";
import viewICon from '../Icons/view.png'
import deleteIcon from '../Icons/delete.png'
import editIcon from '../Icons/Edit.png'
import axios from 'axios'
function ComplaintTracking() {
    const [complaints, setComplaints] = useState([
      // { id: 1, name: "Evelyn Harper", type: "Unethical Behavior", description: "Providing false information or  ", unit: "A", number: "1001", priority: "Medium", status: "Pending" },
      // { id: 2, name: "Esther Howard", type: "Preventive Measures", description: "Regular waste collection services  ", unit: "B", number: "1002", priority: "High", status: "Solve" },
    ]);

    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteComplainId, setDeleteComplainId] = useState(null);
    // New state for the "Create Complaint" feature
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newComplaint, setNewComplaint] = useState({
      Complainer_name: "",
      Complaint_name: "",
      Description: "",
      Wing: "",
      Unit: "",
      Priority: "Medium",
      Status: "Open",
    });


    const [errorMessage, setErrorMessage] = useState("");
    const handleEdit = (complaint) => {
      setSelectedComplaint(complaint);
      setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    // const handleSave = () => {
    //   if (!selectedComplaint.Complainer_name || !selectedComplaint.Complaint_name || !selectedComplaint.Description || !selectedComplaint.Wing || !selectedComplaint.Unit) {
    //     setErrorMessage("All fields are required.");
    //     return;
    //   }

    //   setComplaints((prevComplaints) =>
    //     prevComplaints.map((c) =>
    //       c.id === selectedComplaint.id ? selectedComplaint : c
    //     )
    //   );

    //   setShowModal(false);
    //   setErrorMessage("");
    // };

    const handleSave = async () => {
      if (!selectedComplaint.Complainer_name || !selectedComplaint.Complaint_name || !selectedComplaint.Description || !selectedComplaint.Wing || !selectedComplaint.Unit) {
        setErrorMessage("All fields are required.");
        return;
      }
    
      try {
        const response = await axios.put(
          `https://society-management-b6tj.onrender.com/api/v2/complaint/updatecomplaint/${selectedComplaint._id}`,
          selectedComplaint
        );
    
        // Update the local state after successful update
        setComplaints((prevComplaints) =>
          prevComplaints.map((c) => (c.id === selectedComplaint.id ? response.data.updatedComplaint : c))
        );
    
        setShowModal(false);
        setErrorMessage("");
        fetchComplaints();
      } catch (error) {
        console.error("Error updating complaint:", error);
        setErrorMessage("Failed to update complaint. Please try again.");
      }
    };

    const handleView = (complaint) => {
      setSelectedComplaint(complaint);
      setShowViewModal(true);
    };

    const handleCloseViewModal = () => setShowViewModal(false);

    const handleClose = () =>{
      setShowDeleteModal(false); 
      setDeleteComplainId(null); 
    }
    // const handleDelete = async () => {
    //   setComplaints((prev) => prev.filter((complain) => complain._id !== deleteComplainId));
    // }
    const badgeStyle = (priority) => {
      if (priority === "High") return { backgroundColor: "#E74C3C", color: "white" };
      if (priority === "Medium") return { backgroundColor: "#5678E9", color: "white" };
      if (priority === "Low") return { backgroundColor: "#39973D", color: "white" };
      return { backgroundColor: "#28a745", color: "white" };
    };

    const statusBadgeStyle = (status) => {
      if (status === "Pending") return { backgroundColor: " #FFC3131A", color: "#FFC313" };
      if (status === "Open") return { backgroundColor: "#5678E91A", color: "#5678E9" };
      if (status === "Solve") return { backgroundColor: "#39973D1A", color: "#39973D" };
      return { backgroundColor: "#f8f9fa", color: "black" };
    };

    const handleShowCreateModal = () => setShowCreateModal(true);
    const handleCloseCreateModal = () => setShowCreateModal(false);


    const handleCreateComplaint = async () => {
      // Basic form validation
      if (!newComplaint.Complainer_name || !newComplaint.Complaint_name || !newComplaint.Description || !newComplaint.Wing || !newComplaint.Unit) {
        setErrorMessage("All fields are required.");
        return;
      }

      try {
        const response = await axios.post("https://society-management-b6tj.onrender.com/api/v2/complaint/addcomplaint", newComplaint);
        setComplaints(response.data.complaints); // Assuming response.data contains the created complaint
        setNewComplaint({ Complainer_name: "", Complaint_name: "", Description: "", Wing: "", Unit: "", Priority: "Medium", Status: "Open" });
        setShowCreateModal(false);
        setErrorMessage("");
        fetchComplaints();
      } catch (error) {
        console.error("Error creating complaint:", error);
        setErrorMessage("Failed to create complaint. Please try again.");
      }
    };

    const fetchComplaints = async () => {
      try {
        const response = await axios.get("https://society-management-b6tj.onrender.com/api/v2/complaint/");
        console.log(response.data.complaints); // Log API response
        setComplaints(response.data.complaints); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    useEffect(() => {

      fetchComplaints();
    }, []);

    // Trigger this effect whenever priority changes



    const imageColumnStyle = {
      display: "flex",
      alignItems: "center", // Aligns the image and text horizontally
      justifyContent: "flex-start", // Ensures the content starts from the left
      gap: "10px", // Space between the image and the name
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
    //   setComplaints((prevComplaints) => prevComplaints.filter((complaint) => complaint.id !== id));
    // };


    const handleDelete = async (id) => {
      try {
        await axios.delete(`https://society-management-b6tj.onrender.com/api/v2/complaint/deletecomplaint/${id}`);
        
        // Update the local state after successful deletion
        setComplaints((prevComplaints) => prevComplaints.filter((complaint) => complaint.id !== id));
        fetchComplaints()
      } catch (error) {
        console.error("Error deleting complaint:", error);
        setErrorMessage("Failed to delete complaint. Please try again.");
      }

    };

  return (

    <div className="d-flex flex-column flex-md-row w-100">

      <div className="flex-shrink-0" >
        <Sidebar />
      </div>

      <div className="flex-grow-1 dashboard-bg " >
        <Header />


        <div className="container-fluid stickyHeader p-3" style={{marginLeft: "310px" , width: '1595px' }}>


          <div className="table-responsive" style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", backgroundColor: "#fff", padding: "20px", marginTop: "20px" }}>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center ">
              <h4 className="mb-0" >Complaint Tracking</h4>
              <Button className="btn mainColor2 d-flex align-items-center justify-content-center p-2" style={{ border: "none" }} onClick={handleShowCreateModal}>Create Complaint</Button>
            </div>
            <Table className="mt-3" >
              <thead className="bg-light">
                <tr className="rmHead">
                  <th className="text-start" style={{ padding: "10px", background: "rgb(185, 198, 242)" }}>Complainer Name</th>
                  <th className="text-start" style={{ padding: "10px", background: "rgb(185, 198, 242)" }}>Complaint Name</th>
                  <th className="text-center" style={{ padding: "10px", background: "rgb(185, 198, 242)" }}>Description</th>
                  <th className="text-center" style={{ padding: "10px", background: "rgb(185, 198, 242)" }}>Unit Number</th>
                  <th className="text-center" style={{ padding: "10px", background: "rgb(185, 198, 242)" }}>Priority</th>
                  <th className="text-center" style={{ padding: "10px", background: "rgb(185, 198, 242)" }}>Status</th>
                  <th className="text-center" style={{ padding: "10px", background: "rgb(185, 198, 242)" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints?.length > 0 ? (
                  complaints.map((complaint) => (
                    <tr key={complaint?.id}>
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
                            {complaint?.Complainer_name}
                          </span>
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "15px",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        className="text-start"
                      >
                        {complaint?.Complaint_name}
                      </td>
                      <td className='text-center'
                        style={{
                          ...tableColumnStyle,
                          width: "250px",
                          height: "24px",
                          fontFamily: "Poppins",
                          fontSize: "16px",
                          fontWeight: "500",
                          lineHeight: "24px",
                          textAlign: "left",
                        }}
                      >
                        {complaint?.Description}
                      </td>
                      <td
                        style={{
                          padding: "15px",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          style={{
                            border: "1px solid",
                            borderRadius: "50%",
                            width: "28px",
                            height: "28px",
                            display: "inline-flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "skyblue",
                          }}
                        >
                          {complaint?.Wing}
                        </span>
                        <span
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: "500",
                            fontSize: "16px",
                            lineHeight: "24px",
                            marginLeft: "8px",
                          }}
                        >
                          {complaint?.Unit}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "15px",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          className="badge"
                          style={{
                            ...badgeStyle(complaint?.Priority),
                            width: "100px",
                            height: "31px",
                            padding: "5px 12px",
                            gap: "8px",
                            borderRadius: "50px",
                            display: "inline-flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {complaint?.Priority}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "15px",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          style={{
                            ...statusBadgeStyle(complaint?.Status),
                            width: "113px",
                            height: "31px",
                            padding: "5px 12px",
                            gap: "5px",
                            borderRadius: "50px",
                            display: "inline-flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {complaint?.Status}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "15px",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <div className="d-flex align-items-center justify-content-center">
                          <img
                            src={editIcon}
                            className="text-success me-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleEdit(complaint)}
                          />
                          <img
                            src={viewICon}
                            className="text-primary me-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleView(complaint)}
                          />
                          <img
                            src={deleteIcon}
                            className="text-danger"
                            style={{ cursor: "pointer" }}

                            onClick={() => handleDelete(complaint._id)}

                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No complaints available
                    </td>
                  </tr>
                )}
              </tbody>

            </Table>
          </div>
        </div>
      </div>

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
      {/* Create Complaint Modal */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal} centered className='Round-modal'>
        <Modal.Header >
          <Modal.Title>Create Complaint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <Form>
            <Form.Group className='mt-2'>
              <Form.Label>Complainer Name<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={newComplaint.Complainer_name}
                onChange={(e) => setNewComplaint({ ...newComplaint, Complainer_name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label>Complaint Name<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={newComplaint.Complaint_name}
                onChange={(e) => setNewComplaint({ ...newComplaint, Complaint_name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label>Description<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={newComplaint.Description}
                onChange={(e) => setNewComplaint({ ...newComplaint, Description: e.target.value })}
              />
              <Form >
                <div className='d-flex justify-content-between gap-2'>


                  <Form.Group className='mt-2'>
                    <Form.Label>Wing<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      value={newComplaint.Wing}
                      onChange={(e) => setNewComplaint({ ...newComplaint, Wing: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group className='mt-2'>
                    <Form.Label>Unit<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      value={newComplaint.Unit}
                      onChange={(e) => setNewComplaint({ ...newComplaint, Unit: e.target.value })}
                    />
                  </Form.Group>
                </div>

              </Form>
            </Form.Group>
            <Form.Group className='mt-2 radio-group'>
              <Form.Label >Priority<span className="text-danger">*</span></Form.Label>
              <div className="d-flex justify-content-around ">
                <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }} >

                  <Form.Check

                    type="radio"
                    label="High"
                    name="Priority"
                    value="High"
                    checked={newComplaint.Priority === "High"}
                    onChange={(e) => setNewComplaint({ ...newComplaint, Priority: e.target.value })}
                  />
                </div>
                <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>

                  <Form.Check
                    type="radio"
                    label="Medium"
                    name="Priority"
                    value="Medium"
                    checked={newComplaint.Priority === "Medium"}
                    onChange={(e) => setNewComplaint({ ...newComplaint, Priority: e.target.value })}
                  />
                </div>
                <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
                  <Form.Check
                    type="radio"
                    label="Low"
                    name="Priority"
                    value="Low"
                    checked={newComplaint.Priority === "Low"}
                    onChange={(e) => setNewComplaint({ ...newComplaint, Priority: e.target.value })}
                  />
                </div>
              </div>
            </Form.Group>

            <Form.Group className='mt-2 radio-group'>
              <Form.Label>Status<span className="text-danger">*</span></Form.Label>
              <div className="d-flex justify-content-around">
                <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>

                  <Form.Check
                    type="radio"
                    label="Open"
                    name="Status"
                    value="Open"
                    checked={newComplaint.Status === "Open"}
                    onChange={(e) => setNewComplaint({ ...newComplaint, Status: e.target.value })}
                  />
                </div>
                <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>


                  <Form.Check
                    type="radio"
                    label="Pending"
                    name="status"
                    value="Pending"
                    checked={newComplaint.Status === "Pending"}
                    onChange={(e) => setNewComplaint({ ...newComplaint, Status: e.target.value })}
                  />
                </div>
                <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>

                  <Form.Check
                    type="radio"
                    label="Solve"
                    name="status"
                    value="Solve"
                    checked={newComplaint.Status === "Solve"}
                    onChange={(e) => setNewComplaint({ ...newComplaint, Status: e.target.value })}
                  />
                </div>
              </div>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
          <Button className='cancle' onClick={handleCloseCreateModal} style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px 10px 55px", background: "#FFFFFF", color: "#202224", }}>
            Cancel
          </Button>
          <Button className='save' onClick={handleCreateComplaint} style={{
            width: "175px", height: "51px", border: "1px", padding: "10px 55px 10px 55px", color: "#202224",

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
        <Modal.Header closeButton >
          <Modal.Title
            style={{
              width: "371px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            View Complaint
          </Modal.Title>

        </Modal.Header>
        <Modal.Body
          style={{
            width: "371px",
            height: "316px",
            display: "flex",
            flexDirection: "column",
            gap: "25px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {selectedComplaint && (
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
                  // className="rounded-circle"
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
                  <h5 style={{ margin: 0 }}>{selectedComplaint.Complainer_name}</h5>
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
                <span>{selectedComplaint.Complaint_name}</span>
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
                <p style={{ margin: 0 }}>{selectedComplaint.Description}</p>
              </div>

              <div
                className="d-flex"
                style={{
                  width: "370.25px",
                  gap: "10px",



                  justifyContent: "space-around"
                }}
              >
                <div style={{
                  width: "41px",
                  height: "55px",
                  top: "166px",
                  gap: "3px",

                  // Ensures the "top" property works as expected
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
                    {selectedComplaint.Wing}
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
                    // Make sure the "top" and "left" properties work
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
                      margin: "0"  // Set margin to 0 (instead of gap) as gap works only in flex/grid containers
                    }}
                  >
                    {selectedComplaint.Unit}
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
                      background: badgeStyle(selectedComplaint.Priority).backgroundColor,
                      color: "white"
                    }}
                  >
                    {selectedComplaint.Priority}
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
                      backgroundColor: statusBadgeStyle(selectedComplaint.Status).backgroundColor,
                      color: statusBadgeStyle(selectedComplaint.Status).color
                    }}
                  >
                    {selectedComplaint.Status}
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
          <Modal.Title>Edit Complaint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <Form>
            <Form.Group className='mt-2'>
              <Form.Label>Complainer Name<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={selectedComplaint?.Complainer_name || ""}
                onChange={(e) =>
                  setSelectedComplaint((prev) => ({
                    ...prev,
                    Complainer_name: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className='mt-3'>
              <Form.Label>Complaint Name<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={selectedComplaint?.Complaint_name || ""}
                onChange={(e) =>
                  setSelectedComplaint((prev) => ({
                    ...prev,
                    Complaint_name: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className='mt-3'>
              <Form.Label>Description<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={selectedComplaint?.Description || ""}
                onChange={(e) =>
                  setSelectedComplaint((prev) => ({
                    ...prev,
                    Description: e.target.value,
                  }))
                }
              />
            </Form.Group >
            <div className='d-flex justify-content-between'>


              <Form.Group className='mt-3'>
                <Form.Label>Wing<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  value={selectedComplaint?.Wing || ""}
                  onChange={(e) =>
                    setSelectedComplaint((prev) => ({
                      ...prev,
                      Wing: e.target.value,
                    }))
                  }
                />
              </Form.Group>

              <Form.Group className='mt-3'>
                <Form.Label>Unit<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  value={selectedComplaint?.Unit || ""}
                  onChange={(e) =>
                    setSelectedComplaint((prev) => ({
                      ...prev,
                      Unit: e.target.value,
                    }))
                  }
                />
              </Form.Group>
            </div>
            <Form.Group className='mt-3 radio-group'>
  <Form.Label>Priority<span className="text-danger">*</span></Form.Label>
  <div className="d-flex justify-content-around">
    {["High", "Medium", "Low"].map((Priority) => (
      <Form.Check
        style={{
          border: "1px solid rgba(211, 211, 211, 1)",
          paddingLeft: "30px",
          paddingRight: "30px",
          borderRadius: "5px",
          paddingTop: "8px",
          paddingBottom: "8px",
        }}
        type="radio"
        label={Priority}
        name="Priority"
        value={Priority}
        checked={selectedComplaint?.Priority === Priority}
        onChange={(e) =>
          setSelectedComplaint((prev) => ({
            ...prev,
            Priority: e.target.value, // Fixed to "Priority" (uppercase P)
          }))
        }
        key={Priority}
      />
    ))}
  </div>
</Form.Group>

            <Form.Group className='mt-3 radio-group'>
              <Form.Label>Status<span className="text-danger">*</span></Form.Label>
              <div className="d-flex justify-content-around">
                {["Open", "Pending", "Solve"].map((Status) => (
                  <Form.Check
                    style={{ border: "1px solid rgba(211, 211, 211, 1)", paddingLeft: "30px", paddingRight: "30px", paddingTop: "8px", paddingBottom: "8px", borderRadius: "5px" }}
                    type="radio"
                    label={Status}
                    name="status"
                    value={Status}
                    checked={selectedComplaint?.Status === Status}
                    onChange={(e) =>
                      setSelectedComplaint((prev) => ({
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
          <Button style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px 10px 55px", background: "#FFFFFF", color: "#202224", }} className='cancle' onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button style={{

            width: "175px", height: "51px", border: "1px", padding: "10px 55px 10px 55px", color: "#202224",

          }} className='save' onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ComplaintTracking;