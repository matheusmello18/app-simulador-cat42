import axios from 'axios';

const axiosServices = axios.create({baseURL: "http://127.0.0.1:8081"});

axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;