const express = require('express');
const { createAnnouncement, getAllAnnouncements, getAnnouncementById, updateAnnouncement, deleteAnnouncement } = require('../controller/annoucementController');
const router = express.Router();

router.post('/addannouncement', createAnnouncement);
router.get('/getannouncement', getAllAnnouncements);
router.get('/:id', getAnnouncementById);
router.put('/updateannouncement/:id', updateAnnouncement);
router.delete('/deleteannouncement/:id', deleteAnnouncement);

module.exports = router;
