const Tenant = require('../models/tenantModel');
const cloudinary = require('../utils/cloudinary');
const fs = require("fs");
const crypto = require("crypto");
const senData = require('../config/mailer');
const { hash } = require('../utils/hashpassword');
const nodemailer = require("nodemailer")
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")
const { generateTokenAndSetCookie } = require('../config/auth');


// Login Page

exports.TenantLogin = async (req, res) => {
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

        const user = await Tenant.findOne({
            $or: [
                { Email_address: { $regex: new RegExp(`^${Email}$`, 'i') } },
                { Phone_number: Email }
            ]
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

         // Debugging

        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: "resident" }, process.env.JWT_SECRET, {
            expiresIn: "15d",
        });

        res.cookie("tenanttoken", token);

        res.status(200).json({
            success: true,
            message: "Login successful! Welcome back.",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


// tenant registation
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});

exports.addTenantData = async (req, res) => {
    try {
        // Generate a random password
        function generatePassword(length = 6) {
            const password = crypto.randomInt(0, Math.pow(10, length)).toString();
            return password.padStart(length, "0");
        }

        // Extract fields from req.body
        const {
            Owner_full_name, Owner_phone_number, Owner_address,
            Full_name, Phone_number, Email_address, Age, Gender,
            Wing, Unit, Relation, Member_Counting, Vehicle_Counting, role,
        } = req.body;

        // Validate required fields
        if (!Email_address) {
            return res.status(400).json({
                success: false,
                message: "Email address is required.",
            });
        }

        if (!Full_name || !Phone_number || !Age || !Gender || !Wing || !Unit || !Relation) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided.",
            });
        }

        const existingUser = await Tenant.findOne({ Email_address });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const password = generatePassword();
        const hashpassword = await hash(password);

        // Function to upload files to Cloudinary and delete locally
        const uploadAndDeleteLocal = async (fileArray) => {
            if (fileArray && fileArray[0]) {
                const filePath = fileArray[0].path;
                try {
                    const result = await cloudinary.uploader.upload(filePath);
                    fs.unlink(filePath, (err) => {
                        if (err) {

                        }
                    });
                    return result.secure_url;
                } catch (error) {
              
                    throw error;
                }
            }
            return "";
        };

        // Upload images
        const Tenant_image = await uploadAndDeleteLocal(req.files?.Tenant_image);
        const Adhar_front = await uploadAndDeleteLocal(req.files?.Adhar_front);
        const Adhar_back = await uploadAndDeleteLocal(req.files?.Adhar_back);
        const Address_proof = await uploadAndDeleteLocal(req.files?.Address_proof);
        const Rent_Agreement = await uploadAndDeleteLocal(req.files?.Rent_Agreement);

        // Create new Tenant document
        const newTenant = new Tenant({
            Tenant_image, Owner_full_name, Owner_phone_number, Owner_address,
            Full_name, Phone_number, Email_address, Age, Gender, Wing, Unit, Relation,
            Adhar_front, Adhar_back, Address_proof, Rent_Agreement, role: role || "resident",
            password: hashpassword,
        });

        await newTenant.save();

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
            to: newTenant.Email_address, // Ensure this is valid
            subject: "Registration Successful - Login Details",
            text: `Dear ${newTenant.Full_name},\n\nYou have successfully registered as a resident. Your login details are:\n\nUsername: ${newTenant.Email_address}\nPassword: ${password}\n\nKeep this information secure.\n\nBest Regards,\nManagement`,
        };

        // Check if the Email_address is defined and valid
        if (!newTenant.Email_address || typeof newTenant.Email_address !== "string") {
            throw new Error("Invalid or missing Email_address for the tenant.");
        }

        try {
            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            
        }

        if (Member_Counting) {
            let members;
            if (typeof Member_Counting === "string") {
                try {
                    members = JSON.parse(Member_Counting); // Parse only if it's a JSON string
                } catch (parseError) {
                    
                    return res.status(400).json({
                        success: false,
                        message: "Invalid format for Member_Counting.",
                    });
                }
            } else if (Array.isArray(Member_Counting)) {
                members = Member_Counting; // Directly assign if it's already an array
            }

            if (Array.isArray(members)) {
                await Tenant.updateOne(
                    { _id: newTenant._id },
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
                    return res.status(400).json({
                        success: false,
                        message: "Invalid format for Vehicle_Counting.",
                    });
                }
            } else if (Array.isArray(Vehicle_Counting)) {
                vehicles = Vehicle_Counting; // Directly assign if it's already an array
            }

            if (Array.isArray(vehicles)) {
                await Tenant.updateOne(
                    { _id: newTenant._id },
                    { $push: { Vehicle_Counting: { $each: vehicles } } }
                );
            }
        }

        return res.status(201).json({
            success: true,
            message: "Tenant data added successfully.",
        });
    } catch (error) {
        console.error("Error adding Tenant data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to add Tenant data.",
        });
    }
};

// login person profile 
exports.tenantProfile = async (req, res) => {
    let data = await Tenant.findById(req.tenant);
    res.json(data);
}

exports.GetAllTenant = async (req, res) => {
    try {
        const find = await Tenant.find();
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
 
        return res.status(500).json({
            success: false,
            message: "Failed to add Tenant data"
        });
    }
}
