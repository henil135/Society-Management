const mongoose = require("mongoose");

// Define the Answer schema
const AskAnswerSchema = mongoose.Schema(
    {
        text: { type: String, required: true },
        votes: { type: Number, default: 0 },
        votedBy: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, refPath: 'votedBy.userType' }, // Reference to the user
                userType: { type: String, required: true, enum: ['Owner', 'Tenant', 'User'] }, // Enum for user type
            },
        ],
    },
    { timestamps: true }
);



// Define the Question schema
const AskQuestionSchema = mongoose.Schema(
    {
        text: { type: String, required: true },
        answers: [AskAnswerSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Question", AskQuestionSchema);

