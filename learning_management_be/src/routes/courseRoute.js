const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const courseValidation = require('../validations/courseValidation');
const auth = require('../middlewares/auth');
const { setupMulter } = require('../utils/multer');

const imgUpload = setupMulter('public/uploads/courses');

router.get('/get-courses', courseController.getAllCourses);
router.get('/get-course/:id', courseController.getCourse);
router.post('/add-course', auth.verifyJWT, auth.checkRole(['admin']), imgUpload.single('img'), courseValidation.validateCourseRegistration, courseController.addCourse);
router.post('/update-course', auth.verifyJWT, auth.checkRole(['admin']), courseValidation.validateCourseRegistration, courseController.updateCourse);
router.post('/delete-course', auth.verifyJWT, auth.checkRole(['admin']), courseController.deleteCourse);

module.exports = router;