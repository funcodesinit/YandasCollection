import { ActionTypes } from "../constants/action-types";

export interface UserState {
    account: UserType;
    customers: UserListType[];
    selected_customer: UserType;
} 

const initialState: UserState = {
    account: {},
    customers: [],
    selected_customer: {}
};

export const accountReducer = (state = initialState, { type, payload }) => {
    switch (type) { 
        case ActionTypes.SET_PROFILE:
            return { ...state, account: payload }; 
        case ActionTypes.SET_CUSTOMERS:
            return { ...state, customers: payload }; 
        default:
            return state;
    } 
}

 