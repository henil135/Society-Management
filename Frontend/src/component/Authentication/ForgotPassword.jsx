// ForgotPassword.js
// import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import ForgotPasswordImage from '../../assets/forgotpassword.jpg'; // Use the correct path for your image
import Logo from '../Logo';
import '../../style.css'
import toast from "react-hot-toast"
import axios from 'axios';

function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // const onSubmit = (data) => {
  //   console.log('Forgot Password Submitted:', data);
  //   // Navigate to EnterOtp page with emailOrPhone as state
  //   navigate('/enter-otp', { state: { EmailOrPhone: data.EmailOrPhone } });
  // };

  const onSubmit = async (data) => {
    try {
      localStorage.setItem('forgotPasswordEmailOrPhone', data.EmailOrPhone);

      const response = await axios.post("https://society-management-b6tj.onrender.com/api/v1/send-otp",
        data); // Replace with your API endpoint

      if (response.data.success) {
        toast.success('OTP sent successfully. Please check your email or phone.');
        navigate('/enter-otp', { state: { EmailOrPhone: data.EmailOrPhone } });
      } else {
        toast.error(response.data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    }
  };


  return (
    <div className="container-fluid d-flex align-items-center min-vh-100">
      <div className="row w-100">
        {/* Left Section */}
        <div className="left-side col-lg-6 col-md-6 col-sm-12 align-items-center d-flex flex-column justify-content-center">

            <div >
              <div className='stack mt-5 '>

              <Logo/>
              </div>
          <img
            className="ForgotPassword-image mx-5 mt-5"
            src={ForgotPasswordImage}
            alt="Forgot Password Illustration"
            style={{ maxWidth: '80%' }}
          />
          </div>
        </div>

        {/* Right Section */}
        <div className="right-sec col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
          <div className="forgot-form-container p-4 shadow-lg bg-white rounded">
            <h2>Forgot Password</h2>
            <p>Enter your email or phone, and we will send you an OTP to reset your password.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="emailOrPhone" className="form-label">
                  Email or Phone <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.emailOrPhone ? 'is-invalid' : ''}`}
                  id="EmailOrPhone"
                  placeholder="Enter Email or Phone"
                  {...register('EmailOrPhone', {
                    required: 'Email or phone is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$|^\d{10}$/,
                      message: 'Enter a valid email or 10-digit phone number',
                    },
                  })}
                />
                {errors.EmailOrPhone && (
                  <div className="invalid-feedback">{errors.EmailOrPhone.message}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                style={{ backgroundColor: '#ee6a42', border: 'none' }}
              >
                Get OTP
              </button>

              <p className="text-center mt-3">
                <Link to="/" className="text-decoration-none" style={{ color: '#ee6a42' }}>
                  Back to login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;