const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
    Complainer_name: {
        type: String,
        required: true,
        trim: true,
    },
    Complaint_name: {
        type: String,
        required: true,
        trim: true,
    },
    Description: {
        type: String,
        required: true,
        trim: true,
    },
    Wing: {
        type: String,
        required: true,
    },
    Unit: {
        type: Number,
        required: true,
    },
    Priority: {
        type: String,
        required: true,
        enum: ['High', 'Medium', 'Low'],
    },
    Status: {
        type: String,
        required: true,
        enum: ['Open', 'Pending', 'Solve'],
    },
    role: {
        type: String,
        enum: ['admin', 'resident', 'security'],
        default: 'resident',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'userType', // Dynamic reference based on userType
    },
    userType: {
        type: String,
        required: true,
        enum: ['Owner', 'Tenant'], // Valid models for reference
    },
}, {
    timestamps: true,
});

const ServiceComplaint = mongoose.model('ServiceComplaint', ComplaintSchema);

module.exports = ServiceComplaint;
