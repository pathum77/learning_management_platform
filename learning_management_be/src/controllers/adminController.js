const AdminService = require('../services/adminService');
const adminModel = require('../models/adminModel');

const adminService = new AdminService(adminModel);

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const result = await adminService.login(username, password);

    if(result.error) {
        return res.status(400).json({ title: 'Error!', message: result.error });
    } else {
        return res.status(200).json({ title: 'Success!', message: 'Admin logged in successfully', token: result.token });
    }
};