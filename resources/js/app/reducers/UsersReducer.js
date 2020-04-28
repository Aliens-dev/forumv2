import { GET_USER,RESET_USERS } from "../actions";


const UsersReducer = (state = [], action) => {
    switch(action.type) {
        case GET_USER:
            return [...state, action.payload.data];
            break;
        case RESET_USERS : 
            return [];    
        default : return state;
    }
    
}

export default UsersReducer;