import { ActionTypes } from "../constants/action-types";

export interface UserState {
    profile: UserType | null;
    users: UserListType[]; 
    selected_user: UserType | null;
} 

const initialState: UserState = {
    profile: null,
    users: [],
    selected_user: null,
};

export const accountReducer = (state = initialState, { type, payload }) => {
    switch (type) { 
        case ActionTypes.SET_PROFILE:
            return { ...state, profile: payload }; 
        case ActionTypes.SET_USERS:
            return { ...state, users: payload }; 
        case ActionTypes.SET_SELECTED_USER:
            return { ...state, selected_user: payload }; 
        default:
            return state;
    } 
}

 