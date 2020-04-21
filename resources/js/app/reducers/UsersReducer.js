import { GET_USER } from "../actions";


const UsersReducer = (state = [], action) => {
    switch(action.type) {
        case GET_USER:
            /*          
            JSON.stringify(obj1) === JSON.stringify(obj2) 
            let myState = state.filter(user => user.id != action.payload.data.id); 
            */
            return [...state, action.payload.data];
            break;
        default : return state;
    }
    
}

export default UsersReducer;