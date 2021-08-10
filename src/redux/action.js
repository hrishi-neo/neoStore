import {GET_PRODUCT,SAVE_PRODUCT, SAVE_ORDER,RESET_PASSWORD, PLACE_ORDER,SETIMG, GET_ORDER, SAVESHIP_ADDRESS, DEL_ADDRESS, UPDATE_ADDRESS, ADD_ADDRESS, GET_ADDRESS, SAVE_ADDRESS, LOGIN, GET_CART, REMOVE_FROM_CART, UPDATE_CART, LOGOUT, REGISTER, FORGOT_PASSWORD, GET_DATA, SAVE_DATA, GET_USER, REGISTER_STATUS, ADD_TO_CART, SAVE_CART } from './actionTypes';

export const login = (user) => ({
    type: LOGIN,
    payload: user
});

export const getUser = (user) => ({
    type: GET_USER,
    payload: user
});
export const register = (user) => ({
    type: REGISTER,
    payload: user
});
export const registerStatus = () => ({
    type: REGISTER_STATUS,

});
export const getData = () => ({
    type: GET_DATA,

});
export const saveData = (data) => ({
    type: SAVE_DATA,
    payload: data
});
export const getProd = () => ({
    type: GET_PRODUCT,

});
export const saveProd = (prod) => ({
    type: SAVE_PRODUCT,
    payload: prod
});

export const logout = () => ({
    type: LOGOUT,

});

export const forgotPassword = (email) => ({
    type: FORGOT_PASSWORD,
    payload: email
});

export const resetPassword = (token) => ({
    type: RESET_PASSWORD,
    payload: token
});

export const addToCart = (cart) => ({
    type: ADD_TO_CART,
    payload: cart
});

export const saveCart = (cart) => ({
    type: SAVE_CART,
    payload: cart
});
export const getCart = (token) => ({
    type: GET_CART,
    payload: token
});
export const removeFromCart = (prod) => ({
    type: REMOVE_FROM_CART,
    payload: prod
});
export const updateCart = (prod) => ({
    type: UPDATE_CART,
    payload: prod
});

export const addAddress = (address) => ({
    type: ADD_ADDRESS,
    payload: address
});

export const getAddress = (token) => ({
    type: GET_ADDRESS,
    payload: token
});

export const saveAddress = (address) => ({
    type: SAVE_ADDRESS,
    payload: address
});

export const delAddress = (token) => ({
    type: DEL_ADDRESS,
    payload: token
});

export const updateAddress = (address) => ({
    type: UPDATE_ADDRESS,
    payload: address
});

export const saveShipAddress = (address) => ({
    type: SAVESHIP_ADDRESS,
    payload: address
});

export const placeOrder = (address) => ({
    type: PLACE_ORDER,
    payload: address
});

export const getOrder = (token) => ({
    type: GET_ORDER,
    payload: token
});

export const saveOrder = (order) => ({
    type: SAVE_ORDER,
    payload: order
});

export const saveIMG = (uri) => ({
    type: SETIMG,
    payload: uri
});
