const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    Requester_name: {
        type: String,
        required: true,
        trim: true,
    },
    Request_name: {
        type: String,
        required: true,
        trim: true,
    },
    Description:{
        type:String,
        required:true,
    },
    Request_date: {
        type: Date,
        required: true,
    },
    Wing:{
        type:String,
        required:true
    },
    Unit:{
        type:Number,
        required:true,
    },
    Priority:{
        type:String,
        required:true,
        enum: ['High', 'Medium', 'Low']
    },
    Status:{
        type:String,
        required:true,
        enum: ['Open', 'Pending', 'Solve']
    },
    role: {
        type: String,
        enum: ['admin', 'resident', 'security'], 
        default: 'admin' 
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    timestamps: true 
});

const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;
