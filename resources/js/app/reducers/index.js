import { combineReducers } from 'redux';
import ForumsReducer from './ForumsReducer';
import PostsReducer from './PostsReducer';
import PostReducer from './PostReducer';
import UsersReducer from './UsersReducer';
import AuthReducer from "./AuthReducer";

export default combineReducers ({
    forums : ForumsReducer,
    users : UsersReducer,
    posts : PostsReducer,
    post : PostReducer,
    auth : AuthReducer,
});