const express = require('express');
const { createMultichoicePoll, MultichoiceAllPolls, MultichoicevotePoll, createRankingPoll, RankingVolePoll, createRatingPoll, RatingVolePoll, craeteNumericPoll, createTextPoll } = require("../controller/PollController");

const router = express.Router();

// MultichoicePoll 
// Create 
router.post('/CreateMultichoicePoll', createMultichoicePoll);

// Get all polls
router.get('/allPoll', MultichoiceAllPolls);

// Vote on a poll
router.post('/MultichoiceVotePoll/:id', MultichoicevotePoll);


// Ranking polls 
// create
router.post('/CreateRankingPoll', createRankingPoll);

// Vote on a poll
router.post('/RankingVotePoll/:id', RankingVolePoll);


// Rating polls
// create
router.post('/CreateRatingPoll', createRatingPoll);

// Vote on a poll
router.post('/RatingVotePoll/:id', RatingVolePoll);

// Numeric polls 
// create
router.post('/CreateNumericPoll', craeteNumericPoll);

// Text  polls
// create 
router.post('/CreateTextPoll', createTextPoll);


module.exports = router;

