const MultichoicePoll = require("../models/MultichoicePollModel");
const RankingPoll = require("../models/RankingAndRatingModel");
const NumericPoll = require("../models/NumericpollsModel");
const TextPoll = require("../models/TextpollsModel");

// MultichoicePoll 
// create
exports.createMultichoicePoll = async (req, res) => {
    const { question, options } = req.body;

    // Validate inputs
    if (!question || !options || options.length < 2) {
        return res.status(400).json({ error: 'A question and at least two options are required.' });
    }

    try {
        // Add required fields (`createdBy` and `userType`) to each option
        const formattedOptions = options.map(option => ({
            option: option.option, // Assuming options have `option` property in request
            votes: 0, // Default vote count
        }));

        // Create a new poll
        const poll = new MultichoicePoll({ question, options: formattedOptions });
        await poll.save();

        // Notify clients about the new poll
        const io = req.app.get('io');
        io.emit('newPoll', poll);

        res.status(201).json({ message: 'Poll created successfully.', poll });
    } catch (error) {
        console.error('Error creating poll:', error.message);
        res.status(500).json({ error: 'Failed to create poll.' });
    }
};

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
    const { id } = req.params; // Poll ID
    const { option } = req.body; // Option being voted for
    const userId = req.member; // ID of the voting user

    try {
        const poll = await MultichoicePoll.findById(id);
        if (!poll) {
            return res.status(404).json({ error: 'Poll not found.' });
        }

        // Find the selected option
        const selectedOption = poll.options.find(opt => opt.option === option);
        if (!selectedOption) {
            return res.status(400).json({ error: 'Option not found.' });
        }

        // Check if the user has already voted for this option
        if (selectedOption.voters.includes(userId)) {
            return res.status(400).json({ error: 'You have already voted for this option.' });
        }

        // Increment vote count and record the voter
        selectedOption.votes += 1;
        selectedOption.voters.push(userId);

        await poll.save();

        // Notify clients about the updated poll
        const io = req.app.get('io');
        io.emit('pollUpdated', poll);

        res.json({ message: 'Vote recorded successfully.', poll });
    } catch (error) {
        console.error('Error recording vote:', error.message);
        res.status(500).json({ error: 'Failed to record vote.' });
    }
};

// Ranking polls
// create

exports.createRankingPoll = async (req, res) => {
    try {
        const { question, options } = req.body;

        // Validate request body
        if (!question || !Array.isArray(options) || options.length < 2) {
            return res.status(400).json({ message: "A poll must have a question and at least two options." });
        }

        // Format options to match schema
        const formattedOptions = options.map(option => ({
            option: option.option, // Ensure this is a number
            votes: 0, // Default vote count
            voters: [], // Initialize empty voters array
            userType: option.userType, // Required field
        }));

        // Create poll
        const poll = new RankingPoll({
            question,
            options: formattedOptions,
        });

        await poll.save();
        res.status(201).json({ message: "Ranking poll created successfully", poll });
    } catch (error) {
        console.error("Error creating ranking poll:", error);
        res.status(500).json({ message: "Error creating ranking poll", error: error.message });
    }
};

// Vote on a poll
exports.RankingVotePoll = async (req, res) => {
    try {
        const { id } = req.params; // Poll ID
        const { option } = req.body; // Option being voted on
        const userId = req.member; // User ID from middleware

        // Find the poll
        const poll = await RankingPoll.findById(id);
        if (!poll) {
            return res.status(404).json({ message: "Poll not found" });
        }

        // Find the selected option
        const selectedOption = poll.options.find(o => o.option === option);
        if (!selectedOption) {
            return res.status(400).json({ message: "Invalid option" });
        }

        // Check if the user has already voted for this option
        if (selectedOption.voters.includes(userId)) {
            return res.status(400).json({ message: "You have already voted for this option" });
        }

        // Increment the vote count and add the user to the voters array
        selectedOption.votes += 1;
        selectedOption.voters.push(userId);

        await poll.save();

        // Notify clients about the poll update via Socket.io
        const io = req.app.get('io');
        io.emit('pollUpdated', poll);

        res.status(200).json({ message: "Vote recorded successfully", poll });
    } catch (error) {
        console.error("Error recording vote:", error);
        res.status(500).json({ message: "Error recording vote", error: error.message });
    }
};

// Rating polls
// create
exports.createRatingPoll = async (req, res) => {
    try {
        const { question, options } = req.body;

        // Validate request body
        if (!question || !Array.isArray(options) || options.length < 2) {
            return res.status(400).json({ message: "A poll must have a question and at least two options, and options must be an array." });
        }

        // Format options to match the schema
        const formattedOptions = options.map(option => ({
            option: option.option, // Ensure this is a number
            votes: 0, // Default vote count
            voters: [], // Initialize empty voters array
            userType: option.userType, // Include userType (e.g., 'Owner', 'Tenant')
        }));

        // Create poll
        const poll = new RankingPoll({
            question,
            options: formattedOptions,
        });

        await poll.save();
        res.status(201).json({ message: "Poll created successfully", poll });
    } catch (error) {
        console.error("Error creating rating poll:", error);
        res.status(500).json({ message: "Error creating rating poll", error: error.message });
    }
};

// Vote on a poll
exports.RatingVotePoll = async (req, res) => {
    try {
        const { id } = req.params; // Poll ID
        const { option } = req.body; // Option to vote on
        const userId = req.member; // User ID from middleware

        // Find the poll
        const poll = await RankingPoll.findById(id);
        if (!poll) {
            return res.status(404).json({ message: "Poll not found" });
        }

        // Find the option being voted on
        const selectedOption = poll.options.find(o => o.option === option);
        if (!selectedOption) {
            return res.status(400).json({ message: "Invalid option" });
        }

        // Check if the user has already voted for this option
        if (selectedOption.voters.includes(userId)) {
            return res.status(400).json({ message: "You have already voted for this option" });
        }

        // Increment vote count and add the user to the voters array
        selectedOption.votes += 1;
        selectedOption.voters.push(userId);

        await poll.save();

        // Notify via Socket.io
        const io = req.app.get('io');
        io.emit('pollUpdated', poll); // Emit the 'pollUpdated' event

        res.status(200).json({ message: "Vote recorded successfully", poll });
    } catch (error) {
        console.error("Error recording vote:", error);
        res.status(500).json({ message: "Error recording vote", error: error.message });
    }
};

// Numeric polls 
// create

// Controller for creating a numeric poll
exports.createNumericPoll = async (req, res) => {
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
            userType: req.userType,
        });

        await poll.save();
        res.status(201).json({ message: "Numeric poll created successfully", poll });
    } catch (error) {
        res.status(500).json({ message: "Error creating poll", error: error.message });
    }
}

// Controller for voting on a numeric poll
exports.voteOnNumericPoll = async (req, res) => {
    try {
        const { id } = req.params; // Poll ID
        const { vote } = req.body; // Numeric value the user votes on
        const userId = req.member; // User ID from middleware

        // Validate if the vote is a number and within the range
        if (typeof vote !== 'number') {
            return res.status(400).json({ message: "Vote must be a numeric value." });
        }

        // Fetch the poll from the database
        const poll = await NumericPoll.findById(id);
        if (!poll) {
            return res.status(404).json({ message: "Poll not found" });
        }

        // Check if the vote is within the defined range
        if (vote < poll.minValue || vote > poll.maxValue) {
            return res.status(400).json({
                message: `Vote must be between ${poll.minValue} and ${poll.maxValue}.`
            });
        }

        // Check if the user has already voted
        if (poll.voters.includes(userId)) {
            return res.status(400).json({ message: "You have already voted." });
        }

        // Add the vote to the poll and mark the user as voted
        poll.voters.push(userId);
        await poll.save();

        // Emit an event via Socket.io to notify all clients about the updated poll
        const io = req.app.get('io');
        io.emit('pollUpdated', poll); // Notify clients about the poll update

        res.status(200).json({ message: "Vote recorded successfully", poll });
    } catch (error) {
        res.status(500).json({ message: "Error recording vote", error: error.message });
    }
}

// Text  polls
// create 

exports.createTextPoll = async (req, res) => {
    try {
        const { answer } = req.body;
        console.log("Received answer: ", answer); // Debugging log

        // Validate request
        if (!answer || answer.trim() === '') {
            return res.status(400).json({ message: "Answer is required." });
        }

        // Create and save the poll
        const poll = new TextPoll({
            answer,
            userType: req.userType, // Adding user type (Owner or Tenant)
        });

        await poll.save();
        res.status(201).json({ message: "Text poll created successfully", poll });
    } catch (error) {
        console.error("Error creating poll: ", error); // Debugging log
        res.status(500).json({ message: "Error creating poll", error: error.message });
    }
}