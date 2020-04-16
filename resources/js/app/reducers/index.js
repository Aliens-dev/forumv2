import { combineReducers } from 'redux';
import ForumsReducer from './ForumsReducer';
import PostsReducer from './PostsReducer';
import PostReducer from './PostReducer';

export default combineReducers ({
    forums : ForumsReducer,
    posts : PostsReducer,
    post : PostReducer,
})  