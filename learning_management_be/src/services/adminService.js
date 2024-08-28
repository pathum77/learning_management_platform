const config = require('../configs/app');
const jwt = require('jsonwebtoken');

class AdminService {
    constructor(userModel) {
        this.userModel = userModel;
    };

    async login (username, password) {
        if(username === config.admin_cred.username && password === config.admin_cred.password) {
            const token = jwt.sign({ role: 'admin' }, config.jwt_secret, { expiresIn: '7d' });
            return { token: token };
        } else {
            return { error: 'Invalid username or password' };
        }
    };
};

module.exports = AdminService;