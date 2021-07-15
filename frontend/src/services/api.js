import axios from 'axios';
import { getToken } from "./auth";
const dotenv = require('dotenv');
dotenv.config();


const api = axios.create({
    baseURL: 'https://totvs-desafio-fullstack-api.herokuapp.com/api',
})

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

export default api;