import { GET_FORUM_POSTS,RESET_FORUM_POSTS_STATE, ADD_NEW_POST } from "../actions";

const initState = {
    isLoading : true,
    data : [],
}

const PostsReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_FORUM_POSTS:
            return { isLoading:false, data : action.payload.data};
            break;
        case RESET_FORUM_POSTS_STATE:
            return initState;
        case ADD_NEW_POST : 
            return {...state, data: [action.payload.data,...state.data]}
        default : return state;
    }
}

export default PostsReducer;