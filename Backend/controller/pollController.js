const Poll = require("../models/PollModel");

// Create a new poll
exports.createPoll = async (req, res) => {
    const { polls, question, options, createdBy } = req.body;

    // Validation for required fields
    if (!polls || !question || !options || options.length < 2) {
        return res.status(400).json({ error: 'Poll type, question, and at least two options are required.' });
    }

    try {
        const poll = new Poll({ polls, question, options, createdBy  });
        await poll.save();

        // Notify all clients about the new poll
        const io = req.app.get('io');
        io.emit('newPoll', poll); // Emit the 'newPoll' event

        res.status(201).json({ message: 'Poll created successfully.', poll });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create poll.' });
    }
}

// Get all polls

exports.AllPolls = async (req, res) => {
    try {
        const polls = await Poll.find();
        res.json(polls);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch polls.' });
    }
}


// Vote on a poll

exports.votePoll = async (req, res) => {
    const { id } = req.params;
    const { option } = req.body;

    try {
        const poll = await Poll.findById(id);
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



