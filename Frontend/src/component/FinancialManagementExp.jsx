import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { CiImageOn } from "react-icons/ci";
import { IoEyeSharp } from "react-icons/io5";
import { BiSolidFilePdf } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useForm } from 'react-hook-form';
import { Button, Modal, Form, Spinner } from 'react-bootstrap';
import { MdEditSquare } from "react-icons/md";
import { FaEdit, FaPlusSquare } from "react-icons/fa";
import Sidebar from "../component/layout/Sidebar";
import axios from "axios"

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


  const [exp, setExp] = useState()



  // New state for delete confirmation modal

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);


  const handleShowDeleteModal = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteIndex(null);
  };

  const confirmDelete = async(id) => {
    // if (deleteIndex !== null) {
    //   const updatedComplaint = exp.filter((_, i) => i !== deleteIndex);
    //   setExp(updatedComplaint);
    // }
    try {
      const response = await axios.delete(`http://localhost:5000/api/v2/expenses/${id}`);
      console.log("Delete Response:", response.data); // Debug response
      if (response.data.success) {
        // Remove the deleted expense from the state
        setExp((prevExp) => prevExp.filter((expense) => expense._id !== id));
      } else {
        console.error("Failed to delete expense:", response.data.message);
        alert("Failed to delete expense. Please try again.");
      }
    } catch (error) {
      console.error("Delete error:", error); // Debug error
      alert("An error occurred while deleting the expense. Please try again.");
    }
    handleCloseDeleteModal();
  };

  const [show, setShow] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [editIndex, setEditIndex] = useState(null);

  const [error, setError] = useState(null);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    reset();
    setEditIndex(null);
  };


  const onSubmit = async (data) => {
    try {
      const expenseData = {
        ...data,
        Upload_Bill: photo?.file || undefined,
      };


      if (editIndex !== null) {
        // Edit expense
        const expenseId = exp[editIndex]?._id; // Use `_id` instead of `id` if that's the key in your backend
        if (!expenseId) {
          console.error("Expense ID is missing for edit operation.");
          return;
        }

        const response = await axios.put(
          `http://localhost:5000/api/v2/expenses/updateexpenses/${expenseId}`,
          expenseData
        );

        const updatedExpenses = [...exp];
        updatedExpenses[editIndex] = response.data.updatedExpense; // Update the local list with the updated expense
        setExp(updatedExpenses);
        FetchExpenses()
      } else {
        // Add new expense
        const formData = new FormData();
        Object.entries(expenseData).forEach(([key, value]) => formData.append(key, value));
        const response = await axios.post(`http://localhost:5000/api/v2/expenses/addexpenses`, formData);
        setExp( response.data.FormData);
        FetchExpenses()
      }
      handleClose();
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  };

  const FetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v2/expenses/viewexpenses');
      console.log("API Response:", response.data.Expense); // Debug response
      if (response.data && response.data.Expense) {
        setExp(response.data.Expense);
      } else {
        setExp([]); // Handle unexpected structure
      }
    } catch (error) {
      console.error("Fetch error:", error); // Debug error
      setError("Failed to fetch expenses. Please try again.");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    FetchExpenses();
  }, []);



  const handleEdit = (index) => {
    const complaintToEdit = exp[index];
    setEditIndex(index);
    setShow(true);

    reset({
      Title: complaintToEdit.Title,
      Description: complaintToEdit.Description,
      Date: complaintToEdit.Date,
      Amount: complaintToEdit.Amount,
      Upload_Bill: complaintToEdit.Upload_Bill,
    });
  };




  if (error) {
    return <div className="alert alert-danger mt-5">{error}</div>;
  }


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

                    <div className="px-3 financial-maintainance-table">
                      {error ? (
                        <div>{error}</div>
                      ) : (
                        <table className="table">
                          <thead className="table-primary">
                            <tr>
                              <th scope="col">Title</th>
                              <th scope="col">Description</th>
                              <th scope="col" className="text-center">Date</th>
                              <th scope="col" className="text-center">Amount</th>
                              <th scope="col" className="text-center">Bill Format</th>
                              <th scope="col" className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {exp?.length > 0 ? (
                              exp.map((val, index) => (
                                <tr key={index} className="bg-light">
                                  <td>{val?.Title }</td>
                                  <td>{val?.Description || "N/A"}</td>
                                  <td className="text-center">{new Date(val?.Date).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  })}</td>
                                  <td className="text-center">{val?.Amount || "N/A"}</td>
                                  <td className="text-center">
                                    {val?.Upload_Bill ? (
                                      <a href={val.Upload_Bill} target="_blank" rel="noopener noreferrer">
                                        {val.Upload_Bill.endsWith(".pdf") ? (
                                          <BiSolidFilePdf style={{ fontSize: "20px" }} />
                                        ) : (
                                          <CiImageOn style={{ fontSize: "20px" }} />
                                        )}
                                      </a>
                                    ) : (
                                      "N/A"
                                    )}
                                  </td>
                                  <td className="text-center">
                                    {/* <button onClick={() => handleEdit(index)}>Edit</button>
                                    <button onClick={() => handleShowDeleteModal(index)}>Delete</button>
                                    <button onClick={() => handleShowViewModal(index)}>View</button> */}
                                    <img src={editIcon} className="text-success me-2" style={{ cursor: "pointer" }} onClick={() => handleEdit(index)} />
                                    <img src={viewICon} className="text-primary me-2" style={{ cursor: "pointer" }} onClick={() => handleShowViewModal(index)} />
                                    <img src={deleteIcon} className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleShowDeleteModal(index)} />
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="6" className="text-center">No Expenses Found</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      )}
                    </div>

                  </div>

                  
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
                            {...register('Title', { required: "Title is required" })}
                            isInvalid={errors.Title}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.Title?.message}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDescription">
                          <Form.Label className='Form-Label'>Description<span className="text-danger"> *</span></Form.Label>
                          <Form.Control
                            className='Form-Control'
                            type="text"
                            placeholder="Enter Description"
                            {...register('Description', { required: "Description is required" })}
                            isInvalid={errors.Description}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.Description?.message}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDate">
                          <Form.Label className='Form-Label'>Date<span className="text-danger"> *</span></Form.Label>
                          <Form.Control
                            className='Form-Control'
                            type="date"
                            {...register('Date', { required: "Date is required" })}
                            isInvalid={errors.Date}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.Date?.message}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formAmount">
                          <Form.Label className='Form-Label'>Amount<span className="text-danger"> *</span></Form.Label>
                          <Form.Control
                            className='Form-Control'
                            type="text"
                            placeholder="Enter Amount"
                            {...register('Amount', { required: "Amount is required" })}
                            isInvalid={errors.Amount}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.Amount?.message}
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

                 
                  <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>View Complain</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {viewComplaint && (
                        <div>

                          <p className='view-strong text-dark'><strong className='view-strong'>Title</strong> <br />{viewComplaint.Title}</p>

                          <p className='view-strong text-dark'><strong className='view-strong'>Description</strong> <br />{viewComplaint.Description}</p>

                          <div className='d-flex'>
                            <p className='view-strong text-dark'><strong className='view-strong'>Date</strong> <br />{viewComplaint.Date}</p>

                            <p className='view-strong text-dark ms-5'><strong className='view-strong'>Amount</strong> <br />{viewComplaint.Amount}</p>
                          </div>

                          <p className='view-strong text-dark'><strong className='view-strong'>Bill</strong> <br /></p>

                          
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