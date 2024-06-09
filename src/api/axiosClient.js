import axios from 'axios';
import queryString from 'query-string';
import Cookies from 'js-cookie';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    const authToken = Cookies.get('authToken');
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
})

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
},
    (error) => {
        throw error;
    }
);

export default axiosClient;