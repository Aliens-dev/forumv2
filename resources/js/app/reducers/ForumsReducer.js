import { GET_ALL_FORUMS,RESET_FORUM_POSTS_STATE } from "../actions";

const initState = {
    isLoading : true,
    data : [],
}

const ForumsReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_ALL_FORUMS: 
            return { isLoading:false, data : action.payload.data};
            break;
        default : return state;
    }
}

export default ForumsReducer;