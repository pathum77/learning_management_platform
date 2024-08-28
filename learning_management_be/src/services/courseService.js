const fs = require('fs');

class CourseService {
    constructor(userModel) {
        this.userModel = userModel;
    };

    async getAllCourses() {
        const [courses] = await this.userModel.getAllCourses();
        return courses;
    };

    async getCourse(id) {
        const [course] = await this.userModel.getCourseById(id);

        if (course.length === 0) {
            return { error: 'Course not found!' };
        } else {
            return course;
        }
    };

    async addCourse(data) {
        const filePathToDelete = `public/uploads/courses/${data.img}`;
        try {

            const [course] = await this.userModel.getCourseByName(data.name);

            if (course.length > 0) {
                fs.unlinkSync(filePathToDelete);
                return { error: 'Course already exists!' };
            } else {
                await this.userModel.addCourse(data.name, data.lesson_count, data.img, data.description);
                return { error: null };
            }
        } catch (error) {
            fs.unlinkSync(filePathToDelete);
            return { error: error.message };
        }
    };

    async updateCourse(data) {        
        if(!data.id) {
            return { error: 'Course not found!' };
        } else {
            const [course] = await this.userModel.getCourseById(data.id);

            if (course.length === 0) {
                return { error: 'Course not found!' };
            } else {
                const name = !data.name ? null : data.name;
                const lesson_count = !data.lesson_count ? null : data.lesson_count;
                const description = !data.description ? null : data.description;

                if (!name && !lesson_count && !description && !data.img) {
                    return { error: 'No data to update!' };
                } else {
                    const filePath = 'public/uploads/courses/';
                    try {
                        await this.userModel.updateCourse(data.id, name, lesson_count, data.img, description);

                        if (data.img) {
                            const [course] = await this.userModel.getCourseById(data.id);
                            fs.unlinkSync(filePath + course[0].img);
                        }
            
                        return { error: null };
                    } catch (error) {
                        if (data.img) {
                            fs.unlinkSync(filePath + data.img);
                        }
                        return { error: error.message };
                    }
                }
            }
        }
    };

    async deleteCourse(id) {
        const [course] = await this.userModel.getCourseById(id);
        if (course.length === 0) {
            return { error: 'Course not found!' };
        } else {
            await this.userModel.deleteCourse(id);
            return { error: null };
        }
    };
};

module.exports = CourseService;