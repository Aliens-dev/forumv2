import axios from 'axios';




let ax = axios.create({
    baseURL : '/api/posts',
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