import { SET_MESSAGE,RESET_MESSAGE } from "../actions";

const initState = {
    isSetMessage : false,
    type: 1,
    message : '',
}

const MessagesReducer = (state = initState, action) => {
    switch(action.type) {
        case SET_MESSAGE :
            return {isSetMessage: true, message:action.payload.message,type:action.payload.type};
            break;
        case RESET_MESSAGE :
            return initState;
        default : return state;
    }
};

export default MessagesReducer;