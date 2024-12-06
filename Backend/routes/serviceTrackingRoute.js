const express = require('express');
const { ownerOrTenantProtect } = require('../middleware/protect');
const { createRequest, getAllRequests, getRequestById, deleteRequest } = require('../controller/serviceTrackingController');

const router = express.Router();

router.post('/addrequest',ownerOrTenantProtect, createRequest);
router.get('/',ownerOrTenantProtect, getAllRequests);
router.get('/:id',ownerOrTenantProtect, getRequestById);
router.delete('/deleterequest/:id',ownerOrTenantProtect, deleteRequest);

module.exports = router;
