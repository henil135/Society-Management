const Question = require("../models/AskQuestionModel")

exports.createQuestions = async (req, res) => {
    try {
        const { text, answers } = req.body;

        // Validate input
        if (!text || !Array.isArray(answers)) {
            return res.status(400).json({ message: 'Invalid input. "text" and "answers" are required.' });
        }

        // Ensure each answer has a "text" field
        const formattedAnswers = answers.map(answer => ({
            text: answer.text,
            votes: answer.votes || 0,
        }));

        const question = new Question({ text, answers: formattedAnswers });
        await question.save();

        res.status(201).json(question);
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

exports.GetAllQuestions = async (req, res) => {
    const questions = await Question.find();
    res.send(questions);
}

exports.VoteAnswer = async (req, res) => {
    try {
        const { id, AnswerId } = req.params;
        const { userId, userType } = req.body; 

        if (!userId || !userType) {
            return res.status(400).json({ message: "User information is required to vote" });
        }

        // Find the question
        const question = await Question.findById(id);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Find the specific answer by its ID
        const answer = question.answers.id(AnswerId);
        if (!answer) {
            return res.status(404).json({ message: "Answer not found" });
        }

        // Check if the user has already voted
        const hasAlreadyVoted = answer.votedBy.some(
            (vote) => vote.userId.toString() === userId && vote.userType === userType
        );

        if (hasAlreadyVoted) {
            return res.status(403).json({ message: "You have already voted for this answer" });
        }

        // Register the user's vote
        answer.votes += 1;
        answer.votedBy.push({ userId, userType });

        // Save the updated question to the database
        await question.save();

        res.status(200).json({
            message: "Your vote has been registered successfully",
            updatedAnswer: {
                AnswerId: answer._id,
                votes: answer.votes,
                votedBy: answer.votedBy,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


exports.CountOfVotes = async (req, res) => {
    const { id } = req.params;
    const question = await Question.findById(id);

    if (!question) {
        return res.status(404).send("Question not found");
    }
    res.send({
        question: question.text,
        answers: question.answers.map((ans) => ({
            id: ans._id,
            text: ans.text,
            votes: ans.votes,
        })),
    });
}