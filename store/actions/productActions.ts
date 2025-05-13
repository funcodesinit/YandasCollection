import { prisma } from "@/lib/prisma";
import { ActionTypes } from "../constants/action-types"
import list from "@/app/api/products/list";
import sizes from "@/app/api/products/sizes";
import category from "@/app/api/apisauce/category";


// redux thunk api calls 
export const fetchPublicProductList = (options = {}) => async (dispatch) => {
    try {
        const productsList = await list.getListing(options);
        // console.log("productsList ===>", productsList?.data?.data)
        dispatch({
            type: ActionTypes.SET_PRODUCTS,
            payload: productsList?.data?.data
        });
    } catch (error) {
        console.error("Error fetching product list:", error);
        dispatch({
            type: ActionTypes.SET_FETCH_ERROR,
            payload: error?.message || 'server error. Unable to fetch data from server',
        });
    }
};

export const fetchPublicProductDetails = (id) => async (dispatch) => {
    try {
        const prod = await list.getDetails(id);
        
        dispatch({
            type: ActionTypes.SET_SELECTED_PRODUCT,
            payload: prod?.data
        });
    } catch (error) {
        console.error("Error fetching product list:", error);
        dispatch({
            type: ActionTypes.SET_FETCH_ERROR,
            payload: error?.message || 'server error. Unable to fetch data from server',
        });
    }
};

export const fetchPublicCategoryList = () => async (dispatch) => {
    try {
        const prod = await category?.getListing();
        dispatch({
            type: ActionTypes.SET_PRODUCT_CATEGORY,
            payload: prod?.data
        });
    } catch (error) {
        console.error("Error fetching product list:", error);
        dispatch({
            type: ActionTypes.SET_FETCH_ERROR,
            payload: error?.message || 'server error. Unable to fetch data from server',
        });
    }
};

// sizes  
export const fetchPublicSizesList = () => async (dispatch) => {
    try {
        const prod = await sizes?.getListing();
        dispatch({
            type: ActionTypes.SET_PRODUCT_SIZES,
            payload: prod?.data
        });
    } catch (error) {
        console.error("Error fetching product list:", error);
        dispatch({
            type: ActionTypes.SET_FETCH_ERROR,
            payload: error?.message || 'server error. Unable to fetch data from server',
        });
    }
};

// redux calls ?//
export const setProductCategory = (data) => {
    return {
        type: ActionTypes.SET_PRODUCT_CATEGORY,
        payload: data
    }
}
  
export const setProductSizes = (data) => {
    return {
        type: ActionTypes.SET_PRODUCT_SIZES,
        payload: data
    }
}
 
export const setSelectedProduct = (data) => {
    return {
        type: ActionTypes.SET_SELECTED_PRODUCT,
        payload: data
    }
}
 
export const setSelectedCategory = (data) => {
    return {
        type: ActionTypes.SET_SELECTED_CATEGORY,
        payload: data
    }
}
