const express = require('express');
const { createMultichoicePoll, MultichoiceAllPolls, MultichoicevotePoll, createRankingPoll, createRatingPoll, createTextPoll, RankingVotePoll, RatingVotePoll, createNumericPoll, voteOnNumericPoll } = require("../controller/PollController");
const { ownerOrTenantProtect } = require('../middleware/protect');

const router = express.Router();

// MultichoicePoll 
// Create 
router.post('/CreateMultichoicePoll',ownerOrTenantProtect ,createMultichoicePoll);

// Get all polls
router.get('/allPoll',ownerOrTenantProtect, MultichoiceAllPolls);

// Vote on a poll
router.post('/MultichoiceVotePoll/:id',ownerOrTenantProtect, MultichoicevotePoll);


// Ranking polls 
// create
router.post('/CreateRankingPoll',ownerOrTenantProtect, createRankingPoll);

// Vote on a poll
router.post('/RankingVotePoll/:id',ownerOrTenantProtect, RankingVotePoll);


// Rating polls
// create
router.post('/CreateRatingPoll',ownerOrTenantProtect, createRatingPoll);

// Vote on a poll
router.post('/RatingVotePoll/:id',ownerOrTenantProtect, RatingVotePoll);

// Numeric polls 
// create
router.post('/CreateNumericPoll',ownerOrTenantProtect, createNumericPoll);
router.post('/numeric/:id',ownerOrTenantProtect, voteOnNumericPoll);

// Text  polls
// create 
router.post('/CreateTextPoll',ownerOrTenantProtect, createTextPoll);


module.exports = router;

