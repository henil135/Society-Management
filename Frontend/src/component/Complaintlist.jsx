import React, { useState } from 'react'

import { useForm } from 'react-hook-form';
import { Button, Modal, Form } from 'react-bootstrap';
import SImg from '../assets/S.png';
import HImg from '../assets/H.png';
import GImg from '../assets/G.png';
import NImg from '../assets/N.png';
import AvatarImg from '../assets/Avatar.png';
import viewICon from '../Icons/view.png'
import deleteIcon from '../Icons/delete.png'
import editIcon from '../Icons/Edit.png'
function Complaintlist() {

    const [activity, setActivity] = useState([
        { img: SImg, name: 'Society Meeting', time: '8:00 PM To 10:00 PM ', date: '24-09-2024' },
        { img: HImg, name: 'Holi Festival', time: '8:00 PM To 10:00 PM ', date: '24-09-2024' },
        { img: GImg, name: 'Ganesh Chaturthi', time: '8:00 PM To 10:00 PM ', date: '24-09-2024' },
        { img: NImg, name: 'Navratri Festival', time: '8:00 PM To 10:00 PM ', date: '24-09-2024' },
        { img: SImg, name: 'Society Meeting', time: '8:00 PM To 10:00 PM ', date: '24-09-2024' },
    ]);

    const [complaint, setComplaint] = useState([
        { img: AvatarImg, complainer: 'Evelyn Harper', complaint: 'Unethical Behavior', date: '01/02/2024', priority: 'Medium', status: 'Panding' },
        { img: AvatarImg, complainer: 'Evelyn Harper', complaint: 'Unethical Behavior', date: '01/02/2024', priority: 'Low', status: 'Open' },
        { img: AvatarImg, complainer: 'Evelyn Harper', complaint: 'Unethical Behavior', date: '01/02/2024', priority: 'High', status: 'Open' },
        { img: AvatarImg, complainer: 'Evelyn Harper', complaint: 'Unethical Behavior', date: '01/02/2024', priority: 'High', status: 'Open' },
        { img: AvatarImg, complainer: 'Evelyn Harper', complaint: 'Unethical Behavior', date: '01/02/2024', priority: 'High', status: 'Open' },
        { img: AvatarImg, complainer: 'Evelyn Harper', complaint: 'Unethical Behavior', date: '01/02/2024', priority: 'High', status: 'Open' },
    ]);

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
            const updatedComplaint = complaint.filter((_, i) => i !== deleteIndex);
            setComplaint(updatedComplaint);
        }
        handleCloseDeleteModal();
    };

    const [show, setShow] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [editIndex, setEditIndex] = useState(null);

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);
        reset();
        setEditIndex(null);
    };

    const onSubmit = (data) => {
        const updatedComplaint = {
            img: require('../assets/Avatar.png'),
            complainer: data.fullName,
            complaint: data.complaint,
            date: data.date,
            priority: data.priority,
            status: data.status,
        };

        if (editIndex !== null) {
            const updatedComplaintsList = complaint.map((complaint, index) =>
                index === editIndex ? updatedComplaint : complaint
            );
            setComplaint(updatedComplaintsList);
        } else {
            setComplaint([...complaint, updatedComplaint]);
        }

        handleClose();
    };


    const handleEdit = (index) => {
        const complaintToEdit = complaint[index];
        setEditIndex(index);
        setShow(true);

        reset({
            fullName: complaintToEdit.complainer,
            complaint: complaintToEdit.complaint,
            date: complaintToEdit.date,
            priority: complaintToEdit.priority,
            status: complaintToEdit.status,
        });
    };

    const [showViewModal, setShowViewModal] = useState(false);
    const [viewComplaint, setViewComplaint] = useState(null);

    const handleShowViewModal = (index) => {
        setViewComplaint(complaint[index]);
        setShowViewModal(true);
    };

    const handleCloseViewModal = () => setShowViewModal(false);

    return (
        <div className='container-fluid py-2'>
            <div className='row px-4 '>
                <div className='col-lg-9 bg-light rounded '>
                    <div className="table-responsive Complaint-table rounded custom-scrollbar" >

                        <div >
                            <h5 className=' mb-0 py-3 ps-1  financial-income-title'>Maintenance  Details</h5>
                            <div className=' financial-maintainance-table '>

                                <table className="table">
                                    <thead className='table-primary'>
                                        <tr >
                                            <th scope="col">Complainer Name</th>
                                            <th scope="col">Complaint Name</th>
                                            <th scope="col" className='text-center' >Date</th>
                                            <th scope="col" className='text-center'>Priority</th>
                                            <th scope="col" className='text-center'>Complain Status</th>
                                            <th scope="col" className='text-center'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            complaint.map((val, index) => {
                                                return (
                                                    <tr key={index} >
                                                        <td style={{ height: '55px' }}><img src={val.img} className='me-2' height={40} />{val.complainer}</td>
                                                        <td style={{ height: '55px' }}>{val.complaint}</td>
                                                        <td style={{ height: '55px' }}>{val.date}</td>

                                                        <td style={{ textAlign: "center" }} ><Button className='priority-btn btn btn-sm mb-2' style={{ backgroundColor: val.priority === 'Low' ? 'rgba(57, 151, 61, 1)' : val.priority === 'High' ? ' rgba(231, 76, 60, 1)' : 'rgba(86, 120, 233, 1)' }}>{val.priority}</Button></td>

                                                        <td style={{ height: '55px', textAlign: "center" }}><Button className='status-btn btn btn-sm mb-2' style={{ color: val.status === 'Open' ? 'rgba(86, 120, 233, 1)' : val.status === 'Panding' ? 'rgba(255, 195, 19, 1)' : 'rgba(57, 151, 61, 1)', backgroundColor: val.status === 'Open' ? 'rgba(86, 120, 233, 0.1)' : val.status === 'Panding' ? 'rgba(255, 195, 19, 0.1)' : 'rgba(57, 151, 61, 0.1)' }}>{val.status}</Button></td>
                                                        <td style={{ height: '55px', textAlign: "center", verticalAlign: "middle" }}>
                                                            <div className="d-flex align-items-center justify-content-center">
                                                                <img src={editIcon} className="text-success me-2" style={{ cursor: "pointer" }} onClick={() => handleEdit(complaint)} />
                                                                <img src={viewICon} className="text-primary me-2" style={{ cursor: "pointer" }} onClick={() => handleView(complaint)} />
                                                                <img src={deleteIcon} className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleDelete(index)} />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>

                            </div>
                        </div>

                        {/* delete modal */}
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

                        {/* Modal for the form */}
                        <Modal show={show} onHide={handleClose} centered className="custom-modal">
                            <Modal.Header>
                                <Modal.Title className='Modal-Title'>
                                    Edit Important Number
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Group className="mb-3" controlId="formFullName">
                                        <Form.Label className='Form-Label'>Full Name<span className="text-danger"> *</span></Form.Label>
                                        <Form.Control
                                            className='Form-Control'
                                            type="text"
                                            placeholder="Enter Full Name"
                                            {...register('fullName', { required: "Full Name is required" })}
                                            isInvalid={errors.fullName}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.fullName?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formPhoneNumber">
                                        <Form.Label className='Form-Label'>	Complaint Name<span className="text-danger"> *</span></Form.Label>
                                        <Form.Control
                                            className='Form-Control'
                                            type="tel"
                                            placeholder="Enter Full Name"
                                            {...register('complaint', {
                                                required: "Complaint name is required",
                                            })}
                                            isInvalid={errors.complaint}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.complaint?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formWork">
                                        <Form.Label className='Form-Label'>Date<span className="text-danger"> *</span></Form.Label>
                                        <Form.Control
                                            className='Form-Control'
                                            type="date"
                                            placeholder="Enter Date"
                                            {...register('date', { required: "Date is required" })}
                                            isInvalid={errors.date}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.date?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>

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
                                        <Button variant="secondary" onClick={handleClose} className="btn mt-2 cancle">
                                            Cancel
                                        </Button>
                                        <Button variant="primary" type="submit" className='btn mt-2 save'>
                                            Save
                                        </Button>
                                    </div>
                                </Form>
                            </Modal.Body>
                        </Modal>

                        {/* View Modal */}
                        <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>View Complain</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {viewComplaint && (
                                    <div>

                                        <div className='d-flex align-items-center mb-4'>
                                            <img src={viewComplaint.img} className='me-3' width={70} /><p className='mb-0 view-p'>{viewComplaint.complainer}<br /><span className='view-span'>{viewComplaint.date}</span></p>
                                        </div>

                                        <p className='view-strong text-dark'><strong className='view-strong'>Complaint:</strong> <br />{viewComplaint.complaint}</p>

                                        <strong className='view-strong'>Priority:</strong> <p className='view-strong priority-btn text-center mt-1' style={{ backgroundColor: viewComplaint.priority === 'Low' ? 'rgba(57, 151, 61, 1)' : viewComplaint.priority === 'High' ? ' rgba(231, 76, 60, 1)' : 'rgba(86, 120, 233, 1)' }}>{viewComplaint.priority}</p>

                                        <strong className='view-strong'>Status:</strong><p className='view-strong mt-1 status-btn text-center' style={{ color: viewComplaint.status === 'Open' ? 'rgba(86, 120, 233, 1)' : viewComplaint.status === 'Panding' ? 'rgba(255, 195, 19, 1)' : 'rgba(57, 151, 61, 1)', backgroundColor: viewComplaint.status === 'Open' ? 'rgba(86, 120, 233, 0.1)' : viewComplaint.status === 'Panding' ? 'rgba(255, 195, 19, 0.1)' : 'rgba(57, 151, 61, 0.1)' }} > {viewComplaint.status}</p>

                                    </div>
                                )}
                            </Modal.Body>
                        </Modal>


                    </div>
                </div>

                <div className='col-lg-3 px-1'>
                    <div className="maintenances  px-2 bg-white rounded-lg shadow-md max-w-md mx-auto custom-scrollbar" style={{ borderRadius: '12px', overflowY: 'auto' }}>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h2 className='mt-4'>Upcoming Activity</h2>

                            <Button
                                className='month-btn rounded-2 p-2 bg-light text-dark'
                            >
                                Month
                            </Button>

                        </div>

                        <div>
                            {activity.map((activity, index) => (
                                <div key={index} className="py-3 rounded-lg d-flex justify-content-between align-items-center shadow-sm ">
                                    <div className='d-flex'>
                                        <div className='me-2'>
                                            <img src={activity.img} />
                                        </div>
                                        <div>
                                            <p className='mb-1 maintenances-p'>{activity.name}</p>
                                            <p className='mb-1 maintenances-panding'>{activity.time}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h6 className='activity-date'>{activity.date}</h6>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Complaintlist;