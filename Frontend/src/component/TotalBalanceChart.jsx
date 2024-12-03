import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { FaPlusSquare } from "react-icons/fa";

import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Delete from '../Icons/delete.png'
import Edit from '../Icons/Edit.png'
import { useForm } from 'react-hook-form';
import maintainance1 from '../assets/maintainance1.png';
import maintainance2 from '../assets/maintainance2.png';
import maintainance3 from '../assets/maintainance3.png';
import maintainance4 from '../assets/mainatainance4.png';
import maintainance5 from '../assets/maintainance5.png';
import { Link } from 'react-router-dom';

import axios from 'axios';
// import { viewnumber } from '../services/importnumber';

// import editIcon from '../Icons/Edit.png'
// import deleteIcon from '../Icons/delete.png'


ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function TotalBalanceChart() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Total Balance',
                data: [10000, 12000, 18000, 25000, 22000, 30000, 35000, 28000, 34000, 40000, 45000, 42000],
                borderColor: '#6366F1',
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                pointBackgroundColor: '#6366F1',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.raw.toLocaleString()}`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `${value / 1000}k`,
                },
            },
        },
    };

    // const [contacts, setContacts] = useState([
    // { name: 'Hanna Donin', phone: '+91 99587 33657', work: 'Plumber' },
    // { name: 'John Doe', phone: '+91 91234 56789', work: 'Electrician' },
    // { name: 'Hanna ', phone: '+91 99555 33657', work: 'Plumbering' },
    // { name: 'John ', phone: '+91 91222 56789', work: 'Electricians' },
    //     fullName: "",
    //     phoneNumber: "",
    //     work: ""
    // ]);

    const [contacts, setContacts] = useState([]);

    const ViewNumber = async () => {
        try {
            // Make a GET request to your backend endpoint
            const response = await axios.get("http://localhost:5000/api/v2/important-numbers/getnumber");

            // Log and update state with the retrieved data
            if (response.status === 200) {
                console.log("API Response:", response.data.data); // Logs the retrieved data
                setContacts(response.data.data); // Save data in state
            } else {
                console.error("Failed to retrieve important numbers:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching important numbers:", error.message);
        }
    };

    // Call ViewNumber once when the component mounts
    useEffect(() => {
        ViewNumber();
    }, []);

    const [show, setShow] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [editIndex, setEditIndex] = useState(null);

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);
        reset();
        setEditIndex(null);
        // setContacts()
    };
    const onSubmit = async (data) => {
        try {
            if (editIndex !== null) {
                // Update an existing contact
                const contactToEdit = contacts[editIndex];
                const response = await axios.put(`http://localhost:5000/api/v2/important-numbers/${contactToEdit._id}`, data);

                if (response.status === 200) {
                    const updatedContacts = contacts.map((contact, index) =>
                        index === editIndex ? { ...contact, ...data } : contact
                    );
                    setContacts(updatedContacts);
                    console.log('Number updated successfully:', response.data.message);
                } else {
                    console.error('Failed to update number:', response.data.message);
                }
            } else {
                // Add a new contact
                const response = await axios.post("http://localhost:5000/api/v2/important-numbers/create", data);
                if (response.status === 200) {
                    setContacts([...contacts, response.data.data]);
                    console.log('Number added successfully:', response.data.message);
                }
            }
        } catch (error) {
            console.error('Error updating/creating number:', error.message);
        }

        handleClose(); // Close modal after submission
    };





    // Handle editing a contact
    const handleEdit = (index) => {
        const contact = contacts[index];
        setEditIndex(index);
        setShow(true);

        // Populate the form with contact details for editing
        reset({
            fullName: contact.fullName,
            phoneNumber: contact.phoneNumber,
            work: contact.work,
        });
    };

    // New state for delete confirmation modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    // Functions for delete modal
    const handleShowDeleteModal = (index) => {
        setDeleteIndex(index);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (deleteIndex !== null) {
            try {
                const contactToDelete = contacts[deleteIndex];

                // API call to delete the contact
                const response = await axios.delete(`http://localhost:5000/api/v2/important-numbers/${contactToDelete._id}`);

                if (response.status === 200) {
                    console.log('Number deleted successfully:', response.data.message);

                    // Update state to reflect deletion
                    const updatedContacts = contacts.filter((_, index) => index !== deleteIndex);
                    setContacts(updatedContacts);
                } else {
                    console.error('Failed to delete number:', response.data.message);
                }
            } catch (error) {
                console.error('Error deleting number:', error.message);
            }

            // Close delete modal
            handleCloseDeleteModal();
        }
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setDeleteIndex(null);
    };

    // const confirmDelete = () => {
    //     if (deleteIndex !== null) {
    //         const updatedContacts = contacts.filter((_, i) => i !== deleteIndex);
    //         setContacts(updatedContacts);
    //     }
    //     handleCloseDeleteModal();
    // };


    const [maintenances, setMaintenances] = useState([
        { img: maintainance1, name: 'Hanna Donin', pandingMonth: '2 Month Pending ' },
        { img: maintainance2, name: 'Hanna Donin', pandingMonth: '2 Month Pending ' },
        { img: maintainance3, name: 'Hanna Donin', pandingMonth: '2 Month Pending ' },
        { img: maintainance4, name: 'Hanna Donin', pandingMonth: '2 Month Pending ' },
        { img: maintainance5, name: 'Hanna Donin', pandingMonth: '2 Month Pending ' },
    ]);

    return (
        <div className='container-fluid py-2'>
            <div className='row px-4 '>
                <div className='col-lg-6 py-0 px-1'>
                    <div className="chart-container" style={{ borderRadius: '12px', background: '#f9fafb', maxWidth: '1000px' }}>
                        <div className='d-flex justify-content-between align-items-center mb-2 '>
                            <h2>Total Balance</h2>
                           <div>
                           <select className='month-btn rounded-2 d-flex align-items-center bg-light text-dark'>
                                    <option>Last week</option>
                                    <option>Last month</option>
                                    <option>Last year</option>
                                </select>
                           </div>

                        </div>
                        <Line data={data} options={options} />
                    </div>
                </div>

                <div className='col-lg-3 px-1 my-sm-3 my-md-0'>
                    <div className="important-member  px-2 bg-white rounded-lg shadow-md max-w-md mx-auto custom-scrollbar" style={{ borderRadius: '12px', overflowY: 'auto' }}>
                        <div className="d-flex justify-content-between align-items-center ">
                            <h2 className='mt-4'>Important Numbers</h2>
                            <Button onClick={handleShow} className='add-btn rounded-2 '>
                                <FaPlusSquare className="me-1" /> Add
                            </Button>
                        </div>

                        <div>

                            {contacts.length > 0 ? (
                                contacts.map((contact, index) => (
                                    <div
                                        key={index}
                                        className="py-3 rounded-lg d-flex justify-content-between align-items-center shadow-sm"
                                    >
                                        <div>
                                            <p><strong>Name:</strong> {contact.fullName}</p>
                                            <p><strong>Phone Number:</strong> {contact.phoneNumber}</p>
                                            <p><strong>Work:</strong> {contact.work}</p>
                                        </div>
                                        <div className="gap-3 d-flex">
                                            <button className='border-0'
                                                onClick={() => handleShowDeleteModal(index)}

                                            >
                                                <img src={Delete} />
                                            </button>
                                            <button className='border-0'

                                                onClick={() => handleEdit(index)}
                                            >
                                                <img src={Edit} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No important numbers available.</p>
                            )}
                            {/* {contacts.map((contact, index) => (
                                <div key={index} className="py-3 rounded-lg d-flex justify-content-between align-items-center shadow-sm ">
                                    <div>
                                        <p><strong>Name:</strong> {contact.name}</p>
                                        <p><strong>Ph Number:</strong> {contact.phone}</p>
                                        <p><strong>Work:</strong> {contact.work}</p>
                                    </div>
                                    <div className='gap-3 d-flex  '>
                                        <Button onClick={() => handleShowDeleteModal(index)} className="delete-btn fs-5">
                                            <RiDeleteBin5Fill />
                                        </Button>
                                        <Button className="edit-btn fs-5" onClick={() => handleEdit(index)}><MdEditSquare /></Button>
                                    </div>
                                </div>
                            ))} */}
                        </div>


                        {/* Delete Confirmation Modal */}
                        <Modal className='custom-modal' show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                            <Modal.Header>
                                <Modal.Title className='Modal-Title'>Delete Number?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p className='Form-p mb-0'>Are you sure you want to delete this number?</p>
                            </Modal.Body>
                            <Modal.Footer className='d-flex justify-content-between'>
                                <Button variant="secondary" className='btn cancle  mt-2' onClick={handleCloseDeleteModal}>Cancel</Button>
                                <Button variant="danger" className='btn delete' onClick={confirmDelete}>Delete</Button>
                            </Modal.Footer>
                        </Modal>

                    </div>
                </div>


                {/* Modal for the form */}
                <Modal show={show} onHide={handleClose} centered className="custom-modal">
                    <Modal.Header>
                        <Modal.Title className="Modal-Title">
                            {editIndex !== null ? 'Edit Important Number' : 'Add Important Number'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="formFullName">
                                <Form.Label className="Form-Label">
                                    Full Name<span className="text-danger"> *</span>
                                </Form.Label>
                                <Form.Control
                                    className="Form-Control"
                                    type="text"
                                    placeholder="Enter Full Name"
                                    {...register('fullName', { required: "Full Name is required" })}
                                    isInvalid={!!errors.fullName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.fullName?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPhoneNumber">
                                <Form.Label className="Form-Label">
                                    Phone Number<span className="text-danger"> *</span>
                                </Form.Label>
                                <Form.Control
                                    className="Form-Control"
                                    type="tel"
                                    placeholder="+91"
                                    {...register('phoneNumber', {
                                        required: "Phone Number is required",
                                        pattern: {
                                            value: /^[0-9]{10}$/, // Replace with your desired phone validation regex
                                            message: "Enter a valid phone number",
                                        },
                                    })}
                                    isInvalid={!!errors.phoneNumber}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.phoneNumber?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formWork">
                                <Form.Label className="Form-Label">
                                    Work<span className="text-danger"> *</span>
                                </Form.Label>
                                <Form.Control
                                    className="Form-Control"
                                    type="text"
                                    placeholder="Enter Work"
                                    {...register('work', { required: "Work is required" })}
                                    isInvalid={!!errors.work}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.work?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <div className="d-flex justify-content-between">
                                <Button variant="secondary" onClick={handleClose} className="btn mt-2 cancle">
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit" className="btn mt-2 save">
                                    Save
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>



                <div className='col-lg-3 px-1'>
                    <div className="maintenances py-4 px-2 bg-white rounded-lg shadow-md max-w-md mx-auto custom-scrollbar" style={{ borderRadius: '12px', overflowY: 'auto' }}>
                        <div className="d-flex justify-content-between mb-2">
                            <h2>Pending Maintenances</h2>

                            <p><Link className='text-decoration-none'>View all</Link></p>

                        </div>

                        <div>
                            {maintenances.map((maintenances, index) => (
                                <div key={index} className="py-3 rounded-lg d-flex justify-content-between align-items-center shadow-sm ">
                                    <div className='d-flex'>
                                        <div className='me-2'>
                                            <img src={maintenances.img} />
                                        </div>
                                        <div>
                                            <p className='mb-1 maintenances-p'>{maintenances.name}</p>
                                            <p className='mb-1 maintenances-panding'>{maintenances.pandingMonth}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h6>₹ 5,000</h6>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}
// }
export default TotalBalanceChart;