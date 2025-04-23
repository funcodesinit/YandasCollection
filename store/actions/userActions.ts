import { prisma } from "@/lib/prisma"
import { ActionTypes } from "../constants/action-types"
import account from '@/app/api/apisauce/account'

export const fetchAccountProfile = ( userId:number, options={} ) => async (dispatch) => {
    const user = await account.getAccount( userId, options)
    dispatch({
        type: ActionTypes.SET_PROFILE,
        payload: user?.data
    }) 
}
 
export const getAccountProfile = (user) => {
    return {
        type: ActionTypes.SET_PROFILE,
        payload: user
    }
}


export const setCustomers = (customers) => {
    return {
        type: ActionTypes.SET_CUSTOMERS,
        payload: customers
    }
}
