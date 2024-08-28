const multer = require('multer');
const path = require('path');

exports.setupMulter = (destinationFolder) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, destinationFolder);
        },
        filename: (req, file, cb) => {
            const filename = file.originalname.slice(0, file.originalname.lastIndexOf('.')) + '-';
            const ext = path.extname(file.originalname);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, filename + uniqueSuffix + ext);
        },
    });

    const upload = multer({ storage: storage });

    return upload;
};