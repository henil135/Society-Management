import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import Header from './Navbar';
import { LuImagePlus } from 'react-icons/lu';
import camera from '../assets/camera.png'
const OwnerForm = () => {
    
    const [profilePhoto, setProfilePhoto] = useState(null); // State for profile photo preview
    const [profilePhotoError, setProfilePhotoError] = useState(false); // State for photo error validation
    const [uploadedFiles, setUploadedFiles] = useState({}); // State for uploaded files preview
    const [memberCount, setMemberCount] = useState(0); // Default is 0, no member forms are visible initially
    const [members, setMembers] = useState([]); // Start with an empty array of members
    const [vehicleCount, setVehicleCount] = useState(0); // Default is 0, no vehicle forms are visible initially
    const [vehicles, setVehicles] = useState([]); // Start with an empty array of vehicles
    const [activeButton, setActiveButton] = useState(''); // State to track active button
    const [formType, setFormType] = useState('owner');
  const navigate = useNavigate(); // Initialize navigate for redirection

  // Handler for button click
  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType); // Update the active button based on click

    // Navigate based on the button type
    if (buttonType === 'owner') {
      // Do something when Owner button is clicked (if any)
    } else if (buttonType === 'tenant') {
      navigate('/tenant-form'); // Navigate to the Tenant form
    }
  };

    // Handle member count change
    const handleMemberCountChange = (event) => {
        const count = parseInt(event.target.value);
        setMemberCount(count);

        // Update members array based on count
        if (count > 0) {
            const updatedMembers = Array(count).fill({}); // Create an array with `count` number of member objects
            setMembers(updatedMembers);
        } else {
            setMembers([]); // If count is 0, clear the members array
        }
    };

   

    // Handle vehicle count change
    const handleVehicleCountChange = (event) => {
        const count = parseInt(event.target.value);
        setVehicleCount(count);

        // Update vehicles array based on count
        if (count > 0) {
            const updatedVehicles = Array(count).fill({}); // Create an array with `count` number of vehicle objects
            setVehicles(updatedVehicles);
        } else {
            setVehicles([]); // If count is 0, clear the vehicles array
        }
    };

    // Handle input change for each member form
    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedMembers = [...members];
        updatedMembers[index] = {
            ...updatedMembers[index],
            [name]: value,
        };
        setMembers(updatedMembers);
    };

    // Handle input change for each vehicle form
    const handleVehicleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedVehicles = [...vehicles];
        updatedVehicles[index] = {
            ...updatedVehicles[index],
            [name]: value,
        };
        setVehicles(updatedVehicles);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleTenantRedirect = () => {
        navigate("/tenant-form");
    };

    const onProfilePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePhoto(reader.result);
                setProfilePhotoError(false); // Clear error if image is uploaded
            };
            reader.readAsDataURL(file);
        }
    };

    const onFileChange = (e, fileType) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFiles((prev) => ({
                ...prev,
                [fileType]: file.name, // Save file name for preview
            }));
        }
    };

    const onSubmit = (data) => {
        if (!profilePhoto) {
            setProfilePhotoError(true); // Show error if profile photo is not uploaded
            return;
        }
        console.log("Form Data:", data);
        alert("Form submitted successfully!");
    };



    return (
        <div className="d-flex flex-column flex-md-row">
            <div className="flex-shrink-0">
                <Sidebar />
            </div>
            <div className="dashboard-bg " style={{ width: "1900px", marginTop: "109px" }}>
                <div>
                    <Header />
                </div>
                <div
                   
                    style={{ maxWidth: '1540px', marginLeft: "330px" }}
                >
                    <div >
                        <button
                           className={`btn btn-sm maintainance-income-btn ${
                            formType === 'owner' ? 'maintainance-income-btn-active' : 'maintainance-income-btn-withoutbg'
                          }`}
                            onClick={() => handleButtonClick('owner')} // Set active to 'owner' when clicked
                        >
                            Owner
                        </button>
                        <button
                            className={` btn btn-sm maintainance-income-btn ${activeButton === 'tenant' ? 'maintainance-income-btn-active' : 'maintainance-income-btn-withoutbg'
                                }`}
                            onClick={() => handleButtonClick('tenant')} // Set active to 'tenant' when clicked
                        >
                            Tenant
                        </button>
                    </div>
                    </div>
                <div
                    className="container p-5"
                    style={{ maxWidth: '1540px', marginLeft: "330px" }}
                >
                 
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="d-flex flex-wrap mb-3">
                            <div className="col-md-1 d-flex mb-3">
                                <label htmlFor="photo-upload" style={{ cursor: 'pointer' }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                borderRadius: "50%",
                                                background: "#D3D3D3",
                                                overflow: "hidden",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                border: "2px solid #ddd",
                                            }}
                                        >
                                            {profilePhoto ? (
                                                <img
                                                    src={profilePhoto}
                                                    alt="Profile Preview"
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                />
                                            ) : (
                                                <img src={camera}  />
                                            )}
                                        </div>
                                        <div className='text-center p-2' style={{ color: "#007bff" }}>
                                            Add Photo
                                        </div>
                                    </div>
                                </label>
                                <input
                                    id="photo-upload"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    style={{ display: 'none' }}
                                    {...register('photo', { required: 'Photo is required' })}
                                    onChange={onProfilePhotoChange}
                                />
                                {errors.photo && (
                                    <div className="invalid-feedback d-block">{errors.photo.message}</div>
                                )}
                            </div>

                            <div className="col-md-11">
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label>Full Name<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                                            {...register('fullName', { required: 'Full Name is required' })}
                                        />
                                        {errors.fullName && (
                                            <div className="invalid-feedback">{errors.fullName.message}</div>
                                        )}
                                    </div>
                                    <div className="col-md-4">
                                        <label>Phone Number<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                                            {...register('phoneNumber', {
                                                required: 'Phone Number is required',
                                                pattern: {
                                                    value: /^[0-9]{10}$/,
                                                    message: 'Enter a valid 10-digit phone number',
                                                },
                                            })}
                                        />
                                        {errors.phoneNumber && (
                                            <div className="invalid-feedback">{errors.phoneNumber.message}</div>
                                        )}
                                    </div>
                                    <div className="col-md-4">
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            className={`form-control ${errors.emailAddress ? 'is-invalid' : ''}`}
                                            {...register('emailAddress', {
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                    message: 'Enter a valid email address',
                                                },
                                            })}
                                        />
                                        {errors.emailAddress && (
                                            <div className="invalid-feedback">{errors.emailAddress.message}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-2">
                                        <label>Age<span className="text-danger">*</span></label>
                                        <input
                                            type="number"
                                            className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                                            {...register('age', {
                                                required: 'Age is required',
                                                min: { value: 18, message: 'Minimum age is 18' },
                                            })}
                                        />
                                        {errors.age && (
                                            <div className="invalid-feedback">{errors.age.message}</div>
                                        )}
                                    </div>
                                    {/* Rest of the form stays the same */}
                                    <div className="col-md-2">
                                        <label>Gender<span className="text-danger">*</span></label>
                                        <select
                                            className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                                            {...register('gender', { required: 'Gender is required' })}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {errors.gender && (
                                            <div className="invalid-feedback">{errors.gender.message}</div>
                                        )}
                                    </div>
                                    <div className="col-md-2">
                                        <label>Wing<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.wing ? 'is-invalid' : ''}`}
                                            {...register('wing', { required: 'Wing is required' })}
                                        />
                                        {errors.wing && (
                                            <div className="invalid-feedback">{errors.wing.message}</div>
                                        )}
                                    </div>
                                    <div className="col-md-3">
                                        <label>Unit<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.unit ? 'is-invalid' : ''}`}
                                            {...register('unit', { required: 'Unit is required' })}
                                        />
                                        {errors.unit && (
                                            <div className="invalid-feedback">{errors.unit.message}</div>
                                        )}
                                    </div>
                                    <div className="col-md-3">
                                        <label>Relation<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.relation ? 'is-invalid' : ''}`}
                                            {...register('relation', { required: 'Relation is required' })}
                                        />
                                        {errors.relation && (
                                            <div className="invalid-feedback">{errors.relation.message}</div>
                                        )}
                                    </div>
                                </div>


                            </div>
                        </div>

                        <div className="row mb-3">
                            {['aadharFront', 'aadharBack', 'addressProof', 'rentAgreement'].map((fileType, index) => (
                                <div className="col-md-3" key={index}>
                                    <label>
                                        {fileType === 'aadharFront' && 'Upload Aadhar Card (Front Side)'}
                                        {fileType === 'aadharBack' && 'Upload Aadhar Card (Back Side)'}
                                        {fileType === 'addressProof' && 'Address Proof (Vera Bill / Light Bill)'}
                                        {fileType === 'rentAgreement' && 'Rent Agreement'}
                                    </label>
                                    <div
                                        className="text-center"
                                        style={{
                                            border: "2px dashed rgba(211, 211, 211, 1)",
                                            borderRadius: "8px",
                                            padding: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flexDirection: "column",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <label htmlFor={`${fileType}-upload`} style={{ cursor: 'pointer', color: '#007bff' }}>
                                            <LuImagePlus
                                                className="text-center"
                                                style={{
                                                    fontSize: '24px',
                                                    marginBottom: '8px',
                                                    width: '40px',
                                                    height: '50px',
                                                    color: "rgba(167, 167, 167, 1)",
                                                }}
                                            />
                                            <div>Upload a file <span style={{ color: "black" }}>or drag and drop</span></div>
                                            {uploadedFiles[fileType] && (
                                                <div className="mt-2 text-success">{uploadedFiles[fileType]}</div>
                                            )}
                                        </label>
                                        <small className="text-muted">PNG, JPG, GIF, PDF up to 10MB</small>
                                        <input
                                            id={`${fileType}-upload`}
                                            type="file"
                                            accept="image/png, image/jpeg, application/pdf"
                                            style={{ display: 'none' }}
                                            {...register(fileType, { required: `${fileType.replace(/([A-Z])/g, ' $1')} is required` })}
                                            onChange={(e) => onFileChange(e, fileType)}
                                        />
                                        {errors[fileType] && (
                                            <div className="invalid-feedback d-block">{errors[fileType].message}</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </form>
                </div>
                <div className="container p-4" style={{ maxWidth: "1540px", marginLeft: "330px", marginTop: "20px" }}>
                    <form>
                        {/* Member Count */}
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label style={{ fontWeight: "bold", fontSize: "16px", color: "#333" }}>
                                    Member Counting:
                                    <span style={{ color: "#aaa", marginLeft: "8px" }}>(Other Members)</span>
                                </label>
                            </div>
                            <div className="col-md-6 text-end">
                                <label style={{ fontWeight: "bold", fontSize: "16px", color: "#333", marginRight: "10px" }}>
                                    Select Member Count
                                </label>
                                <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "4px", padding: "4px", cursor: "pointer" }}>
                                    <input
                                        type="number"
                                        className="form-control"
                                        min="0"
                                        placeholder="Enter Member Count"
                                        value={memberCount}
                                        onChange={handleMemberCountChange}
                                        style={{ width: "60px", border: "none", appearance: "none", background: "none", fontSize: "14px", color: "#333", outline: "none" }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Member Entry Fields */}
                        {members.map((_, index) => (
                            <div key={index} className="row mb-3">
                                <div className="col-md-2">
                                    <label>Full Name<span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="fullName"
                                        placeholder="Enter Full Name"
                                        onChange={(event) => handleInputChange(index, event)}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <label>Phone No<span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        placeholder="+91"
                                        onChange={(event) => handleInputChange(index, event)}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Enter Email Address"
                                        onChange={(event) => handleInputChange(index, event)}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <label>Age<span className="text-danger">*</span></label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="age"
                                        placeholder="Enter Age"
                                        onChange={(event) => handleInputChange(index, event)}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <label>Gender<span className="text-danger">*</span></label>
                                    <select
                                        className="form-control"
                                        name="gender"
                                        onChange={(event) => handleInputChange(index, event)}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="col-md-2">
                                    <label>Relation<span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="relation"
                                        placeholder="Enter Relation"
                                        onChange={(event) => handleInputChange(index, event)}
                                    />
                                </div>
                            </div>
                        ))}
                    </form>
                </div>

                {/* Vehicle Count Section */}
                <div className="container p-4" style={{ maxWidth: "1540px", marginLeft: "330px", marginTop: "20px" }}>
                    <form>
                        {/* Vehicle Count */}
                        <div className="row  align-items-center">
                            <div className="col-md-6">
                                <label style={{ fontWeight: "bold", fontSize: "16px", color: "#333" }}>Vehicle Counting:</label>
                            </div>
                            <div className="col-md-6 text-end">
                                <div style={{ display: 'inline-block', position: 'relative' }}>
                                    <label style={{ fontWeight: 'bold', fontSize: '16px', color: '#333', marginRight: '10px' }}>Select Vehicle</label>
                                    <div
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            padding: '4px 8px',
                                            cursor: 'pointer',
                                            marginBottom: "10px"
                                        }}>
                                        <input
                                            type="number"
                                            className="form-control"
                                            min="0"
                                            placeholder="Enter Member Count"
                                            value={vehicleCount}
                                            onChange={handleVehicleCountChange}
                                            style={{ width: "60px", border: "none", appearance: "none", background: "none", fontSize: "14px", color: "#333", outline: "none" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vehicle Entry Fields */}
                        {vehicles.map((_, index) => (
                            <div key={index} className="row ">
                                <div className="col-md-6 mb-4" style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "5px", backgroundColor: "#fff" }}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label style={{ fontWeight: "bold" }}>Vehicle Type*</label>
                                            <select
                                                name="vehicleType"
                                                className="form-control"
                                                required
                                                onChange={(event) => handleVehicleInputChange(index, event)}

                                            >
                                                <option value="">Select Vehicle Type</option>
                                                <option value="Two Wheeler">Two Wheeler</option>
                                                <option value="Four Wheeler">Four Wheeler</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4">
                                            <label style={{ fontWeight: "bold" }}>Vehicle Name</label>
                                            <input
                                                type="text"
                                                name="vehicleName"
                                                className="form-control"
                                                placeholder="Enter Name"
                                                onChange={(event) => handleVehicleInputChange(index, event)}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label style={{ fontWeight: "bold" }}>Vehicle Number</label>
                                            <input
                                                type="text"
                                                name="vehicleNumber"
                                                className="form-control"
                                                placeholder="Enter Number"
                                                onChange={(event) => handleVehicleInputChange(index, event)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </form>
                </div>

                <div className="container-fluid " style={{ maxWidth: '1540px', marginLeft: "330px", marginTop: '15px' }}>
                    <form>
                        <div className="d-flex justify-content-end gap-2 ">
                            <button type="button" className="cancle" style={{ border: "1px solid #202224", padding: "10px ", borderRadius: "10px", background: "#FFFFFF", color: "#202224", }}  >Cancel</button>
                            <button type="submit" className="save" style={{ borderRadius: "10px", padding: "10px" }}>Create</button>
                        </div>
                    </form>
                </div>



            </div>
        </div>
    );
};

export default OwnerForm;
