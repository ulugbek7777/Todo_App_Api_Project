import { usersAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    name: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, name, isAuth) => ({type: SET_USER_DATA, payload:
    {userId, email, name, isAuth}  });

export const getAuthUser = () => (dispatch) => {
    
    return usersAPI.me()
        .then(response => {
            if (true) {
                let {id, name, email} = response;
                dispatch(setAuthUserData(id, email, name, true));
            }
    });
}

export default authReducer;