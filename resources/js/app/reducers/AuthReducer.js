import {
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    SET_LOADING,
    REFRESH_SUCCESS,
    LOGOUT_FAILED,
    LOGOUT_SUCCESS,
    LOAD_STATE
} from "../actions";

const initState = {
    user: {},
    token : '',
    expires_in : '',
    is_Logged : false,
    loading: true,
};

const AuthReducer = (state = initState, action) => {
    switch(action.type) {
        case LOAD_STATE:
            if(action.payload) {
                return {...state,...action.payload}
            }
            return state;
            break;
        case LOGIN_SUCCESS :
            const data = {
                user : action.payload.user,
                token: action.payload.access_token,
                expires_in : action.payload.expires_in,
                is_Logged: true,
                loading:false,
            };
            localStorage.setItem('data',JSON.stringify(data));
            return data;
            break;
        case LOGIN_FAILED :
            localStorage.setItem('data',JSON.stringify(initState));
            return {...initState, loading:false};
            break;
        case LOGOUT_SUCCESS:
            localStorage.setItem('data',JSON.stringify(initState));
            return {...initState, loading:false};
            break;
        case LOGOUT_FAILED :
            return state;
            break;
        case SET_LOADING :
            return {...initState,loading :false};
        case REFRESH_SUCCESS :
            let d =  JSON.parse(localStorage.getItem('data'));
            return {
                user : d.user,
                token: d.token,
                expires_in : d.expires_in,
                is_Logged: true,
                loading:false,
            };
        default : return state;
    }
}

export default AuthReducer;