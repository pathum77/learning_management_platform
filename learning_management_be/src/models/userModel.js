const db = require('../configs/db');

class UserModel {
    async getUserDataByEmail(email) {
        const query = 'SELECT id, first_name, last_name, email, status, password FROM user WHERE email = ?';
        return await db.execute(query, [email]);
    }
    
    async getUserDataById(id) {
        const query = 'SELECT id, first_name, last_name, email FROM user WHERE id = ? AND status = 1';
        return await db.execute(query, [id]);
    }
    
    async addNewUser(first_name, last_name, email, password) {
        const query = 'INSERT INTO user (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(query, [first_name, last_name, email, password]);
        return result.insertId;
    }
    
    async getCourseById(id) {
        const query = 'SELECT id, name, lesson_count, img, status FROM course WHERE id = ?';
        return await db.execute(query, [id]);
    }
    
    async enrollForCourse(userId, courseId) {
        const query = 'INSERT INTO enrollment (user_id, course_id) VALUES (?, ?)';
        return await db.execute(query, [userId, courseId]);
    }
    
    async checkUserEnrolledForCourse(user_id, course_id) {
        const query = 'SELECT * FROM enrollment WHERE user_id = ? AND course_id = ?';
        return db.execute(query, [user_id, course_id]);
    }
    
    async withdrawFromCourse(userId, courseId) {
        const query = 'DELETE FROM enrollment WHERE user_id = ? AND course_id = ?';
        return await db.execute(query, [userId, courseId]);
    }
    
    async getUserEnrolledCourses(id) {
        const query = 'SELECT c.id, c.name, c.lesson_count, c.img, c.status FROM course c INNER JOIN enrollment e ON c.id = e.course_id WHERE e.user_id = ?';
        return db.execute(query, [id]);
    };
};

module.exports = new UserModel();