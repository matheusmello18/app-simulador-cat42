import axios from 'axios';
import config from 'config';

const axiosServices = axios.create({baseURL: config.baseUrlApi});

axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;