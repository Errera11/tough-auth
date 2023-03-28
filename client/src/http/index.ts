import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();


const api = axios.create({
    withCredentials: true,
    baseURL: process.env.API_URL
})

api.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    return config;
})

export default api;