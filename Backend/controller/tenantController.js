const Tenant = require('../models/tenantModel'); 
const cloudinary = require('../utils/cloudinary'); 
const fs = require("fs");
const crypto = require("crypto");
const senData = require('../config/mailer');
const { hash } = require('../utils/hashpassword');

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
            Wing, Unit, Relation, Member_Counting, Vehicle_Counting, role
        } = req.body;

        const password = generatePassword();
        const hashpassword = await hash(password);

        // Function to upload files to Cloudinary and delete locally
        const uploadAndDeleteLocal = async (fileArray) => {
            if (fileArray && fileArray[0]) {
                const filePath = fileArray[0].path;
                try {
                    const result = await cloudinary.uploader.upload(filePath);
                    fs.unlink(filePath, (err) => {
                        if (err) console.error("Error deleting file from server:", err);
                    });
                    return result.secure_url;
                } catch (error) {
                    console.error("Error uploading to Cloudinary:", error);
                    throw error;
                }
            }
            return '';
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
            password: hashpassword
        });

        await newTenant.save();

        await sendOtpUi(
            newTenant.Email_address,
            "Registration Successful - Login Details",
            `Dear ${newTenant.Full_name},\n\nYou have successfully registered as a resident. Your login details are:\n\nUsername: ${newTenant.Email_address}\nPassword: ${password}\n\nKeep this information secure.\n\nBest Regards,\nManagement`
        );

        // Handle Member Counting
        if (Member_Counting) {
            const members = JSON.parse(Member_Counting);
            if (Array.isArray(members)) {
                await Tenant.updateOne(
                    { _id: newTenant._id },
                    { $push: { Member_Counting: { $each: members } } }
                );
            }
        }

        // Handle Vehicle Counting
        if (Vehicle_Counting) {
            const vehicles = JSON.parse(Vehicle_Counting);
            if (Array.isArray(vehicles)) {
                await Tenant.updateOne(
                    { _id: newTenant._id },
                    { $push: { Vehicle_Counting: { $each: vehicles } } }
                );
            }
        }

        return res.status(201).json({
            success: true,
            message: "Tenant data added successfully",
        });
    } catch (error) {
        console.error("Error adding Tenant data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to add Tenant data"
        });
    }
};


exports.GetAllTenant= async(req,res)=>{
    try {
        const find= await Tenant.find();
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No data found"
            })
        }
        return res.json({
            success:true,
            Owner:find
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
             success: false,
             message: "Failed to add Tenant data"
         });
    }
}
