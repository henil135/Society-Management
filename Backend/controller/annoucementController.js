const Announcement = require('../models/annoucementModel');
const Owner = require('../models/ownerModel');
const Tenant = require('../models/tenantModel');

// Create a new announcement
exports.createAnnouncement = async (req, res) => {
    try {
        const { Announcement_Title, Description, Announcement_Date, Announcement_Time, role } = req.body;

        if (!Announcement_Title || !Description || !Announcement_Date || !Announcement_Time) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const announcement = new Announcement({
            Announcement_Title,
            Description,
            Announcement_Date,
            Announcement_Time,
            role,
        });

        await announcement.save();

        req.io.emit('newAnnouncement', {
            id: announcement._id,
            Announcement_Title,
            Description,
            Announcement_Date,
            Announcement_Time,
            role,
        });

        res.status(201).json({ message: 'Announcement created successfully', });
    } catch (error) {
        res.status(400).json({ message: 'Error creating announcement', error });
    }
};


// Get all announcements
exports.getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.status(200).json({ message: 'Announcements retrieved successfully', announcements });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving announcements', error });
    }
};

// Get an announcement by ID
exports.getAnnouncementById = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }
        res.status(200).json({ message: 'Announcement retrieved successfully', announcement });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving announcement', error });
    }
};

// Update an announcement by ID
exports.updateAnnouncement = async (req, res) => {
    try {
        const { Announcement_Title, Description, Announcement_Date, Announcement_Time, role } = req.body;

        if (!Announcement_Title || !Description || !Announcement_Date || !Announcement_Time) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const announcement = await Announcement.findByIdAndUpdate(
            req.params.id,
            { Announcement_Title, Description, Announcement_Date, Announcement_Time, role },
            { new: true, runValidators: true }
        );

        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        res.status(200).json({ message: 'Announcement updated successfully', announcement });
    } catch (error) {
        res.status(400).json({ message: 'Error updating announcement', error });
    }
};

// Delete an announcement by ID
exports.deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findByIdAndDelete(req.params.id);
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }
        res.status(200).json({ message: 'Announcement deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting announcement', error });
    }
};


// Accept Annoucement
exports.acceptAnnouncement = async (req, res) => {
    const { userId, announcementId } = req.body;

    try {
        // Validate input
        if (!userId || !announcementId) {
            return res.status(400).json({ message: 'User Id or Announcement ID is required' });
        }

        // Find the announcement by ID
        const announcement = await Announcement.findById(announcementId);
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        // Add userId to acceptedUsers if not already present
        if (!announcement.acceptedUsers.includes(userId)) {
            announcement.acceptedUsers.push(userId);
            await announcement.save();

            // Emit update to connected clients
            req.io.emit('announcementAccepted', {
                announcementId,
                userId,
            });
        }

        console.log(announcement);

        res.status(200).json({ message: 'Announcement accepted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving announcement', error: error.message });
    }
};

exports.declineAnnouncement = async (req, res) => {
    const { announcementId } = req.body; // Extract from request body

    try {
        // Validate input
        if (!announcementId) {
            return res.status(400).json({ message: 'Announcement ID is required' });
        }

        // Find the announcement by ID
        const announcement = await Announcement.findById(announcementId);
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        // Optional: Perform any other operations (e.g., log the decline action)

        res.status(200).json({ message: 'Announcement declined successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Error processing request',
            error: error.message,
        });
    }
};


exports.getAcceptedUsers = async (req, res) => {
    try {
        const { announcementId } = req.params;

        // Find the announcement
        const announcement = await Announcement.findById(announcementId)
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        // Fetch accepted users from both Tenant and Owner models
        const tenantUsers = await Tenant.find({ _id: { $in: announcement.acceptedUsers } }, 'Full_name');
        const ownerUsers = await Owner.find({ _id: { $in: announcement.acceptedUsers } }, 'Full_name');

        // Combine tenant and owner data into one array
        const acceptedUsers = [...tenantUsers, ...ownerUsers];

        res.status(200).json({ acceptedUsers });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching accepted users', error: error.message });
    }
};