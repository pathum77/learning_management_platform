const jwt = require('jsonwebtoken');
const config = require('../configs/app');

exports.verifyJWT = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ title: 'Not Authorized', message: 'Missing or malformed token' });
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.jwt_secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ title: 'Not Authorized', message: 'Invalid or expired token' });
            }
            req.user = decoded;
            next();
        });
    } catch (err) {
        return res.status(500).json({ title: 'Server Error', message: 'An unexpected error occurred' });
    }
};

exports.checkRole = (allowedRoles) => (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ title: 'Forbidden!', message: 'Sorry, you do not have the necessary permissions to proceed this action.' });
    }
    next();
};