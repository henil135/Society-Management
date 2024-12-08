const mongoose = require('mongoose');

// text  polls

const TextPollSchema = new mongoose.Schema({
    polls: {
        type: String,
        required: true,
        default: "create polls"
    },
    Answer: {
        type: String,
        
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


module.exports = mongoose.model("TextPoll", TextPollSchema);

