const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminValidation = require('../validations/adminValidation');
const auth = require('../middlewares/auth');

router.post('/login', adminValidation.validateAdminLogin, adminController.login);

module.exports = router;