import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import profile from "../assets/profile.png";
import Sidebar from "../component/layout/Sidebar";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  // Simulating pre-filled profile data (this would normally come from an API)
  const initialData = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    society: "",
    country: "",
    state: "",
    city: "",
  };

  // Populate the form with initial data
  useEffect(() => {
    for (const field in initialData) {
      setValue(field, initialData[field]);
    }
  }, [setValue]);

  // Submit function
  const onSubmit = (data) => {
    console.log("Updated Profile Data:", data);
    // Handle form submission to your server or API here
    navigate("/dashboard"); // Redirect to the dashboard after submission
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      <div className="profile-dashboard-bg dashboard-bg" style={{ width: "1910px" }}>
        <Navbar />
        <div className="stickyHeader" style={{ marginLeft: "280px" }}>
          <div className="d-flex justify-content-center profile-bg">
            <div className="col-lg-8">
              <h3 className="mb-3 mt-5 profile-title">Edit Profile</h3>

              <form onSubmit={handleSubmit(onSubmit)} className="form-group bg-light p-5 rounded d-flex justify-content-center">
                <div className="me-5 text-center">
                  <img
                    src={profile}
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <h5 className="mt-3">Arlene McCoy</h5>
                </div>

                <div className="ms-5">
                  <div className="d-flex">
                    <div className="mb-2 w-50 me-2">
                      <label htmlFor="fname" className="form-label mb-0">
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.fname ? "is-invalid" : ""}`}
                        id="fname"
                        {...register("fname", { required: "First Name is required" })}
                      />
                      {errors.fname && <div className="invalid-feedback">{errors.fname.message}</div>}
                    </div>

                    <div className="mb-2 w-50 ms-2">
                      <label htmlFor="lname" className="form-label mb-0">
                        Last Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.lname ? "is-invalid" : ""}`}
                        id="lname"
                        {...register("lname", { required: "Last Name is required" })}
                      />
                      {errors.lname && <div className="invalid-feedback">{errors.lname.message}</div>}
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="mb-2 w-50 me-2">
                      <label htmlFor="phone" className="form-label mb-0">
                        Phone Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                        id="phone"
                        {...register("phone", { required: "Phone Number is required" })}
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                    </div>

                    <div className="mb-2 w-50 ms-2">
                      <label htmlFor="email" className="form-label mb-0">
                        Email Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        id="email"
                        {...register("email", { required: "Email is required" })}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="mb-2 w-50 me-2">
                      <label htmlFor="society" className="form-label mb-0">
                        Society <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.society ? "is-invalid" : ""}`}
                        id="society"
                        {...register("society", { required: "Society is required" })}
                      />
                      {errors.society && <div className="invalid-feedback">{errors.society.message}</div>}
                    </div>

                    <div className="mb-2 w-50 ms-2">
                      <label htmlFor="country" className="form-label mb-0">
                        Country <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.country ? "is-invalid" : ""}`}
                        id="country"
                        {...register("country", { required: "Country is required" })}
                      />
                      {errors.country && <div className="invalid-feedback">{errors.country.message}</div>}
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="mb-2 w-50 me-2">
                      <label htmlFor="state" className="form-label mb-0">
                        State <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.state ? "is-invalid" : ""}`}
                        id="state"
                        {...register("state", { required: "State is required" })}
                      />
                      {errors.state && <div className="invalid-feedback">{errors.state.message}</div>}
                    </div>

                    <div className="mb-2 w-50 ms-2">
                      <label htmlFor="city" className="form-label mb-0">
                        City <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.city ? "is-invalid" : ""}`}
                        id="city"
                        {...register("city", { required: "City is required" })}
                      />
                      {errors.city && <div className="invalid-feedback">{errors.city.message}</div>}
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-3">
                    <button type="submit" className="d-flex align-items-center btn btn-sm profile-btn">
                      Update Profile
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
