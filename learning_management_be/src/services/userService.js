const jwt = require('jsonwebtoken');
const config = require('../configs/app');
const bcrypt = require('bcryptjs');

class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async register(userData) {
        const [user] = await this.userModel.getUserDataByEmail(userData.email);

        if (user.length > 0) {
            return { alreadyRegistered: true };
        } else {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(userData.password, salt);

            const result = await this.userModel.addNewUser(userData.first_name, userData.last_name, userData.email, hashPassword);

            const token = jwt.sign({ userId: result, email: userData.email }, config.jwt_secret, { expiresIn: '7d' });
            return { alreadyRegistered: false, token: token };
        }
    };

    async login(email, password) {
        const [user] = await this.userModel.getUserDataByEmail(email);

        if (user.length === 0) {
            return { exist: false };
        } else if (user[0].status === 0) {
            return { blocked: true };
        } else {
            const match = await bcrypt.compare(password, user[0].password);
            if (!match) {
                return { exist: false };
            } else {
                const token = jwt.sign({ userId: user[0].id, email: user[0].email }, config.jwt_secret, { expiresIn: '7d' });
                return { exist: true, blocked: false, token: token };
            }
        }
    };

    async getUserData(id) {
        const [user] = await this.userModel.getUserDataById(id);
        return user;
    }

    async enrollForCourse(userId, courseId) {
        const [course] = await this.userModel.getCourseById(courseId);
        const [user] = await this.userModel.getUserDataById(userId);

        if (course.length === 0 || user.length === 0 || course.length === 0 && user.length === 0) {
            return { error: 'Course or user not found' };
        } else {
            const [enrolled] = await this.userModel.checkUserEnrolledForCourse(userId, courseId);
            if (enrolled.length > 0) {
                return { error: 'Already enrolled for this course' };
            } else {
                await this.userModel.enrollForCourse(userId, courseId);
                return { error: null }
            }
        }
    }

    async withdrawFromCourse(userId, courseId) {        
        const [enrolled] = await this.userModel.checkUserEnrolledForCourse(userId, courseId);
        if (enrolled.length === 0) {
            return { error: 'Not enrolled for this course' };
        } else {
            await this.userModel.withdrawFromCourse(userId, courseId);
            return { error: null }
        }
    };

    async getUserEnrolledCourses(id) {
        const [courses] = await this.userModel.getUserEnrolledCourses(id);
        return courses;
    }
};

module.exports = UserService;