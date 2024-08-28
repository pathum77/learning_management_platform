const CourseService = require('../services/courseService');
const courseModel = require('../models/courseModel');

const courseService = new CourseService(courseModel);

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await courseService.getAllCourses();

        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({ title: 'Error!', message: error.message });
    }
};

exports.getCourse = async (req, res) => {
    try {
        const courseId = req.params.id;

        const course = await courseService.getCourse(courseId);

        if (course.error) {
            return res.status(400).json({ title: 'Error!', message: course.error });
        } else {
            return res.status(200).json(course);
        }
    } catch (error) {
        return res.status(500).json({ title: 'Error!', message: error.message });
    }
};

exports.addCourse = async (req, res) => {
    try {
        const courseData = req.body;
        courseData.img = req.file.filename;

        const result = await courseService.addCourse(courseData);

        if (result.error) {
            return res.status(400).json({ title: 'Error!', message: result.error });
        } else {
            return res.status(201).json({ title: 'Success!', message: 'Course added successfully' });
        }

    } catch (error) {
        return res.status(500).json({ title: 'Error!', message: error.message });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const courseData = req.body;
        
        courseData.img = req.file ? req.file.filename : null;

        const result = await courseService.updateCourse(courseData);

        if (result.error) {
            return res.status(400).json({ title: 'Error!', message: result.error });
        } else {
            return res.status(200).json({ title: 'Success!', message: 'Course updated successfully' });
        }
    } catch (error) {
        return res.status(500).json({ title: 'Error!', message: error.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;

        const result = await courseService.deleteCourse(courseId);

        if (result.error) {
            return res.status(400).json({ title: 'Error!', message: result.error });
        } else {
            return res.status(200).json({ title: 'Success!', message: 'Course deleted successfully' });
        }
    } catch (error) {
        return res.status(500).json({ title: 'Error!', message: error.message });
    }
};