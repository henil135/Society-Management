const mongoose = require('mongoose');

// Numeric polls

const NumericPollSchema = new mongoose.Schema({
    polls: {
        type: String,
        required: true,
        default: "Numeric polls"
    },
    question: {
        type: String,
        required: true,
    },
    minValue: {
        type: Number,
    },
    maxValue: {
        type: Number,
    },
    decimalPlaces: {
        type: Number,
        min: 0,
        max: 5, 
    },
    voters: [{
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'userType', // Dynamic reference based on userType
    }],
    userType: {
        type: String,
        enum: ['Owner', 'Tenant'], // Valid models for reference
    },
}, { timestamps: true });

module.exports = mongoose.model("NumericPoll", NumericPollSchema);
