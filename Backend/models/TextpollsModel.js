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

}, { timestamps: true });


module.exports = mongoose.model("TextPoll", TextPollSchema);

