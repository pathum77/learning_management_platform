class CourseService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async getAllCourses() {
        const [courses] = await this.userModel.getAllCourses();
        return courses;
    }

    async getCourse(id) {
        const [course] = await this.userModel.getCourseById(id);

        if (course.length === 0) {
            return { error: 'Course not found!' };
        } else {
            return course;
        }
    }

    async addCourse(data) {
        const [course] = await this.userModel.getCourseByName(data.name);
        if (course.length > 0) {
            return { error: 'Course already exists!' };
        } else {
            await this.userModel.addCourse(data.name, data.lesson_count, data.img, data.description);
            return { error: null };
        }
    }

};

module.exports = CourseService;