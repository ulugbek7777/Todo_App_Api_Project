import { applyMiddleware, combineReducers, createStore } from "redux";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import dataReducer from "./data-reducer";

let reducers = combineReducers({
    auth: authReducer,
    userData: dataReducer, 
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;


export default store;