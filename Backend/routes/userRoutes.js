const express = require("express");
const { Register, logout, resetPassword, editProfile, findUserById, SendOtp, verifyOtp, Adminlogin } = require("../controller/userController");
const router = express.Router();

router.post("/Registration", Register);
router.post("/login", Adminlogin);
router.post("/logout", logout);
router.post("/resetpassword", resetPassword);
router.put('/edit/:id', editProfile);
router.get('/:id', findUserById);
router.post('/send-otp', SendOtp);
router.post('/verify-otp', verifyOtp);


module.exports = router;
