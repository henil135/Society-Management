const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    polls: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    options: [{
        option: String,
        votes: {
            type: Number,
            default: 0
        },
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner"
    },
}, { timestamps: true });

module.exports = mongoose.model("Poll", pollSchema);
