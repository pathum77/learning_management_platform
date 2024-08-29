const { body, validationResult } = require('express-validator');

exports.validateCourseRegistration = [
    body('name')
        .notEmpty().withMessage('Course name cannot be empty!'),
    body('lesson_count')
        .notEmpty().withMessage('Lesson count cannot be empty!'),
    body('description')
        .notEmpty().withMessage('Description cannot be empty!'),

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