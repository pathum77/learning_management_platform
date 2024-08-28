const db = require('../configs/db');

class AdminModel {

    async getAllUsers() {
        const query = 'SELECT * FROM user WHERE status = 1';
        return await db.execute(query);
    }

    async getUserDataById(id) {
        const query = 'SELECT id, first_name, last_name, email FROM user WHERE id = ? AND status = 1';
        return await db.execute(query, [id]);
    }

    async getCourseDataById(id) {
        const query = 'SELECT id, name, lesson_count, img, description FROM course WHERE id = ? AND status = 1';
        return await db.execute(query, [id]);
    }

    async checkUserEnrolledForCourse(user_id, course_id) {
        const query = 'SELECT * FROM enrollment WHERE user_id = ? AND course_id = ?';
        return db.execute(query, [user_id, course_id]);
    }

    async deleteUser(id) {
        const query = 'UPDATE user SET status = 0 WHERE id = ? AND status = 1';
        return await db.execute(query, [id]);
    }

    async enrollUserForCourse(userId, courseId) {
        const query = 'INSERT INTO enrollment (user_id, course_id) VALUES (?, ?)';
        return await db.execute(query, [userId, courseId]);
    }

    async withdrawUserFromCourse(userId, courseId) {
        const query = 'DELETE FROM enrollment WHERE user_id = ? AND course_id = ?';
        return await db.execute(query, [userId, courseId]);
    }
};

module.exports = new AdminModel();