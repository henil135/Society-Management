import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";

import { FaPlus } from "react-icons/fa";
import Header from "./Navbar";
import Sidebar from "../component/layout/Sidebar";
import { createFacility, getFacilities, getFacilitiesByID, updateFacility } from "../services/FacilityManagementapi"
import axios from "axios";

const FacilityCard = ({ Facility_name, Date, Description, onEdit }) => {
    const [showMenu, setShowMenu] = useState(false);

    const handleIconClick = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="col-12 col-md-6 col-lg-3 mb-4 position-relative">
            <Card className="shadow-sm h-100">
                <Card.Header
                    className="text-white d-flex justify-content-between align-items-center"
                    style={{ background: "#5678E9" }}
                >
                    {Facility_name}
                    <BsThreeDotsVertical onClick={handleIconClick} style={{ cursor: "pointer" }} />
                </Card.Header>
                <Card.Body>
                    <p className="mb-1" style={{ fontSize: "12px", color: "gray" }}>
                        <strong>Upcoming Schedule Service Date:</strong> {Date}
                    </p>
                    <h5 className="card-title" style={{ fontSize: "15px", color: "gray" }}>
                        Description
                    </h5>
                    <p className="card-text" style={{ fontSize: "13px" }}>{Description}</p>
                </Card.Body>

                {/* Dropdown menu */}
                {showMenu && (
                    <div
                        className="position-absolute bg-white border rounded shadow-sm p-2"
                        style={{
                            top: "40px",
                            right: "10px",
                            zIndex: 10,
                        }}
                        onClick={() => setShowMenu(false)}
                    >
                        <div
                            className="dropdown-item"
                            onClick={onEdit}
                            style={{ cursor: "pointer" }}
                        >
                            Edit
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

const FacilityManagement = () => {
    const [facilities, setFacilities] = useState([
        // { title: "Parking Facilities", date: "01/07/2024", description: "Description here." },
        // { title: "Community Center", date: "01/07/2024", description: "Description here." },
        // { title: "Swimming Pool", date: "01/07/2024", description: "Description here." },
        // { title: "Wi-Fi and Connectivity", date: "01/07/2024", description: "Description here." },
        // { title: "Parking Facilities", date: "01/07/2024", description: "Description here." },
        // { title: "Community Center", date: "01/07/2024", description: "Description here." },

    ]);

    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [facilityData, setFacilityData] = useState({ Facility_name: "", Date: "", Description: "", Remind_Before: "" });
   
    const [validationError, setValidationError] = useState("");
    
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setFacilityData({ Facility_name: "", Date: "", Description: "", Remind_Before: "" });
        setIsEditing(false);
        setEditIndex(null);
        setValidationError(""); // Clear validation error
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFacilityData({ ...facilityData, [name]: value });
    };
    
    const handleSave = async () => {
        const { Facility_name, Date, Description, Remind_Before } = facilityData;
    
        // Field validation
        if (!Facility_name || !Date || !Description || !Remind_Before) {
            setValidationError("All fields are required.");
            return;
        }
    
        // Validation for reminderBefore input
        if (isNaN(Remind_Before) || Remind_Before <= 0) {
            setValidationError("Reminder Before must be a positive number.");
            return;
        }
    
        try {
            if (isEditing) {
                // Update the existing facility in the list
                const updatedFacilities = [...facilities];
                updatedFacilities[editIndex] = facilityData;
                setFacilities(updatedFacilities);
            } else {
                // Create a new facility
                const response = await createFacility(facilityData);
                console.log("Create Facility API Response:", response);
                if (response && response.data.facility) {
                    // Add the new facility to the state
                    setFacilities([...facilities, response.data.facility]); // Update state with the newly created facility
                } else {
                    console.error("Failed to create facility.");
                }
            }
        } catch (error) {
            console.log("Error while creating/updating the facility:", error.message);
        } finally {
            handleCloseModal(); // Ensure modal closes after save
        }
    };
    
    useEffect(() => {
        FetchFacilities();
    }, []); // Fetch facilities on initial load
    
    const FetchFacilities = async () => {
        try {
            const response = await getFacilities(); // Assuming this is your API call
            console.log("API Response:", response);
            
            // Check for the response and ensure the facilities list is fetched properly
            if (response && response.success && Array.isArray(response.facilities)) {
                console.log("Facilities fetched:", response.facilities);
                setFacilities(response.facilities); // Update state with fetched facilities
            } else {
                console.error("Unexpected response format: ", response);
            }
        } catch (error) {
            console.error("Error fetching facilities:", error.message);
        }
    };
    
    const handleEdit = (index) => {
        setFacilityData(facilities[index]);
        setEditIndex(index);
        setIsEditing(true);
        handleShowModal();
    };
    
    return (
        <div className="d-flex flex-column flex-md-row">
            <div className="flex-shrink-0" >
                <Sidebar />
            </div>


            <div className="  dashboard-bg " style={{ width: "1900px" }}>
                <Header />

                <div className="container-fluid bg-white rounded shadow-sm p-2 " style={{ marginTop: "150px", marginLeft: "320px",width:"1565px" }}>

                    <div className="d-flex align-items-center justify-content-between">
                        <h4 className="mb-0" >Facility Management</h4>


                        <Button className="btn mainColor2 d-flex align-items-center justify-content-center p-2" style={{ border: "none" }} onClick={() => {
                            setIsEditing(false);
                            handleShowModal();
                        }}>
                            Create Facility
                        </Button>
                    </div>


                    {/* Facility Cards */}
                    <div className="row mt-3">
                        {facilities.length > 0 ? (
                            console.log("Facilities state before rendering:", facilities),
                            facilities.map((facility, index) => (
                                <FacilityCard
                                    key={index}
                                    Facility_name={facility.Facility_name}
                                    Date={new Date(facility.Date).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                      })}
                                    Description={facility.Description}
                                    onEdit={() => handleEdit(index)}
                                />
                                
                            ))
                        ) : (
                            <p>No facilities available</p>
                        )}
                    </div>
                </div>

                {/* Modal for Creating or Editing Facility */}
                <Modal show={showModal} onHide={handleCloseModal} centered className="Round-modal">
                    <Modal.Header >
                        <Modal.Title>{isEditing ? "Edit Facility" : "Create Facility"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="facilityName">
                                <Form.Label>Facility Name<span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Facility_name"
                                    placeholder="Enter Name"
                                    value={facilityData.Facility_name}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="facilityDescription" className="mt-3">
                                <Form.Label>Description<span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="Description"
                                    placeholder="Enter Description"
                                    value={facilityData.Description}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="facilityDate" className="mt-3">
                                <Form.Label>Schedule Service Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="Date"
                                    value={facilityData.Date}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="reminderBefore" className="mt-3">
                                <Form.Label>Reminder Before (in days)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="Remind_Before"
                                    value={facilityData.Remind_Before}
                                    onChange={handleInputChange}
                                    min="1"
                                />
                                {validationError && (
                                    <div className="text-danger mt-2">{validationError}</div>
                                )}
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" className="cancle" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button className="save" onClick={handleSave}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default FacilityManagement;
