const db = require('../configs/db');

class CourseModel {

    async getAllCourses() {
        const query = 'SELECT * FROM course WHERE status = 1';
        return await db.execute(query);
    }

    async getCourseByName(name) {
        const query = 'SELECT id, name, lesson_count, img, description, status FROM course WHERE name = ? AND status = 1';
        return await db.execute(query, [name]);
    }

    async getCourseById(id) {
        const query = 'SELECT id, name, lesson_count, img, description, status FROM course WHERE id = ? AND status = 1';
        return await db.execute(query, [id]);
    }

    async getLatestCourses() {
        const query = 'SELECT id, name, lesson_count, img, description FROM course WHERE status = 1 ORDER BY created_at DESC LIMIT 6';
        return await db.execute(query);
    };

    async getCourseByUserEnrolled(id) {
        const query = 'SELECT course_id FROM enrollment WHERE user_id = ?';
        return await db.execute(query, [id]);
    }

    async addCourse(name, lesson_count, img, description) {
        const query = 'INSERT INTO course (name, lesson_count, img, description) VALUES (?, ?, ?, ?)';
        return await db.execute(query, [name, lesson_count, img, description]);
    }

    async updateCourse(id, name, lesson_count, img, description) {
        const query = 'UPDATE course SET name = COALESCE(?, name), lesson_count = COALESCE(?, lesson_count), img = COALESCE(?, img), description = COALESCE(?, description) WHERE id = ?';
        return await db.execute(query, [name, lesson_count, img, description, id]);
    }

    async deleteCourse(id) {
        const query = 'UPDATE course SET status = 0 WHERE id = ? AND status = 1';
        return await db.execute(query, [id]);
    }
};

module.exports = new CourseModel();