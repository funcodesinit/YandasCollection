import { ActionTypes } from "../constants/action-types";

export interface UserState {
    category: [];
    products: ProductAPIList[];
    selected_product: ProductDetailsAPI;
    selected_category: {};
    create_product: {};
    product_sizes: [];
    ServerError: string;
}

const initialSelProd = {
    id: 0,
    name: "",
    description: "",
    price: 0,
    categoryId: 0,
    discount:0,
    isPub:false,
    stock:0,
    category: {
        id: 1,
        name: ""
    },
    images: [
        {
            id: 0,
            media: [],
            stock: {
                id: 0,
                size: "",
                stock:""
            }
        },
    ]
}

const initialState: UserState = {
    category: [],
    products: [],
    selected_product: initialSelProd,
    selected_category: {},
    create_product: {},
    product_sizes: [],
    ServerError: '',
};

export const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case ActionTypes.SET_PRODUCT_CATEGORY:
            return { ...state, category: payload };

        case ActionTypes.SET_PRODUCT_SIZES:
            return { ...state, product_sizes: payload };

        case ActionTypes.SET_PRODUCTS:
            return { ...state, products: payload };

        case ActionTypes.SET_SELECTED_PRODUCT:
            return { ...state, selected_product: payload };

        case ActionTypes.SET_SELECTED_CATEGORY:
            return { ...state, selected_category: payload };
        
        case ActionTypes.SET_FETCH_ERROR:
            return { ...state, ServerError: payload };

        default:
            return state;
    }
}

