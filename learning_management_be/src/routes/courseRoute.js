const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const courseValidation = require('../validations/courseValidation');
const auth = require('../middlewares/auth');
const { setupMulter } = require('../utils/multer');

const imgUpload = setupMulter('public/uploads/courses');

router.get('/get-courses', auth.verifyJWT, courseController.getAllCourses);
router.get('/get-course/:id', courseController.getCourse);
router.get('/get-latest-courses', courseController.getLatestCourses);
router.post('/add-course', auth.verifyJWT, auth.checkRole(['admin']), imgUpload.single('img'), courseValidation.validateCourseRegistration, courseController.addCourse);
router.post('/update-course', auth.verifyJWT, auth.checkRole(['admin']), imgUpload.single('img'), courseController.updateCourse);
router.delete('/delete-course/:id', auth.verifyJWT, auth.checkRole(['admin']), courseController.deleteCourse);

module.exports = router;