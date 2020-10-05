import { SHIPPING_DETAILS_ERROR, SAVE_SHIPPING_DETAILS, ADD_ORDER, ORDER_ERROR } from '../actions/types';
const initialState = {
    shippingDetails: null,
    order: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SAVE_SHIPPING_DETAILS:
            return {
                ...state,
                shippingDetails: payload,
                loading: false
            }
        case SHIPPING_DETAILS_ERROR:
        case ORDER_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case ADD_ORDER:
            return {
                ...state,
                order: payload,
                loading: false
            }
        default:
            return state
    }
}