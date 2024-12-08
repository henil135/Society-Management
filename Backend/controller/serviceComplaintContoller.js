const ServiceComplaint = require("../models/serviceComplaintModel");



// Create a new complaint
exports.createComplaint = async (req, res) => {
    try {
        const {
            Complainer_name,
            Complaint_name,
            Description,
            Wing,
            Unit,
            Priority,
            Status,
            role,
        } = req.body;

        // Ensure required fields are present
        if (!Complainer_name || !Complaint_name || !Description || !Wing || !Unit || !Priority || !Status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create complaint using authenticated user's ID and type
        const complaint = new ServiceComplaint({
            Complainer_name,
            Complaint_name,
            Description,
            Wing,
            Unit,
            Priority,
            Status,
            role,
            createdBy: req.member,
            userType: req.userType, 
        });
        console.log(req.member);
        

        await complaint.save();

        res.status(201).json({
            message: 'Complaint created successfully',
            complaint,
        });
    } catch (error) {
      
        res.status(500).json({ message: 'Error creating complaint', error: error.message });
    }
};


// Get all complaints
exports.getAllComplaints = async (req, res) => {
    try {
        const complaints = await ServiceComplaint.find().populate({
            path: 'createdBy',
            select: 'Full_name',  
        });
        res.status(200).json({ message: 'Complaints retrieved successfully', complaints });
    } catch (error) {
        res.status(500).json( error.message );
    }
};

// Get a complaint by ID
exports.getComplaintById = async (req, res) => {
    try {
        const complaint = await ServiceComplaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        res.status(200).json({ message: 'Complaint retrieved successfully', complaint });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving complaint', error });
    }
};

// Delete a complaint by ID
exports.deleteComplaint = async (req, res) => {
    try {
        const complaint = await ServiceComplaint.findByIdAndDelete(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        res.status(200).json({ message: 'Complaint deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting complaint', error });
    }
};