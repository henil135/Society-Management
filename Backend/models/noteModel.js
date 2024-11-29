const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    des: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'resident', 'security'], 
        default: 'resident' 
    },
}, {
    timestamps: true 
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
