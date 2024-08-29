import axios from "axios";
import { CONSTANTS } from "@/utils/constants";
import { useAuthStore } from '~/store/index.js';

export const getCourses = async () => {
    const response = await axios.get(`${CONSTANTS.BASE_URL}/courses/get-courses`, {
        headers: {
            "Authorization": `Bearer ${useAuthStore().userToken}`
        }
    });
    return response;
};

export const getLatestCourses = async () => {
    const response = await axios.get(`${CONSTANTS.BASE_URL}/courses/get-latest-courses/?userId=${useAuthStore().userToken}`, {
        headers: {
            "Authorization": `Bearer ${useAuthStore().userToken}`
        }
    });
    return response;
};

export const getUserEnrolledCourses = async () => {
    const response = await axios.get(`${CONSTANTS.BASE_URL}/users/enrolled-courses`, {
        headers: {
            "Authorization": `Bearer ${useAuthStore().userToken}`
        }
    });
    return response;
}

export const enrollCourse = async (data) => {
    const response = await axios.post(`${CONSTANTS.BASE_URL}/users/enroll-course`, data, {
        headers: {
            "Authorization": `Bearer ${useAuthStore().userToken}`
        }
    });
    return response;
}

export const withdrawCourse = async (data) => {
    const response = await axios.post(`${CONSTANTS.BASE_URL}/users/withdraw-course`, data, {
        headers: {
            "Authorization": `Bearer ${useAuthStore().userToken}`
        }
    });
    return response;
}