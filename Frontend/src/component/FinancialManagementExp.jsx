import React, { useState } from 'react'
import Navbar from './Navbar'
import { CiImageOn } from "react-icons/ci";
import { IoEyeSharp } from "react-icons/io5";
import { BiSolidFilePdf } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useForm } from 'react-hook-form';
import { Button, Modal, Form } from 'react-bootstrap';
import { MdEditSquare } from "react-icons/md";
import { FaEdit, FaPlusSquare } from "react-icons/fa";
import Sidebar from "../component/layout/Sidebar";

import { FaCamera, FaEye, FaTrash } from 'react-icons/fa6';

import viewICon from '../Icons/view.png'
import deleteIcon from '../Icons/delete.png'
import editIcon from '../Icons/Edit.png'

function FinancialManagementExp() {

  const [showViewModal, setShowViewModal] = useState(false);
  const [viewComplaint, setViewComplaint] = useState(null);
  const [photo, setPhoto] = useState(null);
  const handleShowViewModal = (index) => {
    setViewComplaint(exp[index]);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => setShowViewModal(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto({
        preview: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      });
    }
  };

  const [exp, setExp] = useState([
    { title: 'Rent or Mortgage', des: 'A visual representation of your spending categories...', date: '10/02/2024', amt: '₹ 1000', format: 'JPG' },
    { title: 'Housing Costs', des: 'Rack the fluctuations in your spending over we time...', date: '11/02/2024', amt: '₹ 1000', format: 'PDF' },
    { title: 'Property Taxes', des: 'Easily compare your planned budget against we your...', date: '12/02/2024', amt: '₹ 1000', format: 'PDF' },
    { title: 'Transportation', des: ' Identify your largest expenditures, you a enabling you...', date: '13/02/2024', amt: '₹ 1000', format: 'PDF' },
    { title: 'Financial Breakdown', des: 'Tailor the dashboard to your unique financial we goals...', date: '14/02/2024', amt: '₹ 1000', format: 'PDF' },
    { title: 'Expense Tracker', des: 'preferences by categorizing and organizing your expe...', date: '15/02/2024', amt: '₹ 1000', format: 'PDF' },
    { title: 'Personal Expenses', des: 'future and adjust your budget will become accordingly...', date: '16/02/2024', amt: '₹ 1000', format: 'PDF' },
  ])

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
      const updatedComplaint = exp.filter((_, i) => i !== deleteIndex);
      setExp(updatedComplaint);
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
      title: data.title,
      des: data.des,
      date: data.date,
      amt: data.amt,
      format: data.format,
    };

    if (editIndex !== null) {
      const updatedComplaintsList = exp.map((exp, index) =>
        index === editIndex ? updatedComplaint : exp
      );
      setExp(updatedComplaintsList);
    } else {
      setExp([...exp, updatedComplaint]);
    }

    handleClose();
  };

  const handleEdit = (index) => {
    const complaintToEdit = exp[index];
    setEditIndex(index);
    setShow(true);

    reset({
      title: complaintToEdit.title,
      des: complaintToEdit.des,
      date: complaintToEdit.date,
      amt: complaintToEdit.amt,
      format: complaintToEdit.format,
    });
  };



  return (
    <div className="d-flex flex-column flex-md-row">
      <div className="flex-shrink-0" >
        <Sidebar />
      </div>

      <div className='dashboard-bg ' style={{ width: "1920px" }}>
        <Navbar />
        <div className='stickyHeader' style={{ width: "1630px", marginLeft: "290px" }}>
          <div className='container-fluid income' >

            <div className='row p-5'>
              <div className='p-0'>
                <div className="table-responsive rounded pb-3">

                  <div className='bg-light'>
                    <div className='d-flex justify-content-between align-items-center p-3 pt-1'>
                      <h3 className=' mb-0  financial-income-title'>Add Expenses Details</h3>

                      <div>
                        <button className='set-maintainance-btn d-flex align-items-center p-2' onClick={handleShow}> <FaPlusSquare className='me-2' /> Add New Expenses details</button>
                      </div>
                    </div>

                    <div className='px-3 financial-maintainance-table '>
                      <table className="table">

                        <thead className='table-primary '>
                          <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col" className='text-center'>Date</th>
                            <th scope="col" className='text-center'>Amount</th>
                            <th scope="col" className='text-center'>Bill Format</th>
                            <th scope="col" className='text-center' >Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            exp.map((val, index) => {
                              return (
                                <tr key={index} className='bg-light'>

                                  <td style={{ verticalAlign: "middle", width: "270px" }} className='financial-Pnumber'> {val.title}</td>


                                  <td style={{ verticalAlign: "middle", width: "450px" }} className='financial-Pnumber'>{val.des}</td>

                                  <td style={{ verticalAlign: "middle", width: "250px" }} className='financial-Pnumber text-center'>{val.date}</td>


                                  <td style={{ verticalAlign: "middle", width: "200px" }} className='financial-Pnumber exp-amt-color text-center'>{val.amt}</td>

                                  <td style={{ verticalAlign: "middle", width: "200px" }} className='financial-Pnumber text-center'>
                                    {val.format === 'JPG' ? <CiImageOn className='me-1 jpg-btn' style={{ fontSize: '20px' }} /> : <BiSolidFilePdf className='me-1 pdf-btn' style={{ fontSize: '20px' }} />}
                                    {val.format}
                                  </td>

                                  <td style={{ verticalAlign: "middle", width: "200px" }}>

                                    <div className="d-flex align-items-center justify-content-center " >
                                      <img src={editIcon} className="text-success me-2" style={{ cursor: "pointer" }} onClick={() => handleEdit(index)} />
                                      <img src={viewICon} className="text-primary me-2" style={{ cursor: "pointer" }} onClick={() => handleShowViewModal(index)} />
                                      <img src={deleteIcon} className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleCloseDeleteModal(index)} />
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

                  {/* Add/Edit Modal */}
                  <Modal show={show} onHide={handleClose} centered className="custom-modal">
                    <Modal.Header>
                      <Modal.Title className='Modal-Title'>
                        {editIndex !== null ? 'Edit Expense Details' : 'Add Expense Details'}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="formTitle">
                          <Form.Label className='Form-Label'>Title<span className="text-danger"> *</span></Form.Label>
                          <Form.Control
                            className='Form-Control'
                            type="text"
                            placeholder="Enter Title"
                            {...register('title', { required: "Title is required" })}
                            isInvalid={errors.title}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDescription">
                          <Form.Label className='Form-Label'>Description<span className="text-danger"> *</span></Form.Label>
                          <Form.Control
                            className='Form-Control'
                            type="text"
                            placeholder="Enter Description"
                            {...register('des', { required: "Description is required" })}
                            isInvalid={errors.des}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.des?.message}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDate">
                          <Form.Label className='Form-Label'>Date<span className="text-danger"> *</span></Form.Label>
                          <Form.Control
                            className='Form-Control'
                            type="date"
                            {...register('date', { required: "Date is required" })}
                            isInvalid={errors.date}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.date?.message}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formAmount">
                          <Form.Label className='Form-Label'>Amount<span className="text-danger"> *</span></Form.Label>
                          <Form.Control
                            className='Form-Control'
                            type="text"
                            placeholder="Enter Amount"
                            {...register('amt', { required: "Amount is required" })}
                            isInvalid={errors.amt}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.amt?.message}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formFormat">
                          <Form.Label className="Form-Label">Upload Photo</Form.Label>
                          <div className="text-start" style={{ display: "flex", marginBottom: "20px" }}>
                            <label htmlFor="photo-upload" style={{ cursor: "pointer", textAlign: "center" }}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  textAlign: "center",
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
                                  {photo?.preview ? (
                                    <img
                                      src={photo.preview}
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
                              onChange={handleFileChange}
                              accept="image/png, image/jpeg"
                              style={{ display: "none" }}
                            />
                          </div>
                        </Form.Group>


                        <div className="d-flex justify-content-between">
                          <Button variant="secondary" onClick={handleClose} className="btn mt-2 cancle">
                            Cancel
                          </Button>
                          <Button variant="primary" type="submit" className='btn mt-2 save'>
                            {editIndex !== null ? 'Update' : 'Add'}
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


                          <p className='view-strong text-dark'><strong className='view-strong'>Title</strong> <br />{viewComplaint.title}</p>


                          <p className='view-strong text-dark'><strong className='view-strong'>Description</strong> <br />{viewComplaint.des}</p>

                          <div className='d-flex'>
                            <p className='view-strong text-dark'><strong className='view-strong'>Date</strong> <br />{viewComplaint.date}</p>

                            <p className='view-strong text-dark ms-5'><strong className='view-strong'>Amount</strong> <br />{viewComplaint.amt}</p>
                          </div>

                          <p className='view-strong text-dark'><strong className='view-strong'>Bill</strong> <br /></p>

                          {/* Display the file */}
                          {viewComplaint.file && (
                            <div>
                              {viewComplaint.format === 'JPG' || viewComplaint.format === 'PNG' ? (
                                <img
                                  src={URL.createObjectURL(viewComplaint.file)}
                                  alt="Uploaded Bill"
                                  style={{ maxWidth: '100%', height: 'auto' }}
                                />
                              ) : viewComplaint.format === 'PDF' ? (
                                <embed
                                  src={URL.createObjectURL(viewComplaint.file)}
                                  type="application/pdf"
                                  width="100%"
                                  height="400px"
                                />
                              ) : (
                                <p>No file to display</p>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </Modal.Body>
                  </Modal>

                  {/* delete modal */}
                  <Modal className='custom-modal' show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                    <Modal.Header>
                      <Modal.Title className='Modal-Title'>Delete Number?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p className='Form-p mb-0'>Are you sure you want to delete this?</p>
                    </Modal.Body>
                    <Modal.Footer className='d-flex justify-content-between'>
                      <Button variant="secondary" className='btn cancle  mt-2' onClick={handleCloseDeleteModal}>Cancel</Button>
                      <Button variant="danger" className='btn delete' onClick={confirmDelete}>Delete</Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinancialManagementExp;