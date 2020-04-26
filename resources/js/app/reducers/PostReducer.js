import { GET_POST, GET_POST_REPLIES,RESET_POSTS_STATE,ADD_NEW_REPLY, DELETE_REPLY } from "../actions";

const initState = {
    post : {},
    postLoading: true,
    replies : [],
    repliesLoading: true,
}

const PostReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_POST:
            return {...state,postLoading:false, post : action.payload.data};
            break;
        case GET_POST_REPLIES:
            return {...state,repliesLoading:false, replies : action.payload.data};
            break;
        case RESET_POSTS_STATE :
            return initState;
            break;
        case ADD_NEW_REPLY: 
            return {...state, replies : [...state.replies, action.payload.data]}
            break;
        case DELETE_REPLY :
            let replies = state.replies.filter(reply => reply.id !== action.payload);    
            return {...state,replies}
            break;
        default : return state;
    }
}

export default PostReducer;