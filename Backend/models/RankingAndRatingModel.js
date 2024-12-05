const mongoose = require('mongoose');

// Ranking and Rating Polls

const RankingPollSchema = new mongoose.Schema({
    polls: {
        type: String,
        required: true,
        default: "Ranking Polls"
    },
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [{
            option: {
                type: Number, 
                required: true,
            },
            votes: {
                type: Number,
                default: 0, 
                min: 0, 
            },
        }],
        validate: [array => array.length > 1, "A poll must have at least two options"], 
    },
}, { timestamps: true });

module.exports = mongoose.model("RankingPoll", RankingPollSchema);
