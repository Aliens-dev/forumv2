/* Imports  */

import ForumsPage from '../apis/ForumsPage';
import PostApi from '../apis/PostApi';
import UserApi from '../apis/UserApi';
import _ from 'lodash';
import axios from "axios";

/* Actions  */

export const FETCH_FORUM = 'FETCH_FORUM';
export const GET_ALL_FORUMS = 'GET_ALL_FORUMS';
export const GET_FORUM_POSTS = 'GET_FORUM_POSTS';
export const GET_POST = 'GET_POST';
export const GET_POST_REPLIES = 'GET_POST_REPLIES';
export const GET_USER = 'GET_USER';
export const RESET_FORUM_POSTS_STATE = 'RESET_FORUM_POSTS_STATE';
export const RESET_POSTS_STATE = 'RESET_POSTS_STATE';
export const ADD_NEW_REPLY = 'ADD_NEW_REPLY';
export const ADD_NEW_POST = 'ADD_NEW_POST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const GET_STATUS = 'GET_STATUS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const REFRESH_SUCCESS = 'REFRESH_SUCCESS';
export const SET_LOADING = 'SET_LOADING';
export const LOAD_STATE  = 'LOAD_STATE';
export const INIT_STATE  = 'INIT_STATE';
export const POST_EDIT_SUCCESS  = 'POST_EDIT_SUCCESS';
export const POST_EDIT_FAILED  = 'POST_EDIT_FAILED';
export const SET_MESSAGE  = 'SET_MESSAGE';
export const RESET_MESSAGE  = 'RESET_MESSAGE';
export const DELETE_POST  = 'DELETE_POST';




/* Actions Creator */



export const getAllForumsAction = () => async dispatch => {
    let response = await ForumsPage.get('/');
    dispatch({
        type: GET_ALL_FORUMS,
        payload: response.data,
    });
};

export const getPostsAndUsersAction = id => async (dispatch,getState) => {
    await dispatch(getForumPostsAction(id));
    const userIds = _.uniq(_.map(getState().posts.data,'user_id'));
    userIds.map(userId => dispatch(getUserAction(userId)));
};

export const getForumPostsAction= (id) => async dispatch  =>{
    let response = await ForumsPage.get(`/${id}/posts`);
    dispatch({
        type : GET_FORUM_POSTS,
        payload: response.data,
    });
};

export const resetForumPostsStateAction = () => {
    return {
        type:RESET_FORUM_POSTS_STATE,
    }
};

export const resetPostsStateAction = () => {
    return {
        type:RESET_POSTS_STATE,
    }
};

export const AddNewReplyAction = (postId,data) => async (dispatch,getState) => {
    let response = await PostApi.post(`${postId}/replies`,data,{
        headers : {
            Authorization: 'Bearer '+ getState().auth.token,
        }
    });
    dispatch({
        type:ADD_NEW_REPLY,
        payload: response.data,
    })
};

export const _getPostAndUser = postId => async (dispatch,getState) => {
    await dispatch(getPostAction(postId));
    dispatch(getUserAction(getState().post.post.user_id));
};

export const getPostReplies = (postId) => async dispatch  =>{
    let response = await PostApi(`${postId}/replies`);
    dispatch({
        type: GET_POST_REPLIES,
        payload:  response.data,
    })
};

export const _getRepliesAndUsers = (postId) => async (dispatch,getState) => {
    await dispatch(getPostReplies(postId));
    const ids = _.uniq(_.map(getState().post.replies,'user_id'));
    ids.map(id => dispatch(getUserAction(id)));
};

export const addNewPostAction = (data) => async (dispatch,getState) => {
    let response = await PostApi.post('/',data,{
        headers : {
            Authorization: 'Bearer '+ getState().auth.token,
        }
    });
    if(response.data.success) {
        dispatch(setMessage('Sucessfully Updated!',1));
    }else {
        dispatch(setMessage('Failed to Update!',0));
    }
    dispatch({
        type: ADD_NEW_POST,
        payload: response.data,
    })
};

export const setLoadingAction =() => {
    return {
        type: SET_LOADING,
    }
}


// Get Single Records : 

export const fetchForum = (id) => async dispatch=> {
    let response = await ForumsPage.get(`/${id}`);
    dispatch({
        type : FETCH_FORUM,
        payload : response.data,
    })
};
// Post
export const getPostAction = postId => async dispatch => {
    let response = await PostApi.get(`/${postId}`);
    dispatch({
        type : GET_POST,
        payload: response.data,
    });
};

export const editPostAction = (postId,data) => async (dispatch,getState) => {
    let response = await PostApi.patch(`/${postId}`,data, {
        headers : {
            Authorization: 'Bearer '+ getState().auth.token,
        }
    });
    if(response.data.success) {
        dispatch(setMessage(response.data.message,1));
    }else {
        dispatch(setMessage(response.data.message,0));
    }
};

export const deletePostAction = (postId) => async (dispatch,getState) => {
    let response = await PostApi.delete(`/${postId}`,{
        headers : {
            Authorization: 'Bearer '+ getState().auth.token,
        }
    });
    if(response.data.success) {
        dispatch({
            type: DELETE_POST,
            payload: postId,
        });
        dispatch(setMessage(response.data.message,1));
    }else {
        dispatch(setMessage(response.data.message,0));
    }
};

export const setMessage = (message,type) => dispatch =>{
    dispatch({
        type: SET_MESSAGE,
        payload: { message, type,},
    })
    setTimeout(()=> {
        dispatch(resetMessage())
    },5000);
};

export const resetMessage = () => {
    return {
        type: RESET_MESSAGE,
    }
};




// user
export const getUserAction = userId => async dispatch => {
    let response = await UserApi.get(`/${userId}`)
    dispatch({
        type: GET_USER,
        payload: response.data,
    })
};


// Auth Action

export const loadState = () => dispatch => {
    const data = JSON.parse(localStorage.getItem('data'));
    if(data && data.token) {
        dispatch(_Refresh(data.token))
    }else {
        dispatch(initState());
    }
};

export const initState = () => {
    return {
        type: INIT_STATE,
    }
};


export const _Login = (data) => async dispatch => {
    let response = await axios.post('/api/login',data);
    if(response.data.success) {
        dispatch(_Login_Success(response.data));
    }else {
        dispatch(_Login_Failed())
    }
};

export const _Login_Success = (data) => {
    return {
        type: LOGIN_SUCCESS,
        payload: data,
    }
};

export const _Login_Failed = () => {
    return {
        type: LOGIN_FAILED,
    }
};

export const _Logout = (token) => async dispatch =>{
    let response = await axios.post('/api/logout','',{
        headers : {
            Authorization: 'Bearer '+ token,
        }
    });
    if(response.data.success) {
        dispatch(_Logout_Success);
    }else {
        dispatch(_Logout_Failed);
    }
};

export const _Logout_Success =() => {
    return {
        type: LOGOUT_SUCCESS,
    }
}

export const _Logout_Failed =() => {
    return {
        type: LOGOUT_FAILED,
    }
}


export const _Refresh = (token) => async dispatch =>{
    const headers = { Authorization: 'Bearer '+ token };
    let response = await axios.post('/api/refresh','',{headers});
    if(!response.data.success) {
        dispatch(_Login_Failed())
    }else {
        dispatch({
            type:REFRESH_SUCCESS,
        })
    }
};

