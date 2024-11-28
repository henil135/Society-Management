import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../index.css';
import signupimg2 from '../assets/signup-img2.png';
import signupimg from '../assets/signup-img.png';
import { HiMiniEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Logo from './Logo';
// import { Register } from '../services/authentication';


export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: registerNewSociety, handleSubmit: handleNewSubmit, formState: { errors: newSocietyErrors } } = useForm();
    const [formData, setUserData] = useState({
        First_Name: "",
        Last_Name: "",
        Email_Address: "",
        Phone_Number: "",
        Country: "",
        State: "",
        City: "",
        select_society: "",
        Password: "",
        Confirm_password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...formData, [name]: value })
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const Navigate = useNavigate()
    // const [isLoading,setIsLoading] = useState(false)
    const [societies, setSocieties] = useState({
        Society_name: "",
        Society_address: "",
        Country: "",
        State: "",
        City: "",
        ZipCode: "",
    }); // State for societies list

    // const handleCreateSociety=async(e)=>{
    //     e.preventDefault();
    //     setIsLoading(true);
    //     try {
    //         const response= await CreateSociety(societies);
    //         console.log(response.data.message);
    //         fetchSocieties();
    //         setShowModal(true)
    //     } catch (error) {
    //         console.log(error.response.message);
    //     }finally{
    //         setSocieties({
    //             Society_name:"",
    //             Society_address:"",
    //             Country:"",
    //             State:"",
    //             City:"",
    //             ZipCode:""
    //         })
    //         setIsLoading(false)
    //     }

    // }
    const societySubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/Registration', data);
            console.log(response.data);
            Navigate("/login")
        } catch (error) {
            console.log(error);
        } finally {
            setUserData({
                First_Name: "",
                Last_Name: "",
                Email_Address: "",
                Phone_Number: "",
                Country: "",
                State: "",
                City: "",
                select_society: "",
                Password: "",
                Confirm_password: "",
            })
        }
    }

    const createnewSociety = () => {
        console.log("Creating new society...");
        setShowForm(true);
    };
    // const onSubmit = async (data) => {
    //     await axios.post('http://localhost:5000/api/v1/Registration', data).then((res) => {
    //         console.log(res)
    //     })
    // };

    const handleNewSocietySubmit = async (newdata) => {
        try {
            const res = await axios.post('http://localhost:5000/api/societies/create', newdata);
            console.log('Response:', res.data);

            // Update societies list after successfully creating a new society
            setSocieties((prevSocieties) => [...prevSocieties, res.data]);

            // Hide the form after success
            setShowForm(false);
        } catch (error) {
            console.error('Error creating society:', error);
        }
    };

    useEffect(() => {
        const fetchSocieties = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/societies/');
                if (response.data.success) {
                    setSocieties(response.data.data); // Extract the data array
                } else {
                    console.error('API request failed:', response.data);
                    setSocieties([]);
                }
            } catch (error) {
                console.error('Error fetching societies:', error);
                setSocieties([]);
            }
        };
        fetchSocieties();
    }, []);
    // const fetchSocieties = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5000/api/societies/');
    //         setSocieties(response.data); // Update based on API structure
    //         console.log('Societies Response:', response.data);
    //     } catch (error) {
    //         console.error('Error fetching societies:', error);
    //         setSocieties([]); // Ensure societies is always an array
    //     }
    // };
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
    const toggleTermsAccepted = () => setTermsAccepted(!termsAccepted);

    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <div className="d-flex flex-column flex-md-row min-vh-100 position-relative">
            {/* Left Side: Image */}
            <div className="signup-img  d-flex flex-column align-items-left" style={{ width: "950px" }}>

                <div className='stack mt-5 '>

                    <Logo />
                </div>

                {/* Center the image vertically in the remaining space */}
                <div className='d-flex align-items-center justify-content-center flex-grow-1'>
                    <img
                        src={showForm ? signupimg2 : signupimg}
                        alt="Society"
                        style={{ opacity: showForm ? 0.6 : 1 }}
                    />
                </div>

            </div>

            {/* Right Side: Form */}
            <div className="signup-form  d-flex align-items-center justify-content-center py-5" style={{ opacity: showForm ? 0.6 : 1, width: "950px" }}>
                <div className="form bg-white p-4 rounded shadow">
                    <h2 className="h4 font-weight-bold mb-4 text-left">Registration</h2>
                    <form onSubmit={handleSubmit(societySubmit)}>
                        {/* First Name, Last Name */}
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label>First Name <span className="text-danger">*</span></label>
                                    <input
                                        type='text'
                                        className="form-control"
                                        placeholder='Enter First Name'
                                        {...register('First_Name', { required: 'First Name is required' })}
                                        onChange={handleChange}
                                    />
                                    {errors.First_Name && <p className="text-danger">{errors.First_Name.message}</p>}
                                </div>
                            </div>

                            <div className="col">
                                <div className="form-group">
                                    <label>Last Name <span className="text-danger">*</span></label>
                                    <input
                                        type='text'
                                        className="form-control"
                                        placeholder='Enter Last Name'
                                        {...register('Last_Name', { required: 'Last Name is required' })}
                                    />
                                    {errors.Last_Name && <p className="text-danger">{errors.Last_Name.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Email Address, Phone Number */}
                        <div className="row mt-3">
                            <div className="col">
                                <div className="form-group">
                                    <label>Email Address <span className="text-danger">*</span></label>
                                    <input
                                        className="form-control"
                                        placeholder='Enter Email Address'
                                        type="email"
                                        {...register('Email_Address', { required: 'Email is required' })}
                                    />
                                    {errors.Email_Address && <p className="text-danger">{errors.Email_Address.message}</p>}
                                </div>
                            </div>

                            <div className="col">
                                <div className="form-group">
                                    <label>Phone Number <span className="text-danger">*</span></label>
                                    <input
                                        type='number'
                                        className="form-control"
                                        placeholder='Enter Phone Number'
                                        {...register('Phone_Number', { required: 'Phone Number is required' })}
                                    />
                                    {errors.Phone_Number && <p className="text-danger">{errors.Phone_Number.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Country, State, City */}
                        <div className="row mt-3">
                            <div className="col">
                                <div className="form-group">
                                    <label>Country <span className="text-danger">*</span></label>
                                    <input
                                        type='text'
                                        className="form-control"
                                        placeholder='Enter Country'
                                        {...register('Country', { required: 'Country is required' })}
                                    />
                                    {errors.Country && <p className="text-danger">{errors.Country.message}</p>}
                                </div>
                            </div>

                            <div className="col">
                                <div className="form-group">
                                    <label>State <span className="text-danger">*</span></label>
                                    <input
                                        type='text'

                                        className="form-control"
                                        placeholder='Enter State'
                                        {...register('State', { required: 'State is required' })}
                                    />
                                    {errors.State && <p className="text-danger">{errors.State.message}</p>}
                                </div>
                            </div>

                            <div className="col">
                                <div className="form-group">
                                    <label>City <span className="text-danger">*</span></label>
                                    <input
                                        type='text'

                                        className="form-control"
                                        placeholder='Enter City'
                                        {...register('City', { required: 'City is required' })}
                                    />
                                    {errors.City && <p className="text-danger">{errors.City.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Select Role */}
                        {/* <div className="form-group mt-3">
                            <label>Select Role <span className="text-danger">*</span></label>
                            <select
                                className="form-control"
                                {...register('role', { required: 'Society role is required' })}
                            >
                                <option value="Admin">Admin</option>
                                <option value="Residence">Residence</option>
                                <option value="Security">Security</option>
                            </select>
                            {errors.role && <p className="text-danger">{errors.role.message}</p>}
                        </div> */}

                        {/* Select Society */}
                        <div className="form-group mt-3">

                            <label>Select Society <span className="text-danger">*</span></label>
                            <select
                                className="form-control form-select"
                                // name='select_society'
                                id='select_society'
                                {...register('select_society', { required: 'Society selection is required' })}
                                onChange={(e) => {
                                    console.log("Selected Value:", e.target.value);
                                    if (e.target.value === "create") {
                                        createnewSociety();
                                    }
                                }}
                            >
                                {Array.isArray(societies) &&
                                    societies.map((society) => (
                                        <option key={society._id} value={society._id}>
                                            {society.Society_name}
                                        </option>
                                    ))}

                                <option value="create" className='create-society-btn' onClick={() => setShowForm(true)}>Create Society</option>
                            </select>
                            {errors.select_society && <p className="text-danger">{errors.select_society.message}</p>}

                        </div>

                        {/* Password */}
                        <div className="form-group mt-3 position-relative">
                            <label>Password <span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                // name='Password'
                                placeholder='Enter Password'
                                type={showPassword ? "text" : "password"}
                                {...register('Password', { required: 'Password is required' })}
                            />
                            <span
                                className="password-icon translate-middle-y pr-3 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <HiMiniEyeSlash /> : <IoEyeSharp />}
                            </span>
                            {errors.Password && <p className="text-danger">{errors.Password.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="form-group mt-3 position-relative">
                            <label>Confirm Password <span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                // name='Confirm_password'
                                placeholder='Confirm Password'
                                type={showConfirmPassword ? "text" : "password"}
                                {...register('Confirm_password', { required: 'Please confirm your password' })}
                            />
                            <span
                                className="password-icon translate-middle-y pr-3 cursor-pointer"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? <HiMiniEyeSlash /> : <IoEyeSharp />}
                            </span>
                            {errors.Confirm_password && <p className="text-danger">{errors.Confirm_password.message}</p>}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="form-check mt-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={toggleTermsAccepted}
                                id="termsCheck"
                            />
                            <label className="form-check-label" htmlFor="termsCheck">
                                I agree to the terms and <span className='text-danger'>Privicy Policies.</span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn w-100 my-3"
                        >Register</button>

                        <p className='text-center'>Already have an account? <Link to="/login" className='text-danger text-decoration-none'>Login</Link></p>

                    </form>
                </div>
            </div>
            {/* Conditional Form Rendering */}
            <div className='position-absolute top-50 start-50 translate-middle'>
                {showForm && (
                    <div className="new-society-form bg-white shadow p-4">
                        <h3 className="h5 mb-4">Create New Society</h3>

                        <form onSubmit={handleNewSubmit(handleNewSocietySubmit)}>

                            {/* Society Name */}
                            <div className="mb-3">
                                <label className="form-label">Society Name<span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control "
                                    // name='Society_name'
                                    placeholder="Enter Society Name"
                                    {...registerNewSociety('Society_name', { required: 'Name is required' })}
                                />
                                {newSocietyErrors.Society_name && <p className="text-danger small">{newSocietyErrors.Society_name.message}</p>}
                            </div>

                            {/* Society Address */}
                            <div className="mb-3">
                                <label className="form-label">Society Address<span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    // name='Society_address'
                                    placeholder="Enter Address"
                                    {...registerNewSociety('Society_address', { required: 'Address is required' })}
                                />
                                {newSocietyErrors.Society_address && <p className="text-danger small">{newSocietyErrors.Society_address.message}</p>}
                            </div>

                            {/* Country and State */}
                            <div className="row g-3 mb-3">
                                <div className="col-md">
                                    <label className="form-label">Country<span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        // name='Country'
                                        className="form-control"
                                        placeholder='Enter Country'
                                        {...registerNewSociety('Country', { required: 'Country is required' })}
                                    />
                                    {newSocietyErrors.Country && <p className="text-danger small">{newSocietyErrors.Country.message}</p>}
                                </div>

                                <div className="col-md">
                                    <label className="form-label">State<span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        // name='State'
                                        className="form-control"
                                        placeholder='Enter State'
                                        {...registerNewSociety('State', { required: 'State is required' })}
                                    />
                                    {newSocietyErrors.State && <p className="text-danger small">{newSocietyErrors.State.message}</p>}
                                </div>
                            </div>

                            {/* City and Zip Code */}
                            <div className="row g-3 mb-3">
                                <div className="col-md">
                                    <label className="form-label">City<span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        // name='City'
                                        className="form-control"
                                        placeholder='Enter City'
                                        {...registerNewSociety('City', { required: 'City is required' })}
                                    />
                                    {newSocietyErrors.City && <p className="text-danger small">{newSocietyErrors.City.message}</p>}
                                </div>

                                <div className="col-md">
                                    <label className="form-label">Zip Code<span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        // name='ZipCode'
                                        className="form-control"
                                        placeholder='Enter Zip Code'
                                        {...registerNewSociety('ZipCode', { required: 'Zip Code is required' })}
                                    />
                                    {newSocietyErrors.ZipCode && <p className="text-danger small">{newSocietyErrors.ZipCode.message}</p>}
                                </div>
                            </div>

                            {/* Cancel and Save Buttons */}
                            <div className="d-flex justify-content-between">
                                <button
                                    type="button" // Change to type button
                                    className="btn cancle mt-2"
                                    onClick={handleCancel}>Cancel</button>

                                <button
                                    type="submit"
                                    className="btn save mt-2">Save</button>
                            </div>

                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
