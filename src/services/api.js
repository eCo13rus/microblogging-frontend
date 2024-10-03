import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8081/api',
    withCredentials: true
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        console.log('Отправляется запрос с токеном:', token);
    } else {
        console.log('Токен отсутствует в localStorage');
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;
