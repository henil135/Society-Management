const multer = require('multer');
const path = require('path');

// Configure storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); 
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});


const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        
        const filetypes = /pdf|jpg/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = file.mimetype === 'application/pdf' || file.mimetype === 'image/jpeg';

        if (mimetype && extname) {
            cb(null, true);
        } else {
            cb(new Error('Error: Only PDF and JPG files are allowed!')); 
        }
    }
});

module.exports = upload;
