import { GET_USER } from "../actions";



const UsersReducer = (state= [], action) => {
    console.log(state)
    switch(action.type) {
        case GET_USER:
            return [...state, action.payload.data];
            break;
        default : return state;
    }
    
}

export default UsersReducer;