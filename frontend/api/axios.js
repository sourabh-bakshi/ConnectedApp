import axios from 'axios';

export const axiosInstance = axios.create({
    headers:{
        'Content-Type': 'application/json',
    },
    baseURL: 'https://connectedapp.onrender.com',
    withCredentials: true
});