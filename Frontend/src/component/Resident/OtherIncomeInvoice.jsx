import React, { useState } from 'react'
import ResidentSidebar from '../layout/ResidentSidebar'
import Navbar from '../Navbar';
import balanceRactangle from '../../assets/Rectangle 1063.png'
import incomeRactangle from '../../assets/Rectangle 1063 (1).png'
import { Modal, Button, Form } from 'react-bootstrap';
import visa from '../../assets/visa-logo.png'
import mastercard from '../../assets/mastercard-logo.png'
import cash from '../../assets/cash-logo.png'
import { LuArrowDownSquare } from "react-icons/lu";
import { jsPDF } from 'jspdf';


const OtherIncomeInvoices = () => {

    const [DueEventPayment, setDueEventPayment] = useState([
        { id: 1, title: 'Due Event Payment', name: "Navratri", billDate: '11/01/2024', amount: "1000.00" },
        { id: 2, title: 'Due Event Payment', name: "Navratri", billDate: '11/01/2024', amount: "1000.00" },
        { id: 3, title: 'Due Event Payment', name: "Navratri", billDate: '11/01/2024', amount: "1000.00" },
    ]);


    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);


    const [showPayNowModal, setShowPayNowModal] = useState(false);
    const [showCardDetailsModal, setShowCardDetailsModal] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("mastercard");


    const handleClosePayNowModal = () => setShowPayNowModal(false);
    const handleShowPayNowModal = () => setShowPayNowModal(true);

    const handleCloseCardDetailsModal = () => setShowCardDetailsModal(false);

    const handleShowCardDetailsModal = () => {
        if (selectedPaymentMethod === "cash") {
            alert("Cash payment option selected. Please pay in cash.");
        } else {
            setShowPayNowModal(false); // Close the first modal
            setShowCardDetailsModal(true); // Open the second modal
        }
    };

    const handlePaymentChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

    const [showViewModal, setShowViewModal] = useState(false);
    const [viewComplaint, setViewComplaint] = useState(null);

    const handleShowViewModal = (index) => {
        setViewComplaint(DueEventPayment[index]); // Set the specific complaint data
        setShowViewModal(true); // Show the modal
    };

    const handleCloseViewModal = () => setShowViewModal(false);

    const handleDownloadInvoice = () => {
        if (!DueEventPayment) return;

        const doc = new jsPDF();

        // Add Title
        doc.setFontSize(16);
        doc.text("Maintenance Invoice", 14, 20);

        // Add Invoice Details
        doc.setFontSize(12);
        doc.text(`Invoice ID: ${DueEventPayment.id}`, 14, 30);
        doc.text(`Owner Name: ${DueEventPayment.name}`, 14, 40);
        doc.text(`Bill Date: ${DueEventPayment.bdate}`, 14, 50);
        doc.text(`Payment Date: ${DueEventPayment.pdate}`, 14, 60);
        doc.text(`Phone Number: ${DueEventPayment.pnumber}`, 14, 70);
        doc.text(`Email: ${DueEventPayment.email}`, 14, 80);

        // Add Maintenance and Pending Amount
        doc.text(`Maintenance Amount: ₹${DueEventPayment.mamt}`, 14, 90);
        doc.text(`Pending Amount: ₹${DueEventPayment.pamt}`, 14, 100);
        doc.text("Penalty: ₹350.00", 14, 110);
        doc.text("Grand Total: ₹1850.00", 14, 120);

        // Add Footer Note
        doc.text("Note: A visual representation of your spending categories.", 14, 140);

        // Save PDF
        doc.save(`Invoice_${DueEventPayment.id}.pdf`);
    };

    return (
        <div className='dashboard-bg w-100' >
            <ResidentSidebar />
            <Navbar />

            <div className='marginLeft'>
                <div className='container-fluid ' >
                    <div className='row p-4  ' >

                        <div className="table-responsive pb-3 " >

                            <div className='container-fluid stickyHeader' >

                                <div className='row py-3 card-row' >
                                    <div className='pe-0 bg-light'>
                                        <div className='d-flex justify-content-between align-items-center py-3 px-3'>
                                            <h3 className='mb-0 financial-income-title'>Due Event Payment</h3>
                                            <button className='set-maintainance-btn d-flex align-items-center p-md-2 px-1 py-2 mt-0' onClick={() => handleShowViewModal()}>
                                                View Invoice
                                            </button>

                                            <Modal show={showViewModal} onHide={handleCloseViewModal} centered className='square-modal'>
                                                <Modal.Header className='border-0 pb-0' closeButton>
                                                    <Modal.Title>Maintenance Invoice</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    {DueEventPayment && (
                                                        <div>

                                                            <div className="d-flex flex-column gap-2">
                                                                <div className='bg-light p-4'>
                                                                    <div className="row">
                                                                        <div className="col-6">
                                                                            <strong className='view-strong'>Invoice Id:</strong>
                                                                            <p>125465</p>
                                                                        </div>
                                                                        <div className="col-6">
                                                                            <strong className='view-strong'>Owner Name:</strong>
                                                                            <p>Terry Rhiel Madsen</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-6">
                                                                            <strong className='view-strong'>Bill Date:</strong>
                                                                            <p>10/02/2024</p>
                                                                        </div>
                                                                        <div className="col-6">
                                                                            <strong className='view-strong'>Payment Date:</strong>
                                                                            <p>10/02/2024</p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-6">
                                                                            <strong className='view-strong'>Event Date:</strong>
                                                                            <p>6549873521</p>
                                                                        </div>
                                                                        <div className="col-6">
                                                                            <strong className='view-strong'>Phone Number:</strong>
                                                                            <p>6549873521</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <strong className='view-strong'>Email:</strong>
                                                                        <p>MaryDHurst@jourrapide.com</p>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <strong className='view-strong'>Event Name:</strong>
                                                                        <p>Navratri</p>
                                                                    </div>


                                                                    <div className="col-12">
                                                                        <strong className='view-strong'>Description:</strong>
                                                                        <p>The celebration of Ganesh Chaturthi involves the installation of clay idols of Lord Ganesa in  OurResident.</p>
                                                                    </div>
                                                                </div>


                                                                <div className='bg-light p-4'>
                                                                    <div className="col-12 d-flex justify-content-between">
                                                                        <p>Maintenance Amount:</p> <p className=' text-success'> ₹ 1500.00</p>
                                                                    </div>

                                                                    <div className="col-12 d-flex justify-content-between">
                                                                        <p>Grand Total:</p> <p> ₹ 1850.00</p>
                                                                    </div>
                                                                </div>


                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <div className='bg-light p-4'>
                                                                            <strong className='view-strong'>Note:</strong>
                                                                            <p>A visual representation of your spending categories visual representation.</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <div className="text-center mt-2 mb-2">
                                                                <Button variant="warning" className="px-4 save maintainance-income-btn-bg w-100" onClick={handleDownloadInvoice}>
                                                                    <LuArrowDownSquare className='text-light me-1' />
                                                                    Download Invoice
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Modal.Body>
                                            </Modal>

                                        </div>
                                        <div className="row  px-3" style={{ borderRadius: "10px" }}>
                                            {DueEventPayment.map((val) => (
                                                <div className="col-12  col-md-6 col-xl-3 mb-3 " key={val.id}>
                                                    <div className="card">
                                                        <div className="card-header card-title text-light d-flex align-items-center justify-content-between py-3" style={{ background: "rgba(86, 120, 233, 1)" }}>
                                                            <h5 className="mb-0" style={{ fontSize: "14px" }}>
                                                                {val.title}
                                                            </h5>
                                                            <span className="badge1 Owner1">Pending</span>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                <h6 className="card-body-title mb-0">Event Name</h6>
                                                                <span className="card-body-title fw-normal">{val.name}</span>
                                                            </div>
                                                            <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                <h6 className="card-body-title mb-0">Event Due Date</h6>
                                                                <span className="card-body-title fw-normal">{val.billDate}</span>
                                                            </div>


                                                            <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                <h6 className="card-body-title mb-0"> Amount</h6>
                                                                <span className="card-body-title fw-medium text-danger">{val.amount}</span>
                                                            </div>


                                                            <Button className='btn btn-sm w-100 mainColor2 mt-2' style={{ padding: '10px 53px', borderRadius: '10px', border: '0px', fontSize: '18px', fontWeight: '600' }} onClick={handleShowPayNowModal}>Pay Now</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <Modal
                                    className="custom-modal"
                                    show={showPayNowModal}
                                    onHide={handleClosePayNowModal}
                                    centered
                                >
                                    <Modal.Title className="Modal-Title text-start p-3 pb-1">Payment Method</Modal.Title>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group>
                                                <div className="payment-option d-flex align-items-center justify-content-between">
                                                    <span>
                                                        <img src={mastercard} alt="MasterCard" className="payment-icon" /> Master Card
                                                    </span>
                                                    <Form.Check
                                                        type="radio"
                                                        id="mastercard"
                                                        name="paymentMethod"
                                                        value="mastercard"
                                                        checked={selectedPaymentMethod === "mastercard"}
                                                        onChange={handlePaymentChange}
                                                    />
                                                </div>
                                                <div className="payment-option d-flex align-items-center justify-content-between">
                                                    <span>
                                                        <img src={visa} alt="Visa Card" className="payment-icon" /> Visa Card
                                                    </span>
                                                    <Form.Check
                                                        type="radio"
                                                        id="visa"
                                                        name="paymentMethod"
                                                        value="visa"
                                                        checked={selectedPaymentMethod === "visa"}
                                                        onChange={handlePaymentChange}
                                                    />
                                                </div>
                                                <div className="payment-option d-flex align-items-center justify-content-between">
                                                    <span>
                                                        <img src={cash} alt="Cash Payment" className="payment-icon" /> Cash Payment
                                                    </span>
                                                    <Form.Check
                                                        type="radio"
                                                        id="cash"
                                                        name="paymentMethod"
                                                        value="cash"
                                                        checked={selectedPaymentMethod === "cash"}
                                                        onChange={handlePaymentChange}
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <div className="d-flex justify-content-between p-3 pt-0">
                                        <Button variant="light" className="btn-cancel mt-2 cancle" onClick={handleClosePayNowModal}>
                                            Cancel
                                        </Button>
                                        <Button variant="warning" className="btn-confirm mt-2 save" onClick={handleShowCardDetailsModal}>
                                            Pay Now
                                        </Button>
                                    </div>
                                </Modal>

                                <Modal
                                    className="custom-modal"
                                    show={showCardDetailsModal}
                                    onHide={handleCloseCardDetailsModal}
                                    centered
                                >
                                    <Modal.Title className="Modal-Title text-start p-3 pb-1">Payment Method</Modal.Title>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="mb-3">
                                                <Form.Label className='Form-Label'>Card Name<span className="text-danger"> *</span></Form.Label>
                                                <Form.Control type="text" placeholder="Enter Card Name" />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label className='Form-Label'>Card Number<span className="text-danger"> *</span></Form.Label>
                                                <Form.Control type="text" placeholder="Enter Card Number" />
                                            </Form.Group>
                                            <div className="d-flex justify-content-between">
                                                <Form.Group className="mb-2 me-2">
                                                    <Form.Label className='Form-Label'>Expiry Date<span className="text-danger"> *</span></Form.Label>
                                                    <Form.Control type="date" placeholder="MM/YY" />
                                                </Form.Group>
                                                <Form.Group className="mb-2 ms-2">
                                                    <Form.Label className='Form-Label'>CVV<span className="text-danger"> *</span></Form.Label>
                                                    <Form.Control type="text" placeholder="CVV" />
                                                </Form.Group>
                                            </div>
                                        </Form>
                                    </Modal.Body>
                                    <div className="d-flex justify-content-between p-3 pt-0">
                                        <Button variant="light" className="btn-cancel mt-2 cancle" onClick={handleCloseCardDetailsModal}>
                                            Cancel
                                        </Button>
                                        <Button variant="warning" className="btn-confirm mt-2 save">
                                            Pay Now
                                        </Button>
                                    </div>
                                </Modal>

                            </div>

                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default OtherIncomeInvoices;
