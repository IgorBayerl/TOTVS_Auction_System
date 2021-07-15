import axios from 'axios';
import { getToken } from "./auth";
const dotenv = require('dotenv');
dotenv.config();


const api = axios.create({
    baseURL: process.env.API,
})

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

export default api;