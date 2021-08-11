import { DELSHIP_ADDRESS, GET_PRODUCT, SAVE_PRODUCT, GET_ORDER, RESET_PASSWORD, SETIMG, SAVE_ORDER, PLACE_ORDER, UPDATE_ADDRESS, DEL_ADDRESS, LOGIN, GET_ADDRESS, ADD_ADDRESS, SAVE_ADDRESS, GET_CART, UPDATE_CART, REMOVE_FROM_CART, SAVE_CART, ADD_TO_CART, LOGOUT, GET_DATA, SAVE_DATA, GET_USER, REGISTER, REGISTER_STATUS, FORGOT_PASSWORD, SAVESHIP_ADDRESS } from "../actionTypes";

const intialState = {

    loggedIn: false,
    loading: false,
    registered: false,
    data: {},
    prod: {},
    user: {},
    cart: {},
    address: {},
    shipAddress: {},
    order: {},
    img: null

};
export const mainReducer = (state = intialState, action) => {

    switch (action.type) {

        case LOGIN:

            return { ...state, loading: true }


        case LOGOUT:
            return { ...state, loggedIn: false }

        case GET_DATA:
            return { ...state, loading: true }

        case GET_PRODUCT:
            return { ...state, loading: true }

        case GET_USER:
            return { ...state, loading: false, loggedIn: true, user: action.payload }

        case REGISTER:
            return { ...state, loading: true, user: action.payload }

        case REGISTER_STATUS:
            return { ...state, loading: false, registered: true }

        case SAVE_DATA:
            return {
                ...state, loading: false,
                data: action.payload
            }

        case SAVE_PRODUCT:
            return {
                ...state, loading: false,
                prod: action.payload
            }
            
        case REGISTER_STATUS:
            return { ...state, loading: false, registered: true }

        case FORGOT_PASSWORD:
            return { ...state, loading: true, }

        case ADD_TO_CART:
            return { ...state, loading: true }

        case SAVE_CART:
            return { ...state, loading: false, cart: action.payload }

        case GET_CART:
            return { ...state, loading: true }

        case REMOVE_FROM_CART:
            return { ...state, loading: true }

        case UPDATE_CART:
            return { ...state, loading: true }

        case ADD_ADDRESS:
            return { ...state, loading: true }

        case GET_ADDRESS:
            return { ...state, loading: true }

        case SAVE_ADDRESS:
            return { ...state, loading: false, address: action.payload }

        case DEL_ADDRESS:
            return { ...state, loading: true }

        case UPDATE_ADDRESS:
            return { ...state, loading: true }

        case SAVESHIP_ADDRESS:
            return { ...state, shipAddress: action.payload }

        case DELSHIP_ADDRESS:
            return { ...state, shipAddress: null }

        case PLACE_ORDER:
            return { ...state, loading: true }

        case GET_ORDER:
            return { ...state, loading: true }

        case SAVE_ORDER:
            return { ...state, loading: false, order: action.payload }

        case SETIMG:
            return { ...state, img: action.payload }

        case RESET_PASSWORD:
            return { ...state, loading: true }

        default:
            return state;
    }
}