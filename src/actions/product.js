import axios from 'axios'
import { GET_PRODUCTS, GET_PRODUCT, GET_CATEGORY_PRODUCTS, PRODUCT_ERROR, ADD_REVIEW } from './types';
import {setAlert} from './alert'
//get all products
export const getProducts = variables => dispatch => {

    axios.post(`http://localhost:5000/api/admin/product/all`, variables)
        .then(res => {
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: PRODUCT_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        });

}

//get all products
export const getProduct = (id) => dispatch => {
    axios.get(`http://localhost:5000/api/admin/product/${id}`)
        .then(res => {
            dispatch({
                type: GET_PRODUCT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: PRODUCT_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        });
}
//get all products by category
export const getProductByCategory = (id) => dispatch => {
    axios.get(`http://localhost:5000/api/admin/product/category/${id}`)
        .then(res => {
            dispatch({
                type: GET_CATEGORY_PRODUCTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: PRODUCT_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        });
}

export const addReview = (rating, comment, id) => dispatch => {
    const payload = {
        rating,
        comment
    }
    axios.post(`http://localhost:5000/api/admin/product/review/${id}`,payload)
        .then(res => {
          getProduct(id);
          alert("Review is Added.");
        })
        .catch(err => {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
            }
            dispatch({
                type: PRODUCT_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        });
}

