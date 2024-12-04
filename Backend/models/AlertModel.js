const mongoose = require('mongoose');

const AlertSchema = mongoose.Schema({
    AlertType: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    }

}, { timestamps: true });


module.exports = mongoose.model('Alert', AlertSchema);

