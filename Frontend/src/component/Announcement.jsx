import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { MdAccessTimeFilled } from "react-icons/md";
import Sidebar from "../component/layout/Sidebar";
import { FaPlus } from 'react-icons/fa6';
import axios from 'axios';

function Announcement() {

    const [note, setNote] = useState(
        []
    );
    // This will run when the component mounts

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v2/annoucement/getannouncement');
            console.log(response.data.announcements);  // Check the data in console
            setNote(response.data.announcements);  // Set the state with fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const [show, setShow] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    const handleClose = () => {
        setShow(false);
        reset();
        setEditIndex(null);
    };
    const handleShow = () => setShow(true);
    const onSubmit = async (data) => {
        const response = await axios.post("http://localhost:5000/api/v2/annoucement/addannouncement", data)
        console.log(response.data);
        if (editIndex !== null) {
            const updatedNotes = [...note];
            updatedNotes[editIndex] = { ...updatedNotes[editIndex], ...data };
            setNote(updatedNotes);
        } else {
            setNote([...note, { id: note.length + 1, ...data }]);
        }
    };

    const [dropdownIndex, setDropdownIndex] = useState(null);

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

    const confirmDelete = async (_id) => {
        if (deleteIndex !== null) {
            const response = await axios.delete(`http://localhost:5000/api/v2/annoucement/deleteannouncement/${_id}`)
            console.log(response.message._id);
            const updatedNotes = note.filter((_, i) => i !== deleteIndex);
            setNote(updatedNotes);
        }
        handleCloseDeleteModal();
    };

    const handleShowEditModal = (index) => {
        setEditIndex(index);
        const selectedNote = note[index];
        setValue('Announcement_Title', selectedNote.Announcement_Title);
        // setValue('amtPerMember', selectedNote.amtPerMember);
        setValue('Announcement_Date', selectedNote.Announcement_Date);
        setValue('Announcement_Time', selectedNote.Announcement_Time);
        // setValue('dueDate', selectedNote.dueDate);
        setValue('Description', selectedNote.Description);
        setShowEditModal(true);
    };  
    const handleCloseEditModal = () => {
        setShowEditModal(false);
        reset();
        setEditIndex(null);
    };

    const [showViewModal, setShowViewModal] = useState(false);
    const [viewComplaint, setViewComplaint] = useState(null);

    const handleShowViewModal = (index) => {
        setViewComplaint(note[index]);
        setShowViewModal(true);
    };

    const handleCloseViewModal = () => setShowViewModal(false);

    return (
        <div className="d-flex flex-column flex-md-row">
            <div className="flex-shrink-0" >
                <Sidebar />
            </div>
            <div className='dashboard-bg' style={{ width: "1920px" }} >
                <Navbar />
                <div className='stickyHeader' style={{ marginLeft: "300px" }}>
                    <div className='container-fluid ' >
                        <div className='row ps-4 pe-4 pt-5'>
                            <div className='bg-light' style={{ borderRadius: "9px" }}>
                                <div className='d-flex justify-content-between align-items-center     px-2'>
                                    <h5 className=' mb-0  financial-income-title mt-2 pb-4' >Announcement</h5>
                                    <div className='pb-5 pt-2'>
                                        <Button className='set-maintainance-btn d-flex align-items-center other-income-btn p-2' style={{ marginRight: "10px", border: "none" }} onClick={handleShow}><FaPlus

                                            style={{
                                                fontSize: "18px",
                                                borderRadius: "5px",
                                                background: "rgba(255, 255, 255, 1)",
                                                color: "#FE512E",
                                                marginRight: "8px",
                                            }}

                                        /> Create Announcement</Button>
                                    </div>
                                </div>


                                {show && (
                                    <div className="modal fade show d-block  custom-modal" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">

                                                <h5 className="modal-title Modal-Title p-3 pb-0">Add Announcement</h5>
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <div className="modal-body">
                                                        <div className="mb-3">
                                                            <label className='Form-Label'>Announcement Title<span className='text-danger'>*</span></label>
                                                            <input type="text" className="form-control Form-Control"
                                                                placeholder='Enter Name' {...register('Announcement_Title', { required: true })} />
                                                            {errors.Announcement_Title && <small className="text-danger">Title is required</small>}
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className='Form-Label'>Description <span className='text-danger'>*</span></label>
                                                            <input type="text" className="form-control Form-Control" placeholder='Enter Description' {...register('Description', { required: true })} />
                                                            {errors.Description && <small className="text-danger">Description is required</small>}
                                                        </div>
                                                        <div className='d-flex justify-content-between'>
                                                            <div className="mb-3 w-50 me-2">
                                                                <label className='Form-Label'>Announcement Date <span className='text-danger'>*</span></label>
                                                                <input type="date" className="form-control Form-Control" {...register('Announcement_Date', { required: true })} />
                                                            </div>
                                                            <div className="mb-3 w-50 ms-2">
                                                                <label className='Form-Label'>Announcement Time <span className='text-danger position-relative'>*</span></label>
                                                                <input type="time" id="appt" name="appt" className="form-control Form-Control timePicker" {...register('Announcement_Time', { required: true })} /><MdAccessTimeFilled className='position-absolute anouncement-icon' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="px-3 pb-3 d-flex justify-content-between">
                                                        <button type="button" className="btn btn-sm cancle" onClick={handleClose}>Cancel</button>
                                                        <button type="submit" className="btn btn-sm save">Save</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="row card-row g-3 ps-3">


                                    {Array.isArray(note) && note.map((val, index) => (
                                        <div className="col-lg-3 mb-3" key={val._id}>
                                            <div className="card">
                                                <div className="card-header card-title text-light d-flex align-items-center justify-content-between" style={{ height: "54px", fontSize: "16px", fontWeight: "500", background: " rgba(86, 120, 233, 1)" }}>
                                                    {val.Announcement_Title}
                                                    <div className='position-relative'>

                                                        <button
                                                            className="btn btn-light p-0 mt-0"
                                                            onClick={() => setDropdownIndex(dropdownIndex === index ? null : index)}
                                                            style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                        >
                                                            <BsThreeDotsVertical />
                                                        </button>


                                                        {dropdownIndex === index && (
                                                            <div className="dropdown-menu show position-absolute" style={{ top: '100%', zIndex: 10 }}>
                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() => handleShowEditModal(index)}
                                                                >
                                                                    Edit
                                                                </button>

                                                                {showEditModal && (
                                                                    <div className="modal fade show d-block custom-modal" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                                                                        <div className="modal-dialog modal-dialog-centered">
                                                                            <div className="modal-content">
                                                                                <h5 className="modal-title p-3 pb-0">Edit Announcement</h5>
                                                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                                                    <div className="modal-body">
                                                                                        <div className="mb-3">
                                                                                            <label className='Form-Label'>Announcement Title<span className='text-danger'>*</span></label>
                                                                                            <input type="text" className="form-control Form-Control" {...register('Announcement_Title', { required: true })} />
                                                                                            {errors.Announcement_Title && <small className="text-danger">Announcement is required</small>}
                                                                                            {val.Announcement_Title}
                                                                                        </div>
                                                                                        <div className="mb-3">
                                                                                            <label className='Form-Label'>Description <span className='text-danger'>*</span></label>
                                                                                            <input type="text" className="form-control Form-Control" placeholder='Enter Description' {...register('Description', { required: true })} />
                                                                                            {errors.Description && <small className="text-danger">Description is required</small>}
                                                                                            {val.Description}
                                                                                        </div>
                                                                                        <div className='d-flex justify-content-between'>
                                                                                            <div className="mb-3">
                                                                                                <label className='Form-Label'>Announcement Date<span className='text-danger'>*</span></label>
                                                                                                <input type="date" className="form-control Form-Control w-100" {...register('Announcement_Date', { required: true })} />
                                                                                                {val.Announcement_Date}
                                                                                            </div>
                                                                                            <div className="mb-3">
                                                                                                <label className='Form-Label'>Announcement time<span className='text-danger'>*</span></label>
                                                                                                <input type="text" className="form-control Form-Control" {...register('Announcement_Time', { required: true })} /><MdAccessTimeFilled className='position-absolute anouncement-icon' />
                                                                                                {val.Announcement_Time}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="px-3 pb-3 d-flex justify-content-between">
                                                                                        <button type="button" className="btn btn-sm cancle" onClick={handleCloseEditModal}>Cancel</button>
                                                                                        <button type="submit" className="btn btn-sm save">Save</button>
                                                                                    </div>
                                                                                </form>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() => handleShowViewModal(index)}
                                                                >
                                                                    View
                                                                </button>

                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() => handleShowDeleteModal(index)}
                                                                >
                                                                    Delete
                                                                </button>


                                                                <Modal className='custom-modal' show={showDeleteModal} onHide={handleCloseDeleteModal} centered>

                                                                    <Modal.Title className='Modal-Title px-3 pt-3'>Delete Number?</Modal.Title>

                                                                    <Modal.Body>
                                                                        <p className='Form-p mb-0'>Are you sure you want to delete this Security?</p>
                                                                    </Modal.Body>

                                                                    <Modal.Footer className='d-flex justify-content-between'>
                                                                        <Button variant="secondary" className='btn cancle  mt-2' onClick={handleCloseDeleteModal}>Cancel</Button>
                                                                        <Button variant="danger" className='btn delete' onClick={confirmDelete}>Delete</Button>
                                                                    </Modal.Footer>
                                                                </Modal>


                                                                <Modal show={showViewModal} className='custom-modal custom-modal' onHide={handleCloseViewModal} centered>
                                                                    <Modal.Header closeButton>
                                                                        <Modal.Title>View Security Protocol</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                        {viewComplaint && (
                                                                            <div>

                                                                                <div className='mb-4'>
                                                                                    <label className='anouncement-view-title'>Title</label>
                                                                                    <p className='mb-0 anouncement-view-p'>{viewComplaint.Announcement_Title}</p>
                                                                                </div>

                                                                                <div className='mb-4'>
                                                                                    <label className='anouncement-view-title'>Description</label>
                                                                                    <p className='mb-0 anouncement-view-p'>{viewComplaint.Description}</p>
                                                                                </div>

                                                                                <div className='d-flex'>
                                                                                    <div className='mb-4'>
                                                                                        <label className='anouncement-view-title'>Announcement Date</label>
                                                                                        <p className='mb-0 anouncement-view-p'>{viewComplaint.Announcement_Date}</p>
                                                                                    </div>
                                                                                    <div className='mb-4 ms-5'>
                                                                                        <label className='anouncement-view-title'>Announcement Time</label>
                                                                                        <p className='mb-0 anouncement-view-p'>{viewComplaint.Announcement_Time}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </Modal.Body>
                                                                </Modal>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='card-body'>
                                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                                        <h6 className="card-body-title mb-0">Announcement Date</h6>
                                                        <span className="card-body-title text-dark mb-0 fw-medium">{new Date(val.Announcement_Date).toLocaleDateString("en-GB", {
                                                            day: "2-digit",
                                                            month: "2-digit",
                                                            year: "numeric",
                                                        })}</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                                        <h6 className="card-body-title mb-0">Announcement Time</h6>
                                                        <span className="card-body-title text-dark mb-0 fw-medium">{val.Announcement_Time}</span>
                                                    </div>
                                                    <h6 className="card-body-title mb-2">Description</h6>
                                                    <p className="card-text card-des fw-medium">{val.Description}</p>
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

        </div >
    )
}
export default Announcement;    