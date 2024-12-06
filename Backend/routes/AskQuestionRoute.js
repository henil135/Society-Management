const express = require('express');
const { createQuestions, GetAllQuestions, VoteAnswer, CountOfVotes } = require('../controller/AskQuestionController');
const { OwnerAdminTenantProtect } = require('../middleware/protect');
const router = express.Router();

// Create a new question 
router.post('/createQuestion',createQuestions);

// Get all questions 
router.get('/GetAllQuestion',GetAllQuestions);

// Vote for an answer 
router.post('/questions/:id/:AnswerId/vote',OwnerAdminTenantProtect,VoteAnswer);

// Get the count of votes 
router.post('/questions/:id',CountOfVotes);


module.exports = router;