const express = require('express');
const { createPoll, AllPolls, votePoll, pollresults } = require('../controller/pollController');
const router = express.Router();

// Create a new poll
router.post('/CreatePoll', createPoll);

// Get all polls
router.get('/allPoll', AllPolls);

// Vote on a poll
router.post('/VotePoll/:id', votePoll);


module.exports = router;

