const { body, validationResult } = require('express-validator');

exports.validateUserRegistration = [
    body('first_name')
        .notEmpty().withMessage('First name cannot be empty!'),
    body('last_name')
        .notEmpty().withMessage('Last name cannot be empty!'),
    body('email')
        .notEmpty().withMessage('Email cannot be empty!')
        .isEmail().withMessage('Email must be a valid email address!'),
    body('password')
        .notEmpty().withMessage('Password cannot be empty!')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long!'),

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

exports.validateUserLogin = [
    body('email')
        .notEmpty().withMessage('Email cannot be empty!')
        .isEmail().withMessage('Email must be a valid email address!'),
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

exports.validateCourseEnrollment = [
    body('courseId')
        .notEmpty().withMessage('Course ID cannot be empty!')
        .isInt({ min: 1 }).withMessage('Course ID must be a valid number!'),

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
]