import axios from "axios";
import { CONSTANTS } from "@/utils/constants";
import { useAuthStore } from '~/store/index.js';

export const login = async (data) => {
    const response = await axios.post(`${CONSTANTS.BASE_URL}/admin/login`, data);
    return response;
};

export const getCourses = async () => {
    const response = await axios.get(`${CONSTANTS.BASE_URL}/courses/get-courses`, {
        headers: {
            "Authorization": `Bearer ${useAuthStore().adminToken}`
        }
    });
    return response;
};

export const createCourse = async (data) => {
    const response = await axios.post(`${CONSTANTS.BASE_URL}/courses/add-course`, data, {
        headers: {
            "Authorization": `Bearer ${useAuthStore().adminToken}`
        }
    });
    return response;
};

export const deleteCourse = async (id) => {
    const response = await axios.delete(`${CONSTANTS.BASE_URL}/courses/delete-course/${id}`, {
        headers: {
            "Authorization": `Bearer ${useAuthStore().adminToken}`
        }
    });
    return response;
};

export const updateCourse = async (data) => {
    const response = await axios.post(`${CONSTANTS.BASE_URL}/courses/update-course`, data, {
        headers: {
            "Authorization": `Bearer ${useAuthStore().adminToken}`
        }
    });
    return response;
}

export const getUsers = async () => {
    const response = await axios.get(`${CONSTANTS.BASE_URL}/admin/get-all-users`, {
        headers: {
            "Authorization": `Bearer ${useAuthStore().adminToken}`
        }
    });
    return response;
}

export const deleteUser = async (id) => {
    const response = await axios.delete(`${CONSTANTS.BASE_URL}/admin/delete-user/${id}`, {
        headers: {
            "Authorization": `Bearer ${useAuthStore().adminToken}`
        }
    });
    return response;
}