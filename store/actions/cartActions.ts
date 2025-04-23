import mycart from "@/app/api/apisauce/cart";
import { ActionTypes } from "../constants/action-types";
import order from "@/app/api/apisauce/order";

export const fetchPublicCart = (options = {}) => async (dispatch) => {
  try {
    const productsList = await mycart.getCart(options);
    dispatch({
      type: ActionTypes.SET_CART,
      payload: productsList?.data
    });
  } catch (error) {
    console.error("Error fetching product list:", error);
    dispatch({
      type: ActionTypes.SET_FETCH_ERROR,
      payload: error?.message || 'server error. Unable to fetch data from server',
    });
  }
};

export const updatePublicCart = (cartItemId: number, quantity: number, options = {}) => async (dispatch) => {
  try {
    const product = await mycart.updateCartItem(cartItemId, quantity, options);

    dispatch({
      type: ActionTypes.UPDATE_CART,
      payload: { cartItemId, quantity }
    });
  } catch (error) {
    console.error("Error fetching product list:", error);
    dispatch({
      type: ActionTypes.SET_FETCH_ERROR,
      payload: error?.message || 'server error. Unable to fetch data from server',
    });
  }
};


export const deletePublicCart = (cartItemId: number) => async (dispatch, getState) => {
  try {
    const res = await mycart.deleteCartItem(cartItemId);

    // Get the current cart state
    const cart = getState().cart.cart;

    // Filter out the deleted item
    const updatedItems = cart?.items?.filter(item => item.id !== cartItemId);

    // Recalculate total
    const updatedTotal = updatedItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

    dispatch({
      type: ActionTypes.DELETE_CARTITEM,
      payload: {
        cart: {
          ...cart,
          items: updatedItems
        },
        total: updatedTotal
      }
    });
  } catch (error) {
    console.error("Error deleting cart item: ====", error);
    dispatch({
      type: ActionTypes.SET_FETCH_ERROR,
      payload: error?.message || 'Server error. Unable to delete cart item.',
    });
  }
};


// order 
export const fetchPublicOrder = (options = {}) => async (dispatch) => {
  try {
    const res = await order.getOrder(options);
    dispatch({
      type: ActionTypes.SET_ORDER,
      payload: res?.data
    });
  } catch (error) {
    console.log("Error fetching product list:", error);
    dispatch({
      type: ActionTypes.SET_FETCH_ERROR,
      payload: error?.message || 'server error. Unable to fetch data from server',
    });
  }
};


// admin 
export const fetchAdminOrder = (options = {}) => async (dispatch) => {
  try {

    const res = await fetch('http://localhost:3000/api/orders', {
      method: 'GET',
    });


    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();

    dispatch({
      type: ActionTypes.SET_ORDER, // ❓ Consider renaming to SET_ORDERS if this is about orders, not cart
      payload: data,
    });
  } catch (error) {
    console.error("Error fetching order list:", error);
    dispatch({
      type: ActionTypes.SET_FETCH_ERROR,
      payload: error?.message || 'Server error. Unable to fetch data from server',
    });
  }
};

export const fetchAdminOrderDetails = (id, options = {}) => async (dispatch) => {
  try {

    const res = await fetch(`http://localhost:3000/api/orders/${id}`, {
      method: 'GET',
    });


    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();
    console.log("data", data)
    dispatch({
      type: ActionTypes.SET_SELECTED_ORDER, // ❓ Consider renaming to SET_ORDERS if this is about orders, not cart
      payload: data,
    });
  } catch (error) {
    console.error("Error fetching order list:", error);
    dispatch({
      type: ActionTypes.SET_FETCH_ERROR,
      payload: error?.message || 'Server error. Unable to fetch data from server',
    });
  }
};

export const updateAdminOrderStatus = (orderId, status) => async (dispatch) => {
  try {
    const res = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();
    console.log("data", data)
    // dispatch({
    //   type: ActionTypes.SET_SELECTED_ORDER,
    //   payload: data,
    // });
  } catch (error) {
    console.error("Error updating order status:", error);
    dispatch({
      type: ActionTypes.SET_FETCH_ERROR,
      payload: error?.message || 'Server error. Unable to update order status.',
    });
  }
};