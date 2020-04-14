import { GET_ALL_FORUMS } from "../actions";

const initState = {
    isLoading : true,
    data : [],
}

const ForumsReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_ALL_FORUMS: 
            console.log(action.payload);
            return { isLoading:false, data : action.payload.data};
            break;
        default : return state;
    }
}

export default ForumsReducer;