import { GET_POSTS } from "../actions";

const initState = {
    isLoading : true,
    data : [],
    forum : {},
}

const PostsReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_POSTS:
            return { isLoading:false, data : action.payload.data,forum: action.payload.forum};
            break;
        default : return state;
    }
}

export default PostsReducer;