import axios from 'axios';

export const axiosInstance = axios.create({
    headers:{
        'Content-Type': 'application/json',
    },
    // baseURL: 'https://proxy-server-production-ac45.up.railway.app',
    // baseURL: 'https://connectedapp-production.up.railway.app',
    // baseURL: 'http://localhost:5000',
    withCredentials: true
});