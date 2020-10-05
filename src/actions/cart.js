import {GET_ITEMS, CART_ERROR, REMOVE_ITEM_FROM_CART, ADD_TO_CART}  from './types'
import axios from 'axios'

//get all item
export const getItems = () => dispatch => {
    
    axios.get('http://localhost:5000/api/admin/cart')
    .then(userCart => {
        let subtotal=0;
        userCart.data.items.forEach(function (item) {
            subtotal = subtotal + item.total;
        });
        dispatch({
            type: GET_ITEMS,
            payload: {usercart: userCart.data, subtotal: subtotal }
        })
    })
    .catch(err =>{
        dispatch({
            type: CART_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    })

}

//Add Item to Cart
export const AddProductToCart = (model, product) => dispatch => {

    const {_id,price} = product;

    const variables = {
        productId: _id,
        price,
        model
    }
    
    axios.post('http://localhost:5000/api/admin/cart/add', variables)
    .then(res => {
        console.log(variables);
        getItems();
    })
    .catch(err =>{
        dispatch({
            type: CART_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    })

}

//increase product quantity
export const IncreaseQuantity = (item) => dispatch => {

    const {productId,price, model} = item;

    const variables = {
        productId: productId._id,
        price,
        model
    }

    axios.post('http://localhost:5000/api/admin/cart/add', variables)
    .then(userCart => {
        dispatch({
            type: ADD_TO_CART,
            payload: productId._id
        });
       getItems();
    })
    .catch(err =>{
        dispatch({
            type: CART_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    })

}

//remove Item from Cart
export const RemoveItemFromCart = (productId) => dispatch => {
  
    axios.delete(`http://localhost:5000/api/admin/cart/removeItem/${productId}`)
    .then(res => {
        dispatch({
            type: REMOVE_ITEM_FROM_CART,
            payload: productId
        });
        getItems();
    })
    .catch(err =>{
        dispatch({
            type: CART_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    })

}


