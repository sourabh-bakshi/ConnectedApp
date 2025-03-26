import {axiosInstance} from './axios';

const loginUser = async(email, password) => {
    try {
        const response = await axiosInstance.post('api/user/login', {email, password});
        return response.data;
    } catch (error) {
        console.error('Login Error',error.response?.data?.message || error.message);
        throw error;
    }
}
export{ 
    loginUser
}