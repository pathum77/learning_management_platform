const fs = require('fs');
const jwt = require('jsonwebtoken');
const config = require('../configs/app');

class CourseService {
    constructor(userModel) {
        this.userModel = userModel;
    };

    async getAllCourses(userId) {
        
        const [coursesEnrollment] = userId ? await this.userModel.getCourseByUserEnrolled(userId) : [];
        const [courses] = await this.userModel.getAllCourses();

        courses.forEach(course => {
            course.isEnrolled = userId ? coursesEnrollment.some(courseEnrollment => courseEnrollment.course_id === course.id) : false;
            course.img = `http://localhost:4000/public/uploads/courses/${course.img}`
        });

        return courses;
    };

    async getCourse(id) {
        const [course] = await this.userModel.getCourseById(id);

        course[0].img = `http://localhost:4000/public/uploads/courses/${course.img}`

        if (course.length === 0) {
            return { error: 'Course not found!' };
        } else {
            return course;
        }
    };

    async getLatestCourses(userId) {
             
        const [courses] = await this.userModel.getLatestCourses();
        const decodedUserId = userId !== 'null' ? await jwt.verify(userId, config.jwt_secret).userId : null;
        
        const [coursesEnrollment] = decodedUserId !== 'null' ? await this.userModel.getCourseByUserEnrolled(decodedUserId) : [];

        courses.forEach(course => {
            course.isEnrolled = coursesEnrollment.length > 0 ? coursesEnrollment.some(courseEnrollment => courseEnrollment.course_id === course.id) : false;
            course.img = `http://localhost:4000/public/uploads/courses/${course.img}`
        });

        return courses;
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
        data.name = data.name === 'null' ? null : data.name;
        data.lesson_count = data.lesson_count === 'null' ? null : data.lesson_count;
        data.description = data.description === 'null' ? null : data.description;

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
                    if (data.img) {
                        const [course] = await this.userModel.getCourseById(data.id);
                        fs.unlinkSync(filePath + course[0].img);
                    }
                    try {
                        await this.userModel.updateCourse(data.id, name, lesson_count, data.img, description);
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