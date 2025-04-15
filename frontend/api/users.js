import {axiosInstance} from './axios';

const loginUser = async({identifier, password}) => {
    try {
        const response = await axiosInstance.post('api/user/login', {identifier, password});
        return response.data;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

const registerUser = async(userName, phoneNumber, email, password) => {
    try {
        const response = await axiosInstance.post('api/user/register',{userName, phoneNumber, email, password});
        return response.data;
    } catch (error) {
        console.error(error.message);
        throw error;        
    }
}

const getUser = async() => {
    try {
        const response = await axiosInstance.get('api/user/getUser');
        return response.data;
    } catch (error) {
        console.error(error.message);
        throw error;        
    }
}    

export{ 
    loginUser, registerUser, getUser
}