const mongoose = require('mongoose');

const visitorSchema = mongoose.Schema({
    visitorName: {
        type: String,
        required: true,
        trim: true, // Removes leading/trailing spaces
    },
    wing: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    PhoneNumber: {
        type: Number,
        required: true,
    },
    Date: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value >= new Date(); // Ensures the date is today or later
            },
            message: 'Visit date must be today or in the future.',
        },
    },
    Time: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(value); // Validates time format HH:mm
            },
            message: 'Invalid time format. Use HH:mm.',
        },
    },
}, { timestamps: true });


module.exports = mongoose.model('Visitor', visitorSchema);

