const express = require('express');
const { createComplaint, getAllComplaints, getComplaintById, updateComplaint, deleteComplaint } = require('../controller/createComplaintController');
const { adminprotect } = require('../middleware/protect');

const router = express.Router();

router.post('/addcomplaint',adminprotect, createComplaint);
router.get('/',adminprotect, getAllComplaints);
router.get('/:id',adminprotect, getComplaintById);
router.put('/updatecomplaint/:id',adminprotect, updateComplaint);
router.delete('/deletecomplaint/:id',adminprotect, deleteComplaint);

module.exports = router;
