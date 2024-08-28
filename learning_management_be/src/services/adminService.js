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

    async getAllUsers() {
        const [users] = await this.userModel.getAllUsers();
        return users;
    };

    async deleteUser(id) {
        const [user] = await this.userModel.getUserDataById(id);

        if (user.length === 0) {
            return { error: 'User not found!' };
        } else {
            await this.userModel.deleteUser(id);
            return { error: null };
        }
    };

    async enrollUserForCourse(userId, courseId) {
        const [user] = await this.userModel.getUserDataById(userId);
        const [course] = await this.userModel.getCourseDataById(courseId);
        if (user.length === 0 || course.length === 0) {
            return { error: 'User or course not found' };
        } else {
            const [enrolled] = await this.userModel.checkUserEnrolledForCourse(userId, courseId);
            if (enrolled.length > 0) {
                return { error: 'Already enrolled for this course' };
            } else {
                await this.userModel.enrollUserForCourse(userId, courseId);
                return { error: null }
            }
        }
    };

    async withdrawUserFromCourse(userId, courseId) {
        const [enrolled] = await this.userModel.checkUserEnrolledForCourse(userId, courseId);
        if (enrolled.length === 0) {
            return { error: 'Not enrolled for this course' };
        } else {
            await this.userModel.withdrawUserFromCourse(userId, courseId);
            return { error: null }
        }
    };
};

module.exports = AdminService;