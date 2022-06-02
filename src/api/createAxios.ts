import axios from "axios";

export const axiosInstance = axios.create({
    timeout: 2000,
})

// 拦截器
axiosInstance.interceptors.request.use((config) => {
    // console.log(config)
    return config;
}, error => {
    return Promise.reject(error);
})

axiosInstance.interceptors.response.use(response => {
    // console.log(response)
    return response;
}, error => {
    // console.log(error)
    return Promise.reject(error.response.statusText);
})