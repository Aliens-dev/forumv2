import { GET_POST, GET_POST_REPLIES } from "../actions";

const initState = {
    post : {},
    postLoading: true,
    replies : [],
    repliesLoading: true,
}

const PostsReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_POST:
            return {...state,postLoading:false, post : action.payload.data};
            break;
        case GET_POST_REPLIES:
            return {...state,repliesLoading:false, replies : action.payload.data};
            break;
        default : return state;
    }
}

export default PostsReducer;