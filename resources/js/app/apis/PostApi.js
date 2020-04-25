import axios from 'axios';




let ax = axios.create({
    baseURL : 'http://127.0.0.1:8000/api/posts',
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