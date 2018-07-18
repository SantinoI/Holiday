import {createStore} from "redux";
import {SET, GET} from '../actions/types';

function userDataReducer(previousState, action) {
    switch (action.type) {
        case GET:
            return {
                userData: previousState,
            };
        default: 
            return previousState;
    };
};

const initialState = {
    profileImage: "",
    username: "",
    sede:"",
    email:"",
    numero:"",
    // eventualmente cardList
};

const store = createStore(userDataReducer, initialState);
export default store;