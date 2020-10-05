import axios from 'axios'
import { setAlert } from '../alert';
import {CREATE_APPOINTMENT, GET_APPOINTMENTS,GET_APPOINTMENT,DELETE_APPOINTMENT} from '../types'

//Add Item to Cart
export const CreateAppointment = (appointment, history) => dispatch => {

    axios.post('http://localhost:5000/api/services/appointment/create', appointment)
    .then(res => {
        if(res.status == 201 || res.status == 200){
            history.push(`/services/appointment-confirmation`);
        }

        dispatch({
            type: DELETE_APPOINTMENT,
            payload: res.data
        })
    })
    .catch(err =>{

        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
    })
}
// get Specific appointment
export const getSpecificAppointment = (appointmentId) => dispatch => {

    axios.get(`http://localhost:5000/api/services/appointment/${appointmentId}`)
    .then(res => {
    
        dispatch({
            type: GET_APPOINTMENT,
            payload: res.data
        })
    })
    .catch(err =>{

        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
    })
}

// get servicer appointments
export const servicerAppoinments = () => dispatch => {

    axios.get('http://localhost:5000/api/services/appointment/get')
    .then(res => {
    
        dispatch({
            type: GET_APPOINTMENTS,
            payload: res.data
        })
    })
    .catch(err =>{

        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
    })
}

// Delete Specific appointment
export const deleteSpecificAppointment = (appointmentId) => dispatch => {

    axios.delete(`http://localhost:5000/api/services/appointment/delete/${appointmentId}`)
    .then(res => {

        dispatch({
            type: DELETE_APPOINTMENT,
            payload: appointmentId
        })

        servicerAppoinments();
    })
    .catch(err =>{

        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
    })
}
