const express = require('express');
const { createAnnouncement, getAllAnnouncements, getAnnouncementById, updateAnnouncement, deleteAnnouncement, getAcceptedUsers, declineAnnouncement, acceptAnnouncement } = require('../controller/annoucementController');
const { OwnerAdminTenantProtect, adminprotect, ownerOrTenantProtect } = require('../middleware/protect');
const router = express.Router();

router.post('/addannouncement', createAnnouncement);
router.get('/getannouncement', getAllAnnouncements);
router.get('/:id', getAnnouncementById);
router.put('/updateannouncement/:id', updateAnnouncement);
router.delete('/deleteannouncement/:id', deleteAnnouncement);

// get acceptannoucement notification
router.post('/acceptannoucement', acceptAnnouncement);
// get declineAnnouncement notification
router.post('/declineAnnouncement', declineAnnouncement);
// get getAcceptedUsers 
router.get('/getAcceptedUsers/:announcementId', getAcceptedUsers);

module.exports = router;
