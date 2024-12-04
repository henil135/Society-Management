const Owner = require('../models/ownerModel');
const cloudinary = require('../utils/cloudinary');
const fs = require("fs")
const crypto = require("crypto");
const sendOtpUi = require('../config/mailer');
const { hash } = require('../utils/hashpassword');
const nodemailer = require("nodemailer")
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateTokenAndSetCookie } = require('../config/auth');

exports.addOwnerData = async (req, res) => {

    try {

        function generatePassword(length = 6) {
            const password = crypto.randomInt(0, Math.pow(10, length)).toString();
            return password.padStart(length, "0")
        }

        const {
            Full_name,
            Phone_number,
            Email_address,
            Age,
            Gender,
            Wing,
            Unit,
            Relation,
            Member_Counting,
            Vehicle_Counting,
            role,
            Resident_status,
            UnitStatus
        } = req.body;

        const existingUser = await Owner.findOne({ Email_address });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const password = generatePassword();

        const hashpassword = await hash(password)


        const uploadAndDeleteLocal = async (fileArray) => {
            if (fileArray && fileArray[0]) {
                const filePath = fileArray[0].path;
                try {
                    // Upload to Cloudinary
                    const result = await cloudinary.uploader.upload(filePath);
                    // Delete from local server
                    fs.unlink(filePath, (err) => {
                        if (err) console.error("Error deleting file from server:", err);
                        else console.log("File deleted from server:", filePath);
                    });
                    return result.secure_url;
                } catch (error) {
                    console.error("Error uploading to Cloudinary:", error);
                    throw error;
                }
            }
            return '';
        };

        // Upload images to Cloudinary and delete local files
        const profileImage = await uploadAndDeleteLocal(req.files?.profileImage);
        const Adhar_front = await uploadAndDeleteLocal(req.files?.Adhar_front);
        const Adhar_back = await uploadAndDeleteLocal(req.files?.Adhar_back);
        const Address_proof = await uploadAndDeleteLocal(req.files?.Address_proof);
        const Rent_Agreement = await uploadAndDeleteLocal(req.files?.Rent_Agreement);

        if (
            !Full_name ||
            !Phone_number ||
            !Email_address ||
            !Age ||
            !Gender ||
            !Wing ||
            !Unit ||
            !Relation ||
            !Member_Counting ||
            !Vehicle_Counting
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const existingWing = await Owner.findOne({ Wing, Unit });
        if (existingWing) {
            return res.status(400).json({
                success: false,
                message: "An  Wing and Unit already exists.",
            });
        }

        // Create a new owner document
        const newOwner = new Owner({
            profileImage,
            Full_name,
            Phone_number,
            Email_address,
            Age,
            Gender,
            Wing,
            Unit,
            Relation,
            Adhar_front,
            Adhar_back,
            Address_proof,
            Rent_Agreement,
            role: role || "resident",
            Resident_status: Resident_status || "Owner",
            UnitStatus: UnitStatus || "Occupied",
            password: hashpassword

        });



        // Email configuration and sending
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sarvaliyapiyush@gmail.com", // Use environment variables for sensitive data
                pass: "nqoo sdpc otri wexq", // App password or SMTP password
            },
        });

        const mailOptions = {
            from: "sarvaliyapiyush@gmail.com",
            to: newOwner.Email_address, // Ensure this is valid
            subject: "Registration Successful - Login Details",
            text: `Dear ${newOwner.Full_name},\n\nYou have successfully registered as a resident. Your login details are:\n\nUsername: ${newOwner.Email_address}\nPassword: ${password}\n\nKeep this information secure.\n\nBest Regards,\nManagement`,
        };

        // Check if the Email_address is defined and valid
        if (!newOwner.Email_address || typeof newOwner.Email_address !== "string") {
            throw new Error("Invalid or missing Email_address for the Owner.");
        }

        try {
            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.error("Error sending email:", emailError);
        }

        if (Member_Counting) {
            let members;
            if (typeof Member_Counting === "string") {
                try {
                    members = JSON.parse(Member_Counting); // Parse only if it's a JSON string
                } catch (parseError) {
                    console.error("Invalid JSON in Member_Counting:", parseError);
                    return res.status(400).json({
                        success: false,
                        message: "Invalid format for Member_Counting.",
                    });
                }
            } else if (Array.isArray(Member_Counting)) {
                members = Member_Counting; // Directly assign if it's already an array
            }

            if (Array.isArray(members)) {
                await Owner.updateOne(
                    { _id: newOwner._id },
                    { $push: { Member_Counting: { $each: members } } }
                );
            }
        }

        // Handle Vehicle Counting
        if (Vehicle_Counting) {
            let vehicles;
            if (typeof Vehicle_Counting === "string") {
                try {
                    vehicles = JSON.parse(Vehicle_Counting); // Parse only if it's a JSON string
                } catch (parseError) {
                    console.error("Invalid JSON in Vehicle_Counting:", parseError);
                    return res.status(400).json({
                        success: false,
                        message: "Invalid format for Vehicle_Counting.",
                    });
                }
            } else if (Array.isArray(Vehicle_Counting)) {
                vehicles = Vehicle_Counting; // Directly assign if it's already an array
            }

            if (Array.isArray(vehicles)) {
                await Owner.updateOne(
                    { _id: newOwner._id },
                    { $push: { Vehicle_Counting: { $each: vehicles } } }
                );
            }
        }

        await newOwner.save();
        return res.status(201).json({
            success: true,
            message: "Owner data added successfully",

        });
    } catch (error) {
        console.error("Error adding owner data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to add owner data"
        });
    }
};

// owner login

exports.OwnerLogin = async (req, res) => {
    try {
        const { Email, password } = req.body;

        if (!Email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const user = await Owner.findOne({
            $or: [
                { Email_address: { $regex: new RegExp(`^${Email}$`, "i") } },
                { Phone_number: Email },
            ],
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: "resident" }, process.env.JWT_SECRET_OWNER, {
            expiresIn: "15d",
        });

        res.cookie("ownertoken", token);

        res.status(200).json({
            success: true,
            message: "Login successful! Welcome back.",
            token,
        });
    } catch (error) {
        console.error("Error in login controller", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.GetAllOwner = async (req, res) => {
    try {
        const find = await Owner.find();
        if (!find) {
            return res.status(400).json({
                success: false,
                message: "No data found"
            })
        }
        return res.json({
            success: true,
            Owner: find
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to add owner data"
        });
    }
}

// owner profile
exports.ownerProfile = async (req, res) => {
    let data = await Owner.findById(req.owner);
    console.log("my data", data);
    res.json(data);
}