import {
    ADD_NOTIFICATION,
    SEEN_NOTIFICATION,
} from "../actions";

const initState = [];

const AuthReducer = (state = initState, action) => {
    switch(action.type) {
        case ADD_NOTIFICATION :
            return [action.payload,...state] 
        break;
        case SEEN_NOTIFICATION :
            return [];
        break;
        default : return state;
    }
}

export default AuthReducer;