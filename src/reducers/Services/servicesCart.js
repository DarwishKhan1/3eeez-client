import { ADD_SERVICE_TO_CART, CART_ERROR } from "../../actions/types";

const intialState = {
  loading: true,
  BookServices: [],
  error:null
};

export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_SERVICE_TO_CART:
      return {
        ...state,
        loading: false,
        BookServices: payload,
      };
    case CART_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
