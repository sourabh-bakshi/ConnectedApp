import {axiosInstance} from './axios';

const loginUser = async(userName, password) => {
    try {
        const response = await axiosInstance.post('api/user/login', {userName, phoneNumber, email, password});
        return response.data;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}
export{ 
    loginUser
}