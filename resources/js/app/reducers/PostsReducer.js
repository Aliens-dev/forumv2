import { GET_FORUM_POSTS } from "../actions";

const initState = {
    isLoading : true,
    data : [],
}

const PostsReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_FORUM_POSTS:
            return { isLoading:false, data : action.payload.data};
            break;
        default : return state;
    }
}

export default PostsReducer;