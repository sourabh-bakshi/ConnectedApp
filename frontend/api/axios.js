import axios from 'axios';

export const axiosInstance = axios.create({
    headers:{
        'Content-Type': 'application/json',
    },
    
    // baseURL: 'https://connectedapp-production.up.railway.app',
    baseURL: 'http://localhost:5000',
    withCredentials: true
});