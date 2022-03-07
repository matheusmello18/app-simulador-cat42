import axios from 'axios';

const axiosServices = axios.create({baseURL: "http://192.168.1.111:8081"});

axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;