const express = require('express');
const { createComplaint, getAllComplaints, getComplaintById, deleteComplaint } = require('../controller/serviceComplaintContoller');
const { ownerOrTenantProtect } = require('../middleware/protect');

const router = express.Router();

router.post('/addcomplaint',ownerOrTenantProtect, createComplaint);
router.get('/',ownerOrTenantProtect, getAllComplaints);
router.get('/:id',ownerOrTenantProtect, getComplaintById);
router.delete('/deletecomplaint/:id',ownerOrTenantProtect, deleteComplaint);

module.exports = router;