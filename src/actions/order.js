import {SAVE_SHIPPING_DETAILS, SHIPPING_DETAILS_ERROR, ADD_ORDER, ORDER_ERROR} from './types'
import axios from 'axios'
//save shiiping Details about the product
export const saveShippingDetails = (firstname,lastname,address1,address2,country,city,zipcode,phonenumber,shippingtype, history) => dispatch => {
    
    const payload= {
        address: {
            firstName: firstname,
            lastName: lastname,
            address1,
            address2,
            country,
            city,
            zipCode: zipcode,
            mobileNumber: phonenumber
        },
        shippingType: shippingtype
    }

    axios.post('http://localhost:5000/api/admin/address/newAddress', payload)
    .then(res => {
        dispatch({
            type: SAVE_SHIPPING_DETAILS,
            payload: res.data
        })

        return res;
    })
    .then (response => {
        history.push('/store/payment-options')
    })
    .catch(err =>{
        dispatch({
            type: SHIPPING_DETAILS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    })

}

//place order by cart

export const addOrder = (paymentType, paymentStatus, history) => dispatch => {
    const payload = {
        paymentType,
        paymentStatus
    }
    axios.post('http://localhost:5000/api/admin/order/add', payload)
    .then(res => {
        dispatch({
            type: ADD_ORDER,
            payload: res.data
        })

        return res;
    })
    .then (response => {
        history.push('/store/order-confirmation')
    })
    .catch(err =>{
        dispatch({
            type: ORDER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    })
}