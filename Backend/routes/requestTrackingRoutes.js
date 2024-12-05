const express = require('express');
const { createRequest, getAllRequests, getRequestById, updateRequest, deleteRequest } = require('../controller/requestTrackingController');
const { adminprotect } = require('../middleware/protect');
const router = express.Router();

router.post('/addrequest',adminprotect, createRequest);
router.get('/',adminprotect, getAllRequests);
router.get('/:id',adminprotect, getRequestById);
router.put('/updaterequest/:id',adminprotect, updateRequest);
router.delete('/deleterequest/:id',adminprotect, deleteRequest);

module.exports = router;

