import api from "./api";

// Create society
export const CreateSociety = async (data) =>
  await api.post("http://localhost:5000/api/societies/create", data);

// Get all societies
export const GetAllSocieties = async () =>
  await api.get("http://localhost:5000/api/societies/");

// Register
export const Register = async (data) =>
  await api.post("http://localhost:5000/api/v1/Registration", data);

// Login
export const login = async (data) =>
  await api.post("http://localhost:5000/api/v1/login", data);

// Logout
export const logout = async () =>
  await api.get("http://localhost:5000/api/v1/logout");

// Send otp
export const SendOtp = async (data) =>
  await api.post("http://localhost:5000/api/v1/send-otp", data);

// Verify otp
export const verifyOtp = async (data) =>
  await api.post("http://localhost:5000/api/v1/verify-otp", data);

// Reset password
export const resetPassword = async (data) =>
  await api.post("http://localhost:5000/api/v1/reset-password", data);

// Update user profile
export const editProfile = async (userId, data) =>
  await api.patch(`http://localhost:5000/api/v1/edit/${userId}`, data);

// View user profile
export const findUserById = async (userId) =>
  await api.get(`http://localhost:5000/api/v1/${userId}`);