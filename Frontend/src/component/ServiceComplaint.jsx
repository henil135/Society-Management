import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Sidebar from './layout/Sidebar'
import Navbar from './Navbar';

const ServiceComplaint = () => {

    const [note, setNote] = useState([
        { id: 1, title: 'Unethical Behavior', des: 'Regular waste collection services.', date: '01/07/2024', status: 'Open' },
        { id: 2, title: 'Preventive Measures', des: 'Expenses will way sense for you..', date: '01/07/2024', status: 'Open' },
        { id: 3, title: 'Unethical Behavior', des: 'Regular waste collection services.', date: '01/07/2024', status: 'Open' },
        { id: 4, title: 'Preventive Measures', des: 'Expenses will way sense for you..', date: '01/07/2024', status: 'Open' },
        { id: 5, title: 'Unethical Behavior', des: 'Regular waste collection services.', date: '01/07/2024', status: 'Open' },
        { id: 6, title: 'Preventive Measures', des: 'Expenses will way sense for you..', date: '01/07/2024', status: 'Open' },
    ]);

    const [show, setShow] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    // Open and close modal
    const handleClose = () => {
        setShow(false);
        reset();
        setEditIndex(null);
    };
    const handleShow = () => setShow(true);

    // Handle form submission
    const onSubmit = (data) => {
        if (editIndex !== null) {
            // Update existing note
            const updatedNotes = [...note];
            updatedNotes[editIndex] = { ...updatedNotes[editIndex], ...data };
            setNote(updatedNotes);
        } else {
            // Add new note
            setNote([...note, { id: note.length + 1, ...data }]);
        }
        handleClose();
    };

    // Handle editing a specific note
    const handleEdit = (index) => {
        setEditIndex(index);
        const noteToEdit = note[index];
        setValue('title', noteToEdit.title);
        setValue('des', noteToEdit.des);
        setValue('date', noteToEdit.date);
        setValue('amt', noteToEdit.amt);
        handleShow();
    };

    // Toggle dropdown menu for each card
    const handleDropdownToggle = (index) => {
        setDropdownIndex(dropdownIndex === index ? null : index);
    };


    // New state for delete confirmation modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    // Functions for delete modal
    const handleShowDeleteModal = (index) => {
        setDeleteIndex(index);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setDeleteIndex(null);
    };

    const confirmDelete = () => {
        if (deleteIndex !== null) {
            const updatedComplaint = note.filter((_, i) => i !== deleteIndex);
            setNote(updatedComplaint);
        }
        handleCloseDeleteModal();
    };

    return (
        <div className='dashboard-bg w-100'>
            <Sidebar />
            <Navbar />
            <div style={{ marginLeft: '300px' }}>
                <div className='container-fluid'>
                    <div className='row p-4'>
                     
                            <div className="table-responsive rounded pb-3">

                                <Link to="/service-and-complaint" className='btn btn-sm text-decoration-none border-0 maintainance-income-btn maintainance-income-btn-bg complaint-btn ms-1'>Complaint Submission</Link>

                                <Link to="/request-and-submission" className='btn btn-sm maintainance-income-btn maintainance-income-btn-withoutbg complaint-btn'>Request Submission</Link>

                                <div className='container-fluid mx-0'>
                                    <div className='row p-3 py-0 overflow-hidden'>
                                        <div className='p-0 bg-light'>
                                            <div className='d-flex justify-content-between align-items-center pb-3 px-3'>
                                                <h3 className='mb-0 financial-income-title'>Complaint</h3>
                                                <button className='set-maintainance-btn d-flex align-items-center p-3' onClick={handleShow}>
                                                    Create Complaint
                                                </button>
                                            </div>

                                            <div className="row px-3">
                                                {note.map((val, index) => (
                                                    <div className="col-lg-3 mb-3" key={val.id}>
                                                        <div className="card">
                                                            <div className="card-header card-title text-light d-flex align-items-center justify-content-between py-3" style={{ background: "rgba(86, 120, 233, 1)" }}>
                                                                {val.title}
                                                                <div className='position-relative'>
                                                                    <button
                                                                        className="btn btn-light p-0 mt-0"
                                                                        onClick={() => handleDropdownToggle(index)}
                                                                        style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                                    >
                                                                        <BsThreeDotsVertical />
                                                                    </button>
                                                                    {dropdownIndex === index && (
                                                                        <div className="dropdown-menu show position-absolute" style={{ right: 0, top: '100%', zIndex: 10 }}>
                                                                            <button
                                                                                className="dropdown-item pt-0"
                                                                                onClick={() => handleShowDeleteModal(index)}
                                                                            >
                                                                                Delete
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="card-body">
                                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                                    <h6 className="card-body-title mb-0 fw-medium">Request Date</h6>
                                                                    <span className="card-body-title mb-0 fw-medium text-dark"> {val.date}</span>
                                                                </div>
                                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                                    <h6 className="card-body-title mb-0 fw-medium">Status</h6>
                                                                    <span className="card-body-title card-body-button mb-0 fw-medium"> {val.status}</span>
                                                                </div>
                                                                <h6 className="card-des-title fw-medium">Description</h6>
                                                                <p className="card-body-title text-dark fw-medium mb-0">{val.des}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                    

                    </div>
                    {/* Add/Edit Modal */}
                    <Modal show={show} onHide={handleClose} centered className="custom-modal">
                        <Modal.Header>
                            <Modal.Title className='Modal-Title'>
                                Create Complaint
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group className="mb-3" controlId="formTitle">
                                    <Form.Label className='Form-Label'> Complainer Name<span className="text-danger"> *</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Name"
                                        {...register('title', { required: "Title is required" })}
                                        isInvalid={errors.title}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.title?.message}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formTitle">
                                    <Form.Label className='Form-Label'> Complaint Name<span className="text-danger"> *</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Name"
                                        {...register('title', { required: "Title is required" })}
                                        isInvalid={errors.title}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.title?.message}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formDescription">
                                    <Form.Label className='Form-Label'>Description<span className="text-danger"> *</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Description"
                                        {...register('des', { required: "Description is required" })}
                                        isInvalid={errors.des}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.des?.message}</Form.Control.Feedback>
                                </Form.Group>

                                <div className='d-flex justify-content-between'>
                                    <div className="mb-3">
                                        <label className='Form-Label'>Wing<span className='text-danger'> *</span></label>
                                        <input type="text" placeholder='Enter Wing' className="form-control Form-Control" {...register('date', { required: true })} />
                                    </div>
                                    <div className="mb-3">
                                        <label className='Form-Label'>Unit<span className='text-danger'> *</span></label>
                                        <input type="text" placeholder='Enter Unit' className="form-control Form-Control" {...register('dueDate', { required: true })} />
                                    </div>
                                </div>

                                <Form.Group className="mb-3" controlId="formPriority">
                                    <Form.Label className='Form-Label'>Priority<span className="text-danger"> *</span></Form.Label>
                                    <div className="d-flex justify-content-start">
                                        <div className="me-3 radio-btn-box">
                                            <Form.Check
                                                type="radio"
                                                id="priorityHigh"
                                                label="High"
                                                {...register('priority', { required: "Priority is required" })}
                                                value="High"
                                                isInvalid={errors.priority}
                                                className="custom-radio"
                                            />
                                        </div>
                                        <div className="me-3 radio-btn-box">
                                            <Form.Check
                                                type="radio"
                                                id="priorityMedium"
                                                label="Medium"
                                                {...register('priority', { required: "Priority is required" })}
                                                value="Medium"
                                                isInvalid={errors.priority}
                                                className="custom-radio"
                                            />
                                        </div>
                                        <div className='radio-btn-box'>
                                            <Form.Check
                                                type="radio"
                                                id="priorityLow"
                                                label="Low"
                                                {...register('priority', { required: "Priority is required" })}
                                                value="Low"
                                                isInvalid={errors.priority}
                                                className="custom-radio"
                                            />
                                        </div>
                                    </div>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.priority?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formStatus">
                                    <Form.Label className='Form-Label'>Status<span className="text-danger"> *</span></Form.Label>
                                    <div className="d-flex justify-content-start">
                                        <div className="me-3 radio-btn-box">
                                            <Form.Check
                                                type="radio"
                                                id="statusOpen"
                                                label="Open"
                                                {...register('status', { required: "Status is required" })}
                                                value="Open"
                                                isInvalid={errors.status}
                                                className="custom-radio"
                                            />
                                        </div>
                                        <div className="me-3 radio-btn-box">
                                            <Form.Check
                                                type="radio"
                                                id="statusPending"
                                                label="Pending"
                                                {...register('status', { required: "Status is required" })}
                                                value="Pending"
                                                isInvalid={errors.status}
                                                className="custom-radio"
                                            />
                                        </div>
                                        <div className='radio-btn-box'>
                                            <Form.Check
                                                type="radio"
                                                id="statusSolved"
                                                label="Solve"
                                                {...register('status', { required: "Status is required" })}
                                                value="Solve"
                                                isInvalid={errors.status}
                                                className="custom-radio"
                                            />
                                        </div>
                                    </div>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.status?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-flex justify-content-between">
                                    <Button variant="secondary" onClick={handleClose} className="btn mt-2 btn-sm cancle">Cancel</Button>
                                    <Button variant="primary" type="submit" className='btn btn-sm save mt-2'>Save</Button>
                                </div>
                            </Form>
                        </Modal.Body>
                    </Modal>

                    {/* delete modal */}
                    <Modal className='custom-modal' show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                        <Modal.Header>
                            <Modal.Title className='Modal-Title'>Delete Complain?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p className='Form-p mb-0'>Are you sure you want to delate this Complain?</p>
                        </Modal.Body>
                        <Modal.Footer className='d-flex justify-content-between'>
                            <Button variant="secondary" className='btn cancle  mt-2' onClick={handleCloseDeleteModal}>Cancel</Button>
                            <Button variant="danger" className='btn delete' onClick={confirmDelete}>Delete</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default ServiceComplaint