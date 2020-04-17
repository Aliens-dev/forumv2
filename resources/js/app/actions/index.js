/* Imports  */

import ForumsPage from '../apis/ForumsPage';
import PostApi from '../apis/PostApi';
import UserApi from '../apis/UserApi';
import _ from 'lodash';

/* Actions  */

export const GET_FORUM = 'GET_FORUM';
export const GET_ALL_FORUMS = 'GET_ALL_FORUMS';
export const GET_FORUM_POSTS = 'GET_FORUM_POSTS';
export const GET_POST = 'GET_POST';
export const GET_POST_REPLIES = 'GET_POST_REPLIES';
export const GET_USER = 'GET_USER';

/* Actions Creator */

export const getAllForumsAction = () => async dispatch => {
    let response = await ForumsPage.get('/');
    dispatch({
        type: GET_ALL_FORUMS,
        payload: response.data,
    });
}

export const getForumAction = forumId => async dispatch => {
    let response = await PostApi.get(`/${postId}`);
    dispatch({
        type : GET_FORUM,
        payload: response.data,
    });
}

export const getPostsAndUsersAction = id => async (dispatch,getState) => {
    await dispatch(getForumPostsAction(id))
    const userIds = _.uniq(_.map(getState().posts.data,'user_id'));
    userIds.map(userId => dispatch(getUserAction(userId)));
}

export const getForumPostsAction= (id) => async dispatch  =>{
    let response = await ForumsPage.get(`/${id}/posts`);
    dispatch({
        type : GET_FORUM_POSTS,
        payload: response.data,
    });
}


export const getPostAction = postId => async dispatch => {
    let response = await PostApi.get(`/${postId}`);
    dispatch({
        type : GET_POST,
        payload: response.data,
    });
}

export const getUserAction = userId => async dispatch => {
    let response = await UserApi.get(`/${userId}`)
    dispatch({
        type: GET_USER,
        payload: response.data,
    })
}

export const getPostRepliesAction = (postId) => async dispatch => {
    let response = await PostApi.get(`/${postId}/replies`);
    dispatch({
        type : GET_POST_REPLIES,
        payload: response.data,
    });
}

