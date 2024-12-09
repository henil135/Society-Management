import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { FaCamera, FaClock, FaEdit, FaEye, FaFemale, FaImage, FaMale, FaMoon, FaPlus, FaSun, FaTrash, FaUpload } from 'react-icons/fa';
import axios from 'axios'
import Avtar from "../assets/Avatar.png";
import { LuImagePlus } from 'react-icons/lu';
import Header from './Navbar';
import Sidebar from "../component/layout/Sidebar";
import viewICon from '../Icons/view.png'
import deleteIcon from '../Icons/delete.png'
import editIcon from '../Icons/Edit.png'
import addIcon from '../Icons/add-square.png'
function SecurityGaurd() {
  const [guards, setGuards] = useState([
    // { id: 1, name: 'Brooklyn Simmons ', phone: '94564 96321', shift: 'Day', date: '2024-11-28', time: '2:45 PM', gender: 'Male' },
    // { id: 2, name: 'Brooklyn Simmons', phone: '94564 96321', shift: 'Day', date: '2024-11-28', time: '2:45 PM', gender: 'Female' },
    // { id: 3, name: 'Brooklyn Simmons', phone: '94564 96321', shift: 'Night', date: '2024-11-28', time: '2:45 PM', gender: 'Male' },
    // { id: 4, name: 'Brooklyn Simmons', phone: '94564 96321', shift: 'Day', date: '2024-11-28', time: '2:45 PM', gender: 'Female' },
    // { id: 5, name: 'Brooklyn Simmons', phone: '94564 96321', shift: 'Night', date: '2024-11-28', time: '2:45 PM', gender: 'Male' },
  ]);

  // Function to add a new guard (for demo)


  // Function to handle button click and show how useEffect might be used
  // useEffect(() => {
  //   console.log('Guard list updated', guards);
  // }, [guards]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteGuard, setShowDeleteGuard] = useState(false);
  const [deleteGuardId, setDeleteGuardId] = useState(null);
  const [showViewGuard, setShowViewGuard] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editGuardId, setEditGuardId] = useState(null);
  const [guardData, setGuardData] = useState();
  const [newGuard, setNewGuard] = useState({
    profileimage: '',
    full_name: '',
    Mail: '',
    shift: '',
    date: '',
    time: '',
    gender: '',
    adhar_card: '',
  });

  const handleShowCreate = () => {
    setIsEdit(false);
    setEditGuardId(null);
    setNewGuard({
      profileimage: '',
      full_name: '',
      Mail: '',
      shift: '',
      date: '',
      time: '',
      gender: '',
      adhar_card: '',
    });
    setShowModal(true);
  };
  const handleShowEdit = (guard) => {
    setIsEdit(true);
    setEditGuardId(guard.id);
    setNewGuard(guard); // Load selected guard data for editing
    setShowModal(true);
  };
  const handleShowDelete = (guardId) => {
    setDeleteGuardId(guardId);
    setShowDeleteGuard(true);
  };

  const handleShowView = (guard) => {
    setGuardData(guard);
    setShowViewGuard(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setShowViewGuard(false);
    setShowDeleteGuard(false); // Close the delete confirmation modal when handleClose is called

    setDeleteGuardId(null);
    setIsEdit(false);
    setNewGuard({
      profileimage: '',
      full_name: '',
      Mail: '',
      shift: '',
      date: '',
      time: '',
      gender: '',
      adhar_card: '',
    });
    setEditGuardId(null);
  };
  // const handleDelete = () => {
  //   setGuards((prevGuards) =>
  //     prevGuards.filter((guard) => guard.id !== deleteGuardId)
  //   );
  //   setDeleteGuardId(null); // Clear the ID of the protocol to delete
  //   setShowDeleteGuard(false); // Close the delete confirmation modal
  // };

  const handleDelete = () => {
    if (!deleteGuardId) {
      console.error("No guard ID specified for deletion.");
      return;
    }
  
    axios.delete(`https://society-management-b6tj.onrender.com/api/v2/security/deletesecurity/${deleteGuardId}`)
      .then(() => {
        setGuards((prevGuards) =>
          prevGuards.filter((guard) => guard._id !== deleteGuardId)
        );
        handleClose(); // Close the modal
      })
      .catch((error) => console.error("Error deleting guard:", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuardData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    axios.get('https://society-management-b6tj.onrender.com/api/v2/security/') // Replace with your API URL
      .then((response) => {
        if (Array.isArray(response.data.Guard)) {
          setGuards(response.data.Guard);
        } else {
          console.error('API response is not an array', response.data);
          setGuards([]); // Fallback in case of invalid response
        }
      })
      .catch((error) => {
        console.error('Error fetching guards:', error);
        setGuards([]); // Fallback in case of error
      });
  }, []);

  const handleSave = () => {
    if (isEdit && editGuardId) {
      // Update existing guard
      axios.put(`https://society-management-b6tj.onrender.com/api/v2/security/updatesecurity/${editGuardId}`, formData)
        .then((response) => {
          setGuards((prevGuards) =>
            prevGuards.map((guard) =>
              guard._id === editGuardId ? response.data : guard
            )
          );
          handleClose();
        })
        .catch((error) => console.error('Error updating guard:', error));
    } else {
      // Create new guard
      axios.post("https://society-management-b6tj.onrender.com/api/v2/security/addsecurity", formData)
        .then((response) => {
          setGuards((prevGuards) => [...prevGuards, response.data]);
          handleClose();
        })
        .catch((error) => console.error('Error creating guard:', error));
    }
  };
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour24: true });
    setNewGuard({ ...newGuard, time: formattedTime.toUpperCase() });
  };
  const formData = new FormData();
  Object.keys(newGuard).forEach((key) => {
    const value = newGuard[key];
    if (key === "profileimage" || key === "adhar_card") {
      formData.append(key, value.file); // Ensure the file object is passed
    } else {
      formData.append(key, value);
    }
  });
  // const handleAddGuard = () => {
  //   if (newGuard.full_name && newGuard.Mail && newGuard.shift && newGuard.date && newGuard.time && newGuard.gender) {
  //     setGuards([...guards, newGuard]); // Add the new guard to the guards array
  //     setShowModal(false); // Close the modal
  //   } else {
  //     alert("Please fill all the fields before adding the guard.");
  //   }
  // };


  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const maxFileSize = 10 * 1024 * 1024; // 10 MB
    if (file.size > maxFileSize) {
      alert("File size exceeds 10 MB. Please upload a smaller file.");
      return;
    }
  
    // Update state with the file and preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewGuard((prevState) => ({
        ...prevState,
        [field]: {
          file,
          preview: reader.result, // Base64 preview for images
        },
      }));
    };
  
    // Generate preview only for image files
    if (file.type.startsWith("image/")) {
      reader.readAsDataURL(file);
    } else {
      setNewGuard((prevState) => ({
        ...prevState,
        [field]: { file, preview: null },
      }));
    }
  };
  return (
    <div className="d-flex flex-column flex-md-row">
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex-grow-1 dashboard-bg" style={{ width: "1920px" }}>
        <Header />

        <div className="container-fluid stickyHeader p-3" style={{ width: "1620px", marginLeft: "300px" }}>
          <div className="table-responsive" style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", backgroundColor: "#fff", padding: "20px", marginTop: "20px" }}>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
              <h4 className="mb-0">Security Guard Details</h4>
              <Button className="btn mainColor2 d-flex align-items-center justify-content-center p-2" style={{ border: "none" }} onClick={() => setShowModal(true)}>
                <img src={addIcon}
                  style={{
                    fontSize: "18px",
                 
                    marginRight: "8px",
                  }}
                />
                Add Security
              </Button>
            </div>
            <Table style={{ width: "1545px" }}>
              <thead style={{ background: "rgb(185, 198, 242)", color: "black" }}>
                <tr>
                  <th
                    style={{
                      fontSize: "15px",
                      fontWeight: "700",
                      width: "200px"
                    }}
                  >
                    Security Guard Name
                  </th>

                  <th style={{ fontSize: "15px" }} className='text-center'>Email</th>
                  <th style={{ fontSize: "15px" }} className='text-center'>Select Shift</th>
                  <th style={{ fontSize: "15px" }} className='text-center'>Shift Date</th>
                  <th style={{ fontSize: "15px" }} className='text-center'>Shift Time</th>
                  <th style={{ fontSize: "15px" }} className='text-center'>Gender</th>
                  <th style={{ fontSize: "15px" }} className='text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {guards.map((guard, index) => (
                  <tr key={index} >
                    <td style={{ verticalAlign: "middle", width: "220px", padding: "15px" }}>
                      <div >
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
                          {guard.full_name}
                        </span>
                      </div>
                    </td>
                    <td className='text-center' style={{ fontFamily: "Poppins", verticalAlign: "middle", padding: "15px" }}>{guard.Mail}</td>
                    <td className='text-center' style={{ verticalAlign: "middle", padding: "15px" }}>
                      {guard.shift === 'Day' ? (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "113px",
                            height: "31px",
                            textAlign: "center",
                            fontFamily: "Poppins",
                            borderRadius: "50px",
                            background: "rgba(244, 244, 244, 1)",
                            color: "rgba(255, 147, 0, 1)", // Text and icon color
                            fontSize: "16px", // Optional for font size
                            fontWeight: "500", // Optional for font weight
                          }}
                          role="img"
                          aria-label="Day"
                        >
                          <FaSun style={{ marginRight: "5px" }} />
                          Day
                        </span>
                      ) : (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "Poppins",
                            width: "113px",
                            height: "31px",
                            borderRadius: "50px",
                            background: "rgba(79, 79, 79, 1)",  // Dark background
                            color: "rgba(255, 255, 255, 1)",    // White text and icon color
                            fontSize: "16px",                   // Optional font size
                            fontWeight: "500",                  // Optional font weight
                          }}
                          role="img"
                          aria-label="Night"
                        >
                          <FaMoon style={{ marginRight: "5px" }} />
                          Night
                        </span>
                      )}
                    </td>
                    <td className='text-center' style={{ fontFamily: "Poppins", verticalAlign: "middle", padding: "15px" }}>{new Date(guard?.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}</td>
                    <td style={{ verticalAlign: "middle", padding: "15px" }} className="text-center">
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <div
                          style={{
                            width: "110px",
                            height: "34px",
                            padding: "5px 15px",
                            gap: "10px",
                            fontFamily: "Poppins",
                            borderRadius: "50px",
                            background: "#F6F8FB",
                            color: "#4F4F4F",
                            display: "inline-block",
                          }}
                        >
                          {guard.time}
                        </div>
                      </div>
                    </td>
                    <td className='text-center' style={{ verticalAlign: "middle", padding: "15px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "113px",
                          height: "31px",
                          padding: "5px 12px",
                          gap: "5px",
                          borderRadius: "50px",
                          fontFamily: "Poppins",
                          background:
                            guard.gender === "Male" ? "rgba(33, 168, 228, 0.1)" : "rgba(254, 118, 168, 0.1)",
                          color:
                            guard.gender === "Male" ? "rgba(86, 120, 233, 1)" : "rgba(254, 118, 168, 1)",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        {guard.gender === "Male" ? <FaMale /> : <FaFemale />}
                        {guard.gender}
                      </span>
                    </td>
                    <td className='text-center' style={{ verticalAlign: "middle" }}>
                      <div className="d-flex align-items-center justify-content-center">
                        <img src={editIcon} className="text-success me-2" style={{ cursor: "pointer" }} onClick={() => handleShowEdit(guard)} />
                        <img src={viewICon} className="text-primary me-2" style={{ cursor: "pointer" }} onClick={() => handleShowView(guard)} />
                        <img src={deleteIcon} className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleShowDelete(guard._id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Modal show={showViewGuard} onHide={handleClose} centered className='Round-modal'>
              <Modal.Header closeButton>
                <Modal.Title style={{
                  width: "371px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}>View Security Protocols</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div style={{
                  width: "285px",
                  height: "70px",
                  display: "flex",
                  textAlign: "start",
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

                  <p style={{ margin: 0 }}>{guardData?.full_name}<br />{guardData?.date}</p>
                </div>


                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center", // Centers vertically
                  width: "100%", // Adjusts width for space distribution
                  fontFamily: "Poppins, sans-serif",
                  marginTop: "20px"
                }}>

                  <div style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column", // Stacks items vertically
                    gap: "0px", // Removes any gap between elements
                    alignItems: "center",
                  }}>

                    <span>Select Shift</span>

                    {guardData?.shift === 'Day' ? (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "113px",
                          height: "31px",
                          fontFamily: "Poppins",
                          borderRadius: "50px",
                          background: "rgba(244, 244, 244, 1)",
                          color: "rgba(255, 147, 0, 1)", // Text and icon color
                          fontSize: "16px", // Optional for font size
                          fontWeight: "500", // Optional for font weight
                        }}
                        role="img"
                        aria-label="Day"
                      >
                        <FaSun style={{ marginRight: "5px" }} />
                        Day
                      </span>
                    ) : (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "Poppins",
                          width: "113px",
                          height: "31px",
                          borderRadius: "50px",
                          background: "rgba(79, 79, 79, 1)",  // Dark background
                          color: "rgba(255, 255, 255, 1)",    // White text and icon color
                          fontSize: "16px",                   // Optional font size
                          fontWeight: "500",                  // Optional font weight
                        }}
                        role="img"
                        aria-label="Night"
                      >
                        <FaMoon style={{ marginRight: "5px" }} />
                        Night
                      </span>
                    )}
                  </div>

                  <div className=" align-items-center justify-content-center">
                    <p className="mb-0 text-center">Shift Time</p>
                    <div className='text-center'
                      style={{
                        width: "110px",
                        height: "34px",
                        padding: "5px 15px",
                        fontWeight: "500",
                        borderRadius: "50px",
                        background: "#F6F8FB",
                        color: "#4F4F4F",
                        display: "inline-block",
                      }}
                    >
                      {guardData?.time}
                    </div>
                  </div>


                  <div style={{ textAlign: "center" }}>
                    <span style={{ display: "block", marginBottom: "0" }}>Gender</span>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "113px",
                        height: "31px",
                        padding: "5px 12px",
                        gap: "5px",
                        borderRadius: "50px",
                        fontFamily: "Poppins",
                        background:
                          guardData?.gender === "Male" ? "rgba(33, 168, 228, 0.1)" : "rgba(254, 118, 168, 0.1)",
                        color:
                          guardData?.gender === "Male" ? "rgba(86, 120, 233, 1)" : "rgba(254, 118, 168, 1)",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      {guardData?.gender === "Male" ? <FaMale /> : <FaFemale />}
                      {guardData?.gender}
                    </span>
                  </div>


                </div>

              </Modal.Body>

            </Modal>


            <Modal show={showDeleteGuard} onHide={handleClose} centered className='Round-modal'>
              <Modal.Header >
                <Modal.Title>Delete Protocol?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to delete this protocol?</p>
              </Modal.Body>
              <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="secondary" onClick={handleClose} style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px 10px 55px", background: "#FFFFFF", color: "#202224", }}>
                  Cancel
                </Button>
                <Button onClick={handleDelete} style={{
                  width: "175px", height: "51px", border: "1px", padding: "10px 55px 10px 55px", color: "#202224", background: "rgba(231, 76, 60, 1)"
                }}>
                  Delete
                </Button>

              </Modal.Footer>
            </Modal>

            {/* Add Security Modal */}
            <Modal show={showModal} onHide={handleClose} centered className='Round-modal'>
              <Modal.Header >
                <Modal.Title>{isEdit ? 'Edit Security' : 'Add Security'}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* Add Photo Section */}
                <div className="text-start" style={{ display: 'flex', marginBottom: '20px' }}>
                  <label htmlFor="photo-upload" style={{ cursor: 'pointer', textAlign: 'center' }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          background: "rgba(211, 211, 211, 1)",
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "2px solid #ddd",
                          marginRight: "10px",
                        }}
                      >
                        {newGuard.profileimage?.preview ? (
                          <img
                            src={newGuard.profileimage.preview}
                            alt="Uploaded"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />
                        ) : (
                          <FaCamera style={{ color: "rgba(255, 255, 255, 1)", fontSize: "16px" }} />
                        )}
                      </div>
                      <div style={{ color: "#007bff" }}>Add Photo</div>
                    </div>
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    onChange={(e) => handleFileChange(e, 'profileimage')}
                    accept="image/png, image/jpeg"
                    style={{ display: 'none' }}
                  />
                </div>

                {/* Form Fields */}
                <Form>
                  <Form.Group controlId="formName" className="mb-3">
                    <Form.Label>Full Name<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Full Name"
                      value={newGuard.full_name}
                      onChange={(e) => setNewGuard({ ...newGuard, full_name: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group controlId="formPhone" className="mb-3">
                    <Form.Label>Mail Or Phone<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      // placeholder="+91"
                      value={newGuard.Mail}
                      onChange={(e) => setNewGuard({ ...newGuard, Mail: e.target.value })}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between mb-3 gap-2">
                    <Form.Group controlId="formGender" style={{ width: "210px" }}>
                      <Form.Label>Gender<span className="text-danger">*</span></Form.Label>
                      <Form.Select
                        value={newGuard.gender}
                        onChange={(e) => setNewGuard({ ...newGuard, gender: e.target.value })}
                      >
                        <option>Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formShift" style={{ width: "210px" }}>
                      <Form.Label>Shift<span className="text-danger">*</span></Form.Label>
                      <Form.Select
                        value={newGuard.shift}
                        onChange={(e) => setNewGuard({ ...newGuard, shift: e.target.value })}
                      >
                        <option>Select Shift</option>
                        <option>Day</option>
                        <option>Night</option>
                      </Form.Select>
                    </Form.Group>
                  </div>

                  <div className="d-flex mb-3 gap-2" style={{ justifyContent: 'space-between' }}>
                    <Form.Group controlId="formDate" style={{ width: "210px" }}>
                      <Form.Label>Shift Date<span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="date"
                        value={newGuard.date}
                        onChange={(e) => setNewGuard({ ...newGuard, date: e.target.value })}
                      />
                    </Form.Group>

                    <Form.Group controlId="formTime" style={{ width: "210px" }}>
                      <Form.Label>Shift Time<span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="time"
                        value={newGuard.time}
                        onChange={(e) => formatTime(e.target.value)}
                      />
                    </Form.Group>
                  </div>

                  {/* Aadhaar Card Upload Section */}
                  <Form.Group controlId="formAadhaar" className=" mt-4">
                    <Form.Label>Upload Aadhaar Card<span className="text-danger">*</span></Form.Label>
                    <div className='text-center'
                      style={{
                        border: "2px dashed rgba(211, 211, 211, 1)",
                        borderRadius: "8px",
                        padding: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        cursor: "pointer"
                      }}
                    >
                      <label htmlFor="aadhaar-upload" style={{ cursor: 'pointer', color: '#007bff' }}>
                        <LuImagePlus className='text-center'
                          style={{
                            fontSize: '24px',      // Size of the icon
                            marginBottom: '8px',   // Bottom margin
                            width: '40px',         // Icon width
                            height: '50px',        // Icon height
                            top: '4px',            // Top offset
                            left: '8px',           // Left offset
                            color: " rgba(167, 167, 167, 1)",// Ensure position is relative to the container
                            gap: '0px',
                            // No gap between elementsr
                          }}
                        />

                        <div>Upload a file <span style={{ color: "black" }}>or drag and drop</span></div>
                      </label>
                      <small className="text-muted">PNG, JPG, GIF, PDF up to 10MB</small>
                      <input
                        id="aadhaar-upload"
                        type="file"
                        onChange={(e) => handleFileChange(e, 'adhar_card')}
                        accept="image/png, image/jpeg, application/pdf"
                        style={{ display: 'none' }}
                      />

                      {/* Display file preview or name */}
                      {newGuard.adhar_card && (
                        <div style={{ marginTop: '15px', textAlign: 'center' }}>
                          {newGuard?.adhar_card.preview && newGuard?.adhar_card.file.type.startsWith('image/') ? (
                            <img
                              src={newGuard?.adhar_card.preview}
                              alt="Aadhaar Preview"
                              style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }}
                            />
                          ) : (
                            <div>{newGuard?.adhar_card?.file?.name}</div>
                          )}
                        </div>
                      )}
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
                  {isEdit ? 'Create' : 'Create'}
                </Button>
              </Modal.Footer>
            </Modal>

          </div>
        </div>
      </div>
    </div>
  );
}
export default SecurityGaurd;