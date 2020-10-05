import {
  CART_ERROR,
  ADD_TO_CART,
  GET_ITEMS,
  REMOVE_ITEM_FROM_CART,
} from "../actions/types";
const initialState = {
  cart: null,
  cartItems: [],
  loading: true,
  subTotal: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ITEMS:
      return {
        ...state,
        cart: payload.usercart,
        cartItems: payload.usercart.items,
        subTotal: payload.subtotal,
        loading: false,
      };
    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.productId._id != payload
        ),
        loading: false,
      };
    case CART_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.productId._id == payload) {
            item.quantity = item.quantity + 1;
          }
          return item;
        }),
        loading: false,
      };
    default:
      return state;
  }
}
