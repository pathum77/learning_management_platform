const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userValidation = require('../validations/userValidation');
const auth = require('../middlewares/auth');

router.post('/register', userValidation.validateUserRegistration, userController.register);
router.post('/login', userValidation.validateUserLogin, userController.login);
router.get('/get-userdata', auth.verifyJWT, userController.getUserData);
router.post('/enroll-course', auth.verifyJWT, userValidation.validateCourseEnrollment, userController.enrollCourse);
router.post('/withdraw-course', auth.verifyJWT, userValidation.validateCourseEnrollment, userController.withdrawCourse);
router.get('/enrolled-courses', auth.verifyJWT, userController.getEnrolledCourses);

module.exports = router;