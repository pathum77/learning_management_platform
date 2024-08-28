const AdminService = require('../services/adminService');
const adminModel = require('../models/adminModel');

const adminService = new AdminService(adminModel);

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const result = await adminService.login(username, password);
    if (result.error) {
        return res.status(400).json({ title: 'Error!', message: result.error });
    } else {
        return res.status(200).json({ title: 'Success!', message: 'Admin logged in successfully', token: result.token });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await adminService.getAllUsers();
        return res.status(200).json({ title: 'Success!', message: 'Users retrieved successfully', users: users });
    } catch (error) {
        return res.status(500).json({ title: 'Error!', message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await adminService.deleteUser(id);
        if (result.error) {
            return res.status(400).json({ title: 'Error!', message: result.error });
        } else {
            return res.status(200).json({ title: 'Success!', message: 'User deleted successfully' });
        }
    } catch (error) {
        return res.status(500).json({ title: 'Error!', message: error.message });
    }
}

exports.enrollUserForCourse = async (req, res) => {
    try {
        const { userId, courseId } = req.body;
        const result = await adminService.enrollUserForCourse(userId, courseId);
        if (result.error) {
            return res.status(400).json({ title: 'Error!', message: result.error });
        } else {
            return res.status(200).json({ title: 'Success!', message: 'User enrolled successfully' });
        }
    } catch (error) {
        return res.status(500).json({ title: 'Error!', message: error.message });
    }
}

exports.withdrawUserFromCourse = async (req, res) => {
    try {
        const { userId, courseId } = req.body;
        const result = await adminService.withdrawUserFromCourse(userId, courseId);
        if (result.error) {
            return res.status(400).json({ title: 'Error!', message: result.error });
        } else {
            return res.status(200).json({ title: 'Success!', message: 'User withdrawn successfully' });
        }
    } catch (error) {
        return res.status(500).json({ title: 'Error!', message: error.message });
    }
}