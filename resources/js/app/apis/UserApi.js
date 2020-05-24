import axios from 'axios';

const ax = axios.create({
    baseURL : 'https://forum-v2.herokuapp.com/api/users',
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