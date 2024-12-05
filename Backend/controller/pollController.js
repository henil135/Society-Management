const MultichoicePoll = require("../models/MultichoicePollModel");
const RankingPoll = require("../models/RankingAndRatingModel");
const NumericPoll = require("../models/NumericpollsModel");
const TextPoll = require("../models/TextpollsModel");

// MultichoicePoll 
// create
exports.createMultichoicePoll = async (req, res) => {
    const { question, options } = req.body;

    // Validation for required fields
    if (!question || !options || options.length < 2) {
        return res.status(400).json({ error: 'Poll type, question, and at least two options are required.' });
    }

    try {
        const poll = new MultichoicePoll({ question, options });
        await poll.save();

        // Notify all clients about the new poll
        const io = req.app.get('io');
        io.emit('newPoll', poll); // Emit the 'newPoll' event

        res.status(201).json({ message: 'Poll created successfully.', poll });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Get all polls
exports.MultichoiceAllPolls = async (req, res) => {
    try {
        const polls = await MultichoicePoll.find();
        res.json(polls);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch polls.' });
    }
}
// Vote on a poll
exports.MultichoicevotePoll = async (req, res) => {
    const { id } = req.params;
    const { option } = req.body;

    try {
        const poll = await MultichoicePoll.findById(id);
        if (!poll) {
            return res.status(404).json({ error: 'Poll not found.' });
        }

        // Find the selected option and update votes
        const selectedOption = poll.options.find(opt => opt.option === option);
        if (!selectedOption) {
            return res.status(400).json({ error: 'Option not found.' });
        }

        selectedOption.votes += 1; // Increment vote count
        await poll.save();

        // Notify all clients about the poll update
        const io = req.app.get('io');
        io.emit('pollUpdated', poll); // Emit the 'pollUpdated' event

        res.json({ message: 'Vote recorded successfully.', poll });
    } catch (error) {
        res.status(500).json({ error: 'Failed to record vote.' });
    }
}


// Ranking polls
// create

exports.createRankingPoll = async (req, res) => {
    try {
        const { question, options } = req.body;

        // Validate request body
        if (!question || !options || !Array.isArray(options) || options.length < 2) {
            return res.status(400).json({ message: "A poll must have a question and at least two options, and options must be an array." });
        }

        // Create the poll
        const poll = new RankingPoll({
            question,
            options: options.map(option => ({ option: option.option, votes: 0 })),
        });

        await poll.save();
        res.status(201).json({ message: "Poll created successfully", poll });
    } catch (error) {
        res.status(500).json({ message: "Error creating poll", error: error.message });
    }
}


// Vote on a poll
exports.RankingVolePoll = async (req, res) => {
    try {
        const { id } = req.params;
        const { option } = req.body;

        // Find the poll
        const poll = await RankingPoll.findById(id);
        if (!poll) {
            return res.status(404).json({ message: "Poll not found" });
        }

        // Find the option to vote for
        const selectedOption = poll.options.find(o => o.option === option);
        if (!selectedOption) {
            return res.status(400).json({ message: "Invalid option" });
        }

        // Increment the vote count
        selectedOption.votes += 1;

        await poll.save();

        // Notify via Socket.io
        const io = req.app.get('io');
        io.emit('pollUpdated', poll); // Emit the 'pollUpdated' event

        res.status(200).json({ message: "Vote recorded successfully", poll });
    } catch (error) {
        res.status(500).json({ message: "Error recording vote", error: error.message });
    }
}


// Rating polls
// create

exports.createRatingPoll = async (req, res) => {
    try {
        const { question, options } = req.body;

        // Validate request body
        if (!question || !options || !Array.isArray(options) || options.length < 2) {
            return res.status(400).json({ message: "A poll must have a question and at least two options, and options must be an array." });
        }

        // Create the poll
        const poll = new RankingPoll({
            question,
            options: options.map(option => ({ option: option.option, votes: 0 })),
        });

        await poll.save();
        res.status(201).json({ message: "Poll created successfully", poll });
    } catch (error) {
        res.status(500).json({ message: "Error creating poll", error: error.message });
    }
}

// Vote on a poll
exports.RatingVolePoll = async (req, res) => {
    try {
        const { id } = req.params;
        const { option } = req.body;

        // Find the poll
        const poll = await RankingPoll.findById(id);
        if (!poll) {
            return res.status(404).json({ message: "Poll not found" });
        }

        // Find the option to vote for
        const selectedOption = poll.options.find(o => o.option === option);
        if (!selectedOption) {
            return res.status(400).json({ message: "Invalid option" });
        }

        // Increment the vote count
        selectedOption.votes += 1;

        await poll.save();

        // Notify via Socket.io
        const io = req.app.get('io');
        io.emit('pollUpdated', poll); // Emit the 'pollUpdated' event

        res.status(200).json({ message: "Vote recorded successfully", poll });
    } catch (error) {
        res.status(500).json({ message: "Error recording vote", error: error.message });
    }
}

// Numeric polls 
// create

exports.craeteNumericPoll = async (req, res) => {
    try {
        const { question, minValue, maxValue, decimalPlaces } = req.body;

        // Validate request
        if (!question || minValue === undefined || maxValue === undefined) {
            return res.status(400).json({ message: "Question, minValue, and maxValue are required." });
        }

        if (minValue >= maxValue) {
            return res.status(400).json({ message: "minValue must be less than maxValue." });
        }

        // Create and save the poll
        const poll = new NumericPoll({
            question,
            minValue,
            maxValue,
            decimalPlaces: decimalPlaces || 0, // Default to 0 decimal places
        });

        await poll.save();
        res.status(201).json({ message: "Numeric poll created successfully", poll });
    } catch (error) {
        res.status(500).json({ message: "Error creating poll", error: error.message });
    }
}

// Text  polls
// create 

exports.createTextPoll = async (req, res) => {
    try {
        const { Answer } = req.body;
        console.log("Received Answer: ", Answer); // Debugging log

        // Validate request
        if (!Answer || Answer.trim() === '') {
            return res.status(400).json({ message: "Answer is required." });
        }

        // Create and save the poll
        const poll = new TextPoll({
            Answer,
        });

        await poll.save();
        res.status(201).json({ message: "Text poll created successfully", poll });
    } catch (error) {
        console.error("Error creating poll: ", error); // Debugging log
        res.status(500).json({ message: "Error creating poll", error: error.message });
    }
};
