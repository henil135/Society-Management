const Note = require('../models/noteModel'); // Adjust path as necessary

// Create a new note
exports.createNote = async (req, res) => {
    try {
        const { title, des, date, role } = req.body;

        // Check if all fields are provided
        if (!title || !des || !date ) {
            return res.status(400).json({
                success: false,
                message: "All fields (Title, Description, Date) are required",
            });
        }

        // Create a new note document
        const newNote = new Note({
            title,
            des,
            date,
            role: role || 'resident',
        });

        await newNote.save();

        return res.status(201).json({
            success: true,
            message: "Note created successfully",
            note: newNote,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create note",
        });
    }
};
// Get all notes or notes by ID
exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        if (!notes || notes.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No notes found",
            });
        }
        return res.json({
            success: true,
            notes,
        });
    } catch (error) {
        console.error("Error fetching notes:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch notes",
        });
    }
};

// Get a single note by ID
exports.getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            });
        }
        return res.json({
            success: true,
            note,
        });
    } catch (error) {
        console.error("Error fetching note by ID:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch note",
        });
    }
};
// Edit a note by ID
exports.updateNote = async (req, res) => {
    try {
        const { title, des, date, role } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                title,
                des,
                date,
                role: role || 'resident',
            },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({
                success: false,
                message: "Note is not found",
            });
        }
        return res.json({
            success: true,
            message: "Note updated successfully.....",
            note: updatedNote,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update note",
        });
    }
};
