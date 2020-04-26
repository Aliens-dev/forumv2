import { GET_POST, GET_POST_REPLIES,RESET_POSTS_STATE,ADD_NEW_REPLY, GET_REPLY } from "../actions";

const initState = {
    reply : {},
    replyLoading: true,
}

const ReplyReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_REPLY:
            return {replyLoading:false, reply : action.payload.data};
            break;
        default :return state;
    }
}

export default ReplyReducer;