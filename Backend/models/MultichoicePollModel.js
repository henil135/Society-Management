const mongoose = require('mongoose');

// MultichoicePoll
const MultichoicePollSchema = new mongoose.Schema({
    polls: {
        type: String,
        required: true,
        default: "Multichoice Polls"
    },
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [{
            option: {
                type: String,
                required: true, 
            },
            votes: {
                type: Number,
                default: 0, 
                min: 0, 
            },
            voters: [{
                type: mongoose.Schema.Types.ObjectId,
                refPath: 'userType', // Dynamic reference based on userType
            }],
            userType: {
                type: String,
                enum: ['Owner', 'Tenant'], // Valid models for reference
            },
        }],
        validate: [array => array.length > 1, "A poll must have at least two options"], // Ensures minimum options
    }
}, { timestamps: true });


module.exports = mongoose.model("MultichoicePoll", MultichoicePollSchema);


