import { combineReducers } from 'redux';
import product from './product'
import category from './category'
import auth from './auth'
import alert from './alert'
import order from './order'
import cart from './cart'
import servicescart from './Services/servicesCart'
import appointment from './Services/appointment'


export default combineReducers({
    product,
    cart,
    category,
    order,
    auth,
    alert,
    servicescart,
    appointment
})