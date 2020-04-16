export const GET_ALL_FORUMS = 'GET_ALL_FORUMS';
export const GET_POSTS = 'GET_POSTS';
export const GET_POST = 'GET_POST';
export const GET_POST_REPLIES = 'GET_POST_REPLIES';

import ForumsPage from '../apis/ForumsPage';


export const getAllForumsAction = () => async dispatch => {
    let response = await ForumsPage.get('/');
    dispatch({
        type: GET_ALL_FORUMS,
        payload: response.data,
    });
}

export const getPosts= (id) => async dispatch  =>{
    let response = await ForumsPage.get(`/${id}/posts`);
    dispatch({
        type : GET_POSTS,
        payload: response.data,
    });
}

export const getPost = (forumId,postId) => async dispatch => {
    let response = await ForumsPage.get(`/${forumId}/posts/${postId}`);
    dispatch({
        type : GET_POST,
        payload: response.data,
    });
}
export const getPostReplies = (forumId,postId) => async dispatch => {
    let response = await ForumsPage.get(`/${forumId}/posts/${postId}/replies`);
    dispatch({
        type : GET_POST_REPLIES,
        payload: response.data,
    });
}