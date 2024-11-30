import React, { useState } from 'react'
import ResidentSidebar from '../layout/ResidentSidebar'
import Navbar from '../Navbar';
import balanceRactangle from '../../assets/Rectangle 1063.png'
import incomeRactangle from '../../assets/Rectangle 1063 (1).png'
import { Modal, Button, Form } from 'react-bootstrap';
import visa from '../../assets/visa-logo.png'
import mastercard from '../../assets/mastercard-logo.png'
import cash from '../../assets/cash-logo.png'
import { Link } from 'react-router-dom';


const MaintenanceInvoices = () => {

    const [maintainace, setMaintainace] = useState([
        { id: 1, title: 'Maintenance', billDate: '11/01/2024', pendingDate: '11/01/2024', maintananceAmount: '1000.00', maintenancePenaltyAmount: '250.00', grandTotal: '1,250' },
        { id: 2, title: 'Maintenance', billDate: '11/01/2024', pendingDate: '11/01/2024', maintananceAmount: '1000.00', maintenancePenaltyAmount: '250.00', grandTotal: '1,250' },
        { id: 3, title: 'Maintenance', billDate: '11/01/2024', pendingDate: '11/01/2024', maintananceAmount: '1000.00', maintenancePenaltyAmount: '250.00', grandTotal: '1,250' },
    ]);

    const [dueMaintainace, setdueMaintainace] = useState([
        { id: 1, title: 'Maintenance', Date: '11/01/2024', amt: '1000.00', duemaintananceAmount: '250.00' },
        { id: 2, title: 'Maintenance', Date: '11/01/2024', amt: '1000.00', duemaintananceAmount: '250.00' },
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

    return (
        <div className='dashboard-bg w-100' >
            <ResidentSidebar />
            <Navbar />

            <div style={{ marginLeft: '300px' }}>
                <div className='container-fluid stickyHeader'>
                    <div className='row p-4 '>
                        
                            <div className="table-responsive rounded pb-3" >

                                <div className='container-fluid' >

                                    <div className="row py-3 card-row bg-light " style={{borderRadius:"10px"}}>
                                        <div className='align-items-center d-flex' >
                                            <div className='col-12 col-sm-6 col-md-3'>
                                                <h5 className="mb-0 financial-income-title p-3">Show Maintenance Details</h5>
                                            </div>
                                            <div className='d-flex w-100 justify-content-end'>
                                                {/* Maintenance Amount Card */}
                                                <div className="col-12 col-sm-6 col-md-3 pt-3 px-1">
                                                    <div className="card">
                                                        <div className="card-body d-flex justify-content-between align-items-center px-4 py-3">
                                                            <img src={incomeRactangle} width={8} className="position-absolute start-0" />
                                                            <div>
                                                                <h6 className="card-subtitle mb-1">Maintenance Amount</h6>
                                                                <p className="mb-0 text-success">₹ 1,500</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Penalty Amount Card */}
                                                <div className="col-12 col-sm-6 col-md-3 pt-3 px-1">
                                                    <div className="card">
                                                        <div className="card-body d-flex justify-content-between align-items-center px-4 py-3">
                                                            <img src={balanceRactangle} width={8} className="position-absolute start-0" />
                                                            <div>
                                                                <h6 className="card-subtitle mb-1">Penalty Amount</h6>
                                                                <p className="mb-0 text-danger">₹ 500</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row py-3 card-row rounded'>
                                        <div className='pe-0 bg-light'>
                                            <div className='d-flex justify-content-between align-items-center py-3 px-3'>
                                                <h3 className='mb-0 financial-income-title'>Pending Maintanance</h3>
                                                <Link to="/view-invoice" className='text-decoration-none'><button className='set-maintainance-btn d-flex align-items-center p-2'>
                                                    View Invoice
                                                </button></Link>
                                            </div>
                                            <div className="row  px-3" style={{borderRadius:"10px"}}>
                                                {maintainace.map((val, index) => (
                                                    <div className="col-lg-3 mb-3 " key={val.id}>
                                                        <div className="card">
                                                            <div className="card-header card-title text-light d-flex align-items-center justify-content-between py-3" style={{ background: "rgba(86, 120, 233, 1)" }}>
                                                                <h5 className="mb-0" style={{ fontSize: "14px" }}>
                                                                    {val.title}
                                                                </h5>
                                                                <span className="badge1 Owner1">Pending</span>
                                                            </div>
                                                            <div className="card-body">
                                                                <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                    <h6 className="card-body-title mb-0">Bill Date</h6>
                                                                    <span className="card-body-title fw-normal">{val.billDate}</span>
                                                                </div>
                                                                <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                    <h6 className="card-body-title mb-0">Pending Date </h6>
                                                                    <span className="card-body-title fw-normal">{val.pendingDate}</span>
                                                                </div>
                                                                <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                    <h6 className="card-body-title mb-0">Maintanance Amount</h6>
                                                                    <span className="card-body-title text-danger fw-medium">{val.maintananceAmount}</span>
                                                                </div>
                                                                <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                    <h6 className="card-body-title mb-0">Maintenance Penalty Amount</h6>
                                                                    <span className="card-body-title fw-medium text-danger">{val.maintenancePenaltyAmount}</span>
                                                                </div>
                                                                <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                    <h6 className="card-body-title mb-0 text-dark fw-medium">Grand Total</h6>
                                                                    <span className="card-body-title text-success fw-medium">{val.grandTotal}</span>
                                                                </div>

                                                                <Button className='btn btn-sm w-100 mainColor2 mt-2' style={{ padding: '10px 53px', borderRadius: '10px', border: '0px', fontSize: '18px', fontWeight: '600' }} onClick={handleShowPayNowModal}>Pay Now</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>


                                    <div className='row py-3 card-row rounded'>
                                        <div className='pe-0 bg-light'>
                                            <div className='py-3 px-3'>
                                                <h3 className='mb-0 financial-income-title'>Due Maintanance</h3>
                                            </div>
                                            <div className="row  px-3">
                                                {dueMaintainace.map((val, index) => (
                                                    <div className="col-lg-3 mb-3 " key={val.id}>
                                                        <div className="card">
                                                            <div className="card-header card-title text-light d-flex align-items-center justify-content-between py-3" style={{ background: "rgba(86, 120, 233, 1)" }}>
                                                                <h5 className="mb-0" style={{ fontSize: "14px" }}>
                                                                    {val.title}
                                                                </h5>
                                                                <span className="badge1 Owner1">Pending</span>
                                                            </div>
                                                            <div className="card-body">
                                                                <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                    <h6 className="card-body-title mb-0">Date</h6>
                                                                    <span className="card-body-title fw-normal">{val.Date}</span>
                                                                </div>
                                                                <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                    <h6 className="card-body-title mb-0">Amount</h6>
                                                                    <span className="card-body-title text-danger fw-medium">{val.amt}</span>
                                                                </div>
                                                                <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                    <h6 className="card-body-title mb-0">Due

                                                                        Maintanance Amount</h6>
                                                                    <span className="card-body-title text-danger fw-medium">{val.duemaintananceAmount}</span>
                                                                </div>

                                                                <Button className='btn btn-sm w-100 mainColor2 mt-2' style={{ padding: '10px 53px', borderRadius: '10px', border: '0px', fontSize: '18px', fontWeight: '600' }} onClick={handleShowPayNowModal}>Pay Now</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Modal */}
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

export default MaintenanceInvoices
