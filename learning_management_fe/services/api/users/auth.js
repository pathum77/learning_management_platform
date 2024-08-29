import axios from "axios";
import { CONSTANTS } from "@/utils/constants";
import { useAuthStore } from '~/store/index.js';

export const register = async (data) => {
    const response = await axios.post(`${CONSTANTS.BASE_URL}/users/register`, data);
    return response;
};

export const login = async (data) => {
    const response = await axios.post(`${CONSTANTS.BASE_URL}/users/login`, data);
    return response;
};

export const getUserData = async () => {
    const response = await axios.get(`${CONSTANTS.BASE_URL}/users/get-userdata`, {
        headers: {
            "Authorization": `Bearer ${useAuthStore().userToken}`
        }
    });
    return response;
}