import React, { useState } from 'react';
import ResidentSidebar from "../component/layout/ResidentSidebar";
import Navbar from './Navbar';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import balance from '../assets/total-balance.png'
import balanceRactangle from '../assets/Rectangle 1063.png'
import income from '../assets/total-income.png'
import incomeRactangle from '../assets/Rectangle 1063 (1).png'
import penaltyRectangle from '../assets/penaltyRectangle.png'
import residentprofile from '../assets/resident-profile.png'
import imgIcon from '../Icons/Component 54.png'
const TenantPersonalDetails = () => {

    const [note, setNote] = useState([
        { id: 1, title: 'Arlene McCoy', email: 'Arlenemccoy@gmail.com', phoneNumber: '+91 99130 52221', age: '22', gender: 'Male', relation: 'Brother' },
        { id: 2, title: 'Arlene McCoy', email: 'Arlenemccoy@gmail.com', phoneNumber: '+91 99130 52221', age: '22', gender: 'Male', relation: 'Brother' },
        { id: 3, title: 'Arlene McCoy', email: 'Arlenemccoy@gmail.com', phoneNumber: '+91 99130 52221', age: '22', gender: 'Male', relation: 'Brother' },
        { id: 4, title: 'Arlene McCoy', email: 'Arlenemccoy@gmail.com', phoneNumber: '+91 99130 52221', age: '22', gender: 'Male', relation: 'Brother' },
    ]);

    const [vehicle, setVehicle] = useState([
        { id: 1, title: 'Two Wheelers', name: 'Splendor', vehicleNumber: 'GJ-5216' },
        { id: 2, title: 'Four Wheelers', name: 'Splendor', vehicleNumber: 'GJ-5216' },
        { id: 3, title: 'Two Wheelers', name: 'Splendor', vehicleNumber: 'GJ-5216' },
        { id: 4, title: 'Two Wheelers', name: 'Splendor', vehicleNumber: 'GJ-5216' },
    ]);

    const [maintainace, setMaintainace] = useState([
        { id: 1, title: 'Maintenance', billDate: '11/01/2024', pendingDate: '11/01/2024', maintananceAmount: '1000.00', maintenancePenaltyAmount: '250.00', grandTotal: '1,250' },
        { id: 1, title: 'Maintenance', billDate: '11/01/2024', pendingDate: '11/01/2024', maintananceAmount: '1000.00', maintenancePenaltyAmount: '250.00', grandTotal: '1,250' },
        { id: 1, title: 'Maintenance', billDate: '11/01/2024', pendingDate: '11/01/2024', maintananceAmount: '1000.00', maintenancePenaltyAmount: '250.00', grandTotal: '1,250' },
    ]);

    const [announcement, setAnnouncement] = useState([
        { id: 1, title: 'Community Initiatives', date: '01/02/2024', time: '10:15 AM', des: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in.' },
        { id: 2, title: 'Community Initiatives', date: '01/02/2024', time: '10:15 AM', des: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in.' },
        { id: 3, title: 'Community Initiatives', date: '01/02/2024', time: '10:15 AM', des: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in.' },
        { id: 4, title: 'Community Initiatives', date: '01/02/2024', time: '10:15 AM', des: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in.' },
    ]);

    const handleViewFile = (file) => {
        window.open(file);
    };


    return (
        <div className='dashboard-bg w-100' >
            <ResidentSidebar />
            <Navbar />
            <div className='marginLeft'>

                <div className='container-fluid income stickyHeader' >

                    <div className='row p-4 pe-3'>

                        <div className="table-responsive rounded pb-3">

                            <Link to="/personal-details" className='btn btn-sm  maintainance-income-btn maintainance-income-btn-withoutbg'>Owner</Link>

                            <Link to="/personal-details-tenant" className='btn btn-sm  maintainance-income-btn  maintainance-income-btn-bg'>Tenant</Link>

                            <div className='container-fluid'>

                                <div className="row card-row rounded mb-3">
                                    <div className="p-0 bg-light rounded d-md-flex">

                                        <div className='px-4 py-2 pt-3 col-12 col-md-2'>
                                            <h6>Owner Name</h6>
                                            <p className="text-gray">Arlene McCoy</p>
                                        </div>
                                        <div className='px-4 py-2 pt-3 col-12 col-md-2'>
                                            <h6>Owner Phone</h6>
                                            <p className="text-gray">+91 9575225165</p>
                                        </div>
                                        <div className='px-4 py-2 pt-3 col-12 col-md-3'>
                                            <h6>Owner Address</h6>
                                            <p className="text-gray">C-101,Dhara Arcade , Mota Varacha Surat.</p>
                                        </div>

                                    </div>
                                </div>

                                <div className="row card-row rounded mb-3">
                                    <div className="p-0 bg-light d-flex flex-wrap align-items-center rounded">

                                        <div className="col-12 col-md-2 px-3 py-3 text-left text-md-center">
                                            <img src={residentprofile} alt="Resident Profile" className="img-fluid rounded-circle" />
                                        </div>


                                        <div className="col-12 col-md-7 text-start px-3">
                                            <div className="row">
                                                <div className="col-6 col-sm-6 col-lg-3 mb-2">
                                                    <h6>Full Name</h6>
                                                    <p className="text-gray">Arlene McCoy</p>
                                                </div>
                                                <div className="col-6 col-sm-6 col-lg-3 mb-2">
                                                    <h6>Phone Number</h6>
                                                    <p className="text-gray">+91 99130 44537</p>
                                                </div>
                                                <div className="col-6 col-sm-6 col-lg-3 mb-2">
                                                    <h6>Email Address</h6>
                                                    <p className="text-gray">ArleneMcCoy25@gmail.com</p>
                                                </div>
                                                <div className="col-6 col-sm-6 col-lg-3 mb-2">
                                                    <h6>Gender</h6>
                                                    <p className="text-gray">Male</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6 col-sm-6 col-lg-3 mb-2">
                                                    <h6>Wing</h6>
                                                    <p className="text-gray">A</p>
                                                </div>
                                                <div className="col-6 col-sm-6 col-lg-3 mb-2">
                                                    <h6>Age</h6>
                                                    <p className="text-gray">20</p>
                                                </div>
                                                <div className="col-6 col-sm-6 col-lg-3 mb-2">
                                                    <h6>Unit</h6>
                                                    <p className="text-gray">1001</p>
                                                </div>
                                                <div className="col-6 col-sm-6 col-lg-3 mb-2">
                                                    <h6>Relation</h6>
                                                    <p className="text-gray">Father</p>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-12 col-md-3 pt-3 d-flex justify-content-md-end justify-content-left justify-content-md-center">
                                            <div>
                                                <button
                                                    onClick={() => handleViewFile()}
                                                    className="bg-light py-2 px-3 border-0 text-start w-100"
                                                >

                                                    <div className="d-flex align-items-center mb-3 bg-light py-2 px-3 border rounded">
                                                        <div className="text-primary pe-3"><img src={imgIcon} /></div>
                                                        <div>
                                                            <p className="font-semibold text-gray-800 text-lg mb-0">
                                                                Essential Aadharcard Front Side.JPG
                                                            </p>
                                                            <p className="text-sm text-gray-600 mb-0">
                                                                3.5 MB
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex align-items-center mb-3 bg-light py-2 px-3 border rounded">
                                                        <div className="text-primary pe-3"><img src={imgIcon} /></div>
                                                        <div>
                                                            <p className="font-semibold text-gray-800 text-lg mb-0">
                                                                Essential Aadharcard Front Side.JPG
                                                            </p>
                                                            <p className="text-sm text-gray-600 mb-0">
                                                                3.5 MB
                                                            </p>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className='row py-3 card-row rounded'>
                                    <div className='pe-0 bg-light'>
                                        <div className=' py-3 px-3'>
                                            <h3 className='mb-0 financial-income-title'>Member : (04)</h3>
                                        </div>
                                        <div className="row  px-3">
                                            {note.map((val, index) => (
                                                <div className="col-lg-3 mb-3 " key={val.id}>
                                                    <div className="card">
                                                        <div className="card-header card-title text-light d-flex align-items-center justify-content-between py-3" style={{ background: "rgba(86, 120, 233, 1)" }}>
                                                            {val.title}
                                                        </div>
                                                        <div className="card-body">
                                                            <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                <h6 className="card-body-title mb-0">Email</h6>
                                                                <span className="card-body-title text-dark fw-medium">{val.email}</span>
                                                            </div>
                                                            <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                <h6 className="card-body-title mb-0">Phone Number</h6>
                                                                <span className="card-body-title text-dark fw-medium">{val.phoneNumber}</span>
                                                            </div>
                                                            <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                <h6 className="card-body-title mb-0">Age</h6>
                                                                <span className="card-body-title text-dark fw-medium">{val.age}</span>
                                                            </div>
                                                            <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                <h6 className="card-body-title mb-0">Gender</h6>
                                                                <span className="card-body-title text-dark fw-medium">{val.gender}</span>
                                                            </div>
                                                            <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                <h6 className="card-body-title mb-0">Relation</h6>
                                                                <span className="card-body-title text-dark fw-medium">{val.relation}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className='row py-3 card-row rounded'>
                                    <div className='pe-0 bg-light'>
                                        <div className=' py-3 px-3'>
                                            <h3 className='mb-0 financial-income-title'>Vehicle : (04)</h3>
                                        </div>
                                        <div className="row  px-3">
                                            {vehicle.map((val, index) => (
                                                <div className="col-lg-3 mb-3 " key={val.id}>
                                                    <div className="card">
                                                        <div className="card-header card-title text-light d-flex align-items-center justify-content-between py-3" style={{ background: "rgba(86, 120, 233, 1)" }}>
                                                            {val.title}
                                                        </div>
                                                        <div className="card-body">
                                                            <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                <h6 className="card-body-title mb-0">Vehicle Name</h6>
                                                                <span className="card-body-title text-dark fw-medium">{val.name}</span>
                                                            </div>
                                                            <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                <h6 className="card-body-title mb-0">Vehicle Number</h6>
                                                                <span className="card-body-title text-dark fw-medium">{val.vehicleNumber}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="amount-card mt-3">
                                    <div>
                                        <h3 className="mb-0 financial-income-title 
                                        mb-3 mb-md-0">Show Maintenance Details</h3>
                                    </div>
                                    <div className="row d-flex">
                                        <div className="col-12 col-md-6 owner-card">
                                            <div className="card ps-4 py-3 border-0 border-card" style={{ boxShadow: '0px 0px 40px 0px #0000000F' }}>
                                                <img src={incomeRactangle} width={8} className="position-absolute start-0" />
                                                <div>
                                                    <h6 className="card-subtitle mb-1">Maintenance Amount</h6>
                                                    <p className="mb-0 text-success">₹ 1,500</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 owner-card">
                                            <div className="card px-4 py-3 border-0 border-card" style={{ boxShadow: '0px 0px 40px 0px #0000000F' }}>
                                                <img src={balanceRactangle} width={8} className="position-absolute start-0" />
                                                <div>
                                                    <h6 className="card-subtitle mb-1">Penalty Amount</h6>
                                                    <p className="mb-0 text-danger">₹ 500</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='row py-3 card-row rounded'>
                                    <div className='pe-0 bg-light'>
                                        <div className=' py-3 px-3'>
                                            <h3 className='mb-0 financial-income-title'>Pending Maintanance</h3>
                                        </div>
                                        <div className="row  px-3">
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
                                                                <span className="card-body-title text-dark fw-medium">{val.billDate}</span>
                                                            </div>
                                                            <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                <h6 className="card-body-title mb-0">Pending Date </h6>
                                                                <span className="card-body-title text-dark fw-medium">{val.pendingDate}</span>
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
                                                                <h6 className="card-body-title mb-0">Grand Total</h6>
                                                                <span className="card-body-title text-success fw-medium">{val.grandTotal}</span>
                                                            </div>

                                                            <Button className='btn btn-sm w-100 mainColor2 mt-2' style={{ padding: '10px 53px', borderRadius: '10px', border: '0px', fontSize: '18px', fontWeight: '600' }}>Pay Now</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className='row py-3 card-row rounded'>
                                    <div className='pe-0 bg-light'>
                                        <div className=' py-3 px-3'>
                                            <h3 className='mb-0 financial-income-title'>Announcement Details</h3>
                                        </div>
                                        <div className="row  px-3">
                                            {announcement.map((val, index) => (
                                                <div className="col-lg-3 mb-3 " key={val.id}>
                                                    <div className="card">
                                                        <div className="card-header card-title text-light d-flex align-items-center justify-content-between py-3" style={{ background: "rgba(86, 120, 233, 1)" }}>
                                                            {val.title}
                                                        </div>
                                                        <div className="card-body">
                                                            <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                <h6 className="card-body-title mb-0">Announcement Date</h6>
                                                                <span className="card-body-title text-dark fw-medium">{val.date}</span>
                                                            </div>
                                                            <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                <h6 className="card-body-title mb-0">Announcement Time</h6>
                                                                <span className="card-body-title text-dark fw-medium">{val.time}</span>
                                                            </div>
                                                            <h6 className="card-body-title mb-0">Description</h6>
                                                            <span className="card-body-title text-dark fw-medium">{val.des}</span>
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
                </div>
            </div>
        </div>
    )
}

export default TenantPersonalDetails