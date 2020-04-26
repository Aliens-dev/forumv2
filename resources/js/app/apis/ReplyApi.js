import axios from 'axios';

const ax = axios.create({
    baseURL : 'http://127.0.0.1:8000/api/replies',
});

ax.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        return error.response;
    }
    return error.response;
});
export default ax;