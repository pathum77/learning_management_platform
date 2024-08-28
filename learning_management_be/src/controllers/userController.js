const UserService = require('../services/userService');
const userModel = require('../models/userModel');

const userService = new UserService(userModel);

exports.register = async (req, res) => {
    try {
        const userData = req.body;

        const result = await userService.register(userData);

        if (result.alreadyRegistered) {
            return res.status(400).json({ title: 'Error!', message: 'User already registered' });
        } else {
            return res.status(201).json({ title: 'Success!', message: 'User registered successfully', token: result.token });
        }

    } catch (error) {
        return res.status(500).json({ title: 'Error!', message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userService.login(email, password);

        if(!user.exist) {
            return res.status(400).json({ title: 'Error!', message: 'Invalid email or password' });
        } else if(user.blocked) {
            return res.status(400).json({ title: 'Error!', message: 'User is blocked' });
        } else {
            return res.status(200).json({ title: 'Success!', message: 'User logged in successfully', token: user.token });
        }
    } catch (error) {
        return res.status(500).json({ title: 'Error!', message: error.message });
    }
};

exports.getUserData = async (req, res) => {
    try {
        const id = req.user.userId;

        const user = await userService.getUserData(id);

        if(user.length === 0) {
            return res.status(400).json({ title: 'Error!', message: 'User not found' });
        } else {
            return res.status(200).json({ title: 'Success!', message: 'User data fetched successfully', user: user });
        }
    } catch (error) {
        return res.status(500).json({ title: 'Error!', message: error.message });
    }
};

exports.enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const id = req.user.userId;        

        const result = await userService.enrollForCourse(id, courseId);

        if(result.error) {
            return res.status(400).json({ title: 'Error!', message: result.error });
        } else {
            return res.status(201).json({ title: 'Success!', message: 'Course enrolled successfully' });
        }
    } catch (error) {
        return res.status(500).json({ title: 'Error!', message: error.message });
    }
};

exports.withdrawCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const id = req.user.userId;

        const result = await userService.withdrawFromCourse(id, courseId);        

        if(result.error) {
            return res.status(400).json({ title: 'Error!', message: result.error });
        } else {
            return res.status(200).json({ title: 'Success!', message: 'Course withdrawn successfully' });
        }
    } catch (error) {
        return res.status(500).json({ title: 'Error!', message: error.message });
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
        const id = req.user.userId;

        const courses = await userService.getUserEnrolledCourses(id);

        return res.status(200).json({ title: 'Success!', message: 'Enrolled courses fetched successfully', courses: courses });
    } catch (error) {
        return res.status(500).json({ title: 'Error!', message: error.message });
    }
};