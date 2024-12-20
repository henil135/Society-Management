const cloudinary = require('../utils/cloudinary');
const fs = require("fs")
const crypto = require("crypto");
const { hash } = require("../utils/hashpassword");
const sendOtpUi = require("../config/mailer");
const Guard = require("../models/securityGuardModel");
const moment = require('moment');
const nodemailer = require("nodemailer")
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")
const { generateTokenAndSetCookie } = require('../config/auth');

// add security guard
exports.CreateSecurityGuard = async (req, res) => {
    try {
        function generatePassword(length = 6) {
            const password = crypto.randomInt(0, Math.pow(10, length)).toString();
            return password.padStart(length, "0")
        }
        const {
            full_name,
            Mail,
            gender,
            shift,
            date,
            time,
            role,
        } = req.body;

        // Convert date string (DD/MM/YYYY) to Date object
        const parsedDate = moment(date,["DD/MM/YYYY", "YYYY-MM-DD"],true).toDate();
        if (!parsedDate || isNaN(parsedDate.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format. Use DD/MM/YYYY",
            });
        }

        const existingUser = await Guard.findOne({ Mail });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const password = generatePassword();
        const hashpassword = await hash(password);

        const uploadAndDeleteLocal = async (fileArray) => {
            if (fileArray && fileArray[0]) {
                const filePath = fileArray[0].path;
                try {
                    const result = await cloudinary.uploader.upload(filePath);
                    fs.unlink(filePath, (err) => {

                    });
                    return result.secure_url;
                } catch (error) {

                    throw error;
                }
            }
            return '';
        };
        const profileimage = await uploadAndDeleteLocal(req.files?.profileimage);
        const adhar_card = await uploadAndDeleteLocal(req.files?.adhar_card);

        if (!full_name || !Mail|| !gender || !shift || !date || !time ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const newOwner = new Guard({
            full_name,
            Mail,
            gender,
            shift,
            date: parsedDate,  // Use the parsed date here
            time,
            profileimage,
            adhar_card,
            role: role || "security",
            password: hashpassword
        });

        await newOwner.save();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sarvaliyapiyush@gmail.com", // Use environment variables for sensitive data
                pass: "nqoo sdpc otri wexq", // App password or SMTP password
            },
        });


        const mailOptions = {
            from: "sarvaliyapiyush@gmail.com",
            to: newOwner.MailOrPhone, // Ensure this is valid
            subject: "Registration Successful - Login Details",
            text: `Dear ${newOwner.full_name},\n\nYou have successfully registered as a resident. Your login details are:\n\nUsername: ${newOwner.MailOrPhone}\nPassword: ${password}\n\nKeep this information secure.\n\nBest Regards,\nManagement`,
        };

        // Check if the Email_address is defined and valid
        if (!newOwner.Mail|| typeof newOwner.Mail!== "string") {
            throw new Error("Invalid or missing Email_address for the Owner.");

        }

        try {
            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.error("Error sending email:", emailError);
        }

        return res.status(200).json({
            success: true,
            message: "Security Guard Successfully added"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Guard login

exports.GuardLogin = async (req, res) => {
    try {
        const { Email, password } = req.body;

        if (!Email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const emailRegex = /\S+@\S+\.\S+/;
        const phoneRegex = /^\d+$/;

        if (!phoneRegex.test(Email) && !emailRegex.test(Email)) {
            return res.status(400).json({ success: false, message: "Invalid email or phone format" });
        }

        const user = await Guard.findOne({
            MailOrPhone: { $regex: new RegExp(`^${Email}$`, 'i') }
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);


        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: "security" }, process.env.JWT_SECRET, {
            expiresIn: "15d",
        });

        res.cookie("gaurdtoken", token);

        res.status(200).json({
            success: true,
            message: "Login successful! Welcome back.",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//get a security Guard
exports.GetSecurityGuard = async (req, res) => {
    try {
        const find = await Guard.find();
        if (!find) {
            return res.status(400).json({
                success: false,
                message: "No data found"
            })
        }
        return res.status(200).json({
            success: true,
            Guard: find
        })
    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: "error in Announcement fetching"
        });
    }
}
exports.GetByIdGuard = async (req, res) => {
    try {
        const find = await Guard.findById(req.params.id);
        if (!find) {
            return res.status(400).json({
                success: false,
                message: "No data found"
            })
        }
        return res.status(200).json({
            success: true,
            Guard: find
        })
    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: "error in Announcement fetching"
        });
    }
}
exports.DeleteGuard = async (req, res) => {
    try {
        const find = await Guard.findByIdAndDelete(req.params.id);
        if (!find) {
            return res.status(400).json({
                success: false,
                message: "No data found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Security Guard deleted"
        })
    } catch (error) {
       
        return res.status(500).json({
            success: false,
            message: "error in SecurityGuard Deleting"
        });
    }
}


exports.gaurdProfile = async (req, res) => {
    let data = await Guard.findById(req.gaurd);
    console.log("my data", data);
    res.json(data);
}


//update security
exports.updateSecurityGuard = async (req, res) => {
    const { id } = req.params;
    const {
        full_name,
        Mail,
        gender,
        shift,
        date,
        time,
        role,
    } = req.body;

    try {
        const guard = await Guard.findById(id);
        if (!guard) {
            return res.status(404).json({
                success: false,
                message: "Security Guard not found"
            });
        }

        const uploadAndDeleteLocal = async (fileArray) => {
            if (fileArray && fileArray[0]) {
                const filePath = fileArray[0].path;
                try {
                    const result = await cloudinary.uploader.upload(filePath);
                    fs.unlink(filePath, (err) => {
                        if (err) {}
                    });
                    return result.secure_url;
                } catch (error) {
                  
                    throw error;
                }
            }
            return '';
        };

        if (full_name) guard.full_name = full_name;
        if (Mail) guard.Mail = Mail;
        if (gender) guard.gender = gender;
        if (shift) guard.shift = shift;
        if (date) {
            const parsedDate = moment(date, "DD/MM/YYYY").toDate();
            if (!parsedDate || isNaN(parsedDate.getTime())) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid date format. Use DD/MM/YYYY",
                });
            }
            guard.date = parsedDate;
        }
        if (time) guard.time = time;
        if (role) guard.role = role || guard.role;

        if (req.files?.profileimage) {
            guard.profileimage = await uploadAndDeleteLocal(req.files.profileimage);
        }

        if (req.files?.adhar_card) {
            guard.adhar_card = await uploadAndDeleteLocal(req.files.adhar_card);
        }

        await guard.save();

        return res.status(200).json({
            success: true,
            message: "Security Guard details updated successfully",
        });
    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating Security Guard details",
        });
    }
};