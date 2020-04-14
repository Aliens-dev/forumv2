import { combineReducers } from 'redux';
import ForumsReducer from './ForumsReducer';

export default combineReducers ({
    forums : ForumsReducer,
})  