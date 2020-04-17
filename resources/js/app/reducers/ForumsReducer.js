import { GET_ALL_FORUMS,FETCH_FORUM } from "../actions";

const initState = {
    isLoading : true,
    data : [],
}

const ForumsReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_ALL_FORUMS: 
            return { isLoading:false, data : action.payload.data};
            break;
        case FETCH_FORUM :
            return {...state, data : [...state.data,action.payload]}
        default : return state;
    }
}

export default ForumsReducer;