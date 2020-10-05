import {CART_ERROR, ADD_SERVICE_TO_CART}  from '../types'
import axios from 'axios'
import { setAlert } from '../alert';

//Add Item to Cart
export const AddServiceToServiceCart = (profileId, serviceId, name, price, servicerName, history) => dispatch => {

    const variables = {
        servicerId: profileId,
        serviceId,
        name,
        price,
       servicerName
    }

    axios.post('http://localhost:5000/api/services/services-cart/add', variables)
    .then(res => {
     
        if(res.status == 201 || res.status == 200){
            history.push(`/services/services-cart/${profileId}`);
        }
        dispatch({
            type: ADD_SERVICE_TO_CART,
            payload: res.data.services
        })
    })
    .catch(err =>{

        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
    })
}

export const getServiceCart = (servicerId) => dispatch => {

    axios.get(`http://localhost:5000/api/services/services-cart/${servicerId}`)
    .then(res => {
        console.log(res);
        dispatch({
            type: ADD_SERVICE_TO_CART,
            payload: res.data
        })
    })
    .catch(err =>{

        console.log(err);
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
    })
}



