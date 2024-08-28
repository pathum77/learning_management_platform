const { body, validationResult } = require('express-validator');

exports.validateAdminLogin = [
    body('username')
        .notEmpty().withMessage('Username cannot be empty!'),
    body('password')
        .notEmpty().withMessage('Password cannot be empty!'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const customError = errors.errors.reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {});
            return res.status(400).json({ title: 'Error!', message: customError });
        }
        next();
    }
];