import { GET_POST, GET_POST_REPLIES,RESET_POSTS_STATE,ADD_NEW_REPLY, DELETE_REPLY,GET_POST_LIKES, ADD_POST_LIKE, REMOVE_POST_LIKE, ADD_REPLY_LIKE, REMOVE_REPLY_LIKE } from "../actions";

const initState = {
    post : {},
    postLoading: true,
    replies : [],
    likes : [],
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
        case GET_POST_LIKES : 
            return {...state,likes:action.payload}
            break;
        case ADD_POST_LIKE : 
            return {...state, likes : [...state.likes,action.payload]}
            break;
        case REMOVE_POST_LIKE : 
            let likes = state.likes.filter(like => like != action.payload);    
            return {...state, likes}
        case ADD_REPLY_LIKE : 
            let add_replies = state.replies.map(reply => {
                if(reply.id == action.payload.replyId) {
                    return {...reply, likes : [...reply.likes, action.payload.userId]}
                }
                return reply;
            })
            return {...state,replies: add_replies}
            break;
        case REMOVE_REPLY_LIKE : 
            let rem_replies = state.replies.map(reply => {
                if(reply.id == action.payload.replyId) {
                    return {...reply, likes : reply.likes.filter(like => like !== action.payload.userId)}
                }
                return reply;
            })
            return {...state, replies:rem_replies}
            break;
        default : return state;
    }
}

export default PostReducer;