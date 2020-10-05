import {  CATEGORY_ERROR, GET_CATEGORIES} from '../actions/types'
const initialState = {
    categories: [],
    category: null,
    loading: true,
    error: {}
};


export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload,
                loading: false
            }
        case CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }

        default:
            return state;
    }
}