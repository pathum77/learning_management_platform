const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminValidation = require('../validations/adminValidation');
const auth = require('../middlewares/auth');

router.post('/login', adminValidation.validateAdminLogin, adminController.login);
router.get('/get-all-users', auth.verifyJWT, auth.checkRole(['admin']), adminController.getAllUsers);
router.patch('/delete-user/:id', auth.verifyJWT, auth.checkRole(['admin']), adminController.deleteUser);
router.post('/enroll-user', auth.verifyJWT, auth.checkRole(['admin']), adminValidation.validateUserAndCourseEnrollment, adminController.enrollUserForCourse);
router.post('/withdraw-user', auth.verifyJWT, auth.checkRole(['admin']), adminValidation.validateUserAndCourseEnrollment, adminController.withdrawUserFromCourse);

module.exports = router;