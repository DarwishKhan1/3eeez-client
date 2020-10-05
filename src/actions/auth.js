import axios from 'axios';
import {
    REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS,
    LOGOUT, GET_CURRENT_PROFILE, CREATE_PROFILE, EDIT_PROFILE, GET_SERVICES, ADD_SERVICES, DELETE_SERVICE,
     GET_LIMITED_PROFILES,GET_SPECIFIC_SERVICE,GET_SPECIFIC_PROFILE,
     GET_PROFILES
} from '../actions/types';
import { setAlert } from './alert';
import setAuthToken from '../utility/setAuthToken';
import jwt_decode from 'jwt-decode';

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('http://localhost:5000/api/admin/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data,
        })
    } catch (error) {

        console.log(error);

        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const register = ({ name, email, password, isServiceProvider, history }) => async dispatch => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({ name, email, password, isServiceProvider });

    try {
        const res = await axios.post('http://localhost:5000/api/admin/auth', body, config);

        const decoded_token = jwt_decode(res.data.token);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
            isServiceProvider: decoded_token.user.isServiceProvider
        });

        dispatch(loadUser());

        if (decoded_token.user.isServiceProvider) {
            history.push('/service-provider/profile')
        }


    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL
        })
    }
}


export const login = ({ email, password, history }) => async dispatch => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }


    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('http://localhost:5000/api/admin/auth/login', body, config);

        const decoded_token = jwt_decode(res.data.token);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
            isServiceProvider: decoded_token.user.isServiceProvider
        });

        dispatch(loadUser());

        if (decoded_token.user.isServiceProvider) {
            history.push('/service-provider/profile')
        }

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}


export const getProfile = () => async dispatch => {

    try {
        const res = await axios.get('http://localhost:5000/api/services/profile');

        dispatch({
            type: GET_CURRENT_PROFILE,
            payload: res.data
        });


    } catch (err) {

        console.log(err);
        
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
    }
}

export const getSpecificProfile = (profileId) => async dispatch => {

    try {
        const res = await axios.get(`http://localhost:5000/api/services/profile/${profileId}`);

        dispatch({
            type: GET_SPECIFIC_PROFILE,
            payload: res.data
        });


    } catch (err) {

        console.log(err);
        
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
    }
}

export const  getSpecificService = (serviceId) => async dispatch => {


    try {

        const res = await axios.get(`http://localhost:5000/api/services/${serviceId}`);

        dispatch({
            type: GET_SPECIFIC_SERVICE,
            payload: res.data,
        });

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
    }
}

export const createProfile = (image, servicerName, history) => async dispatch => {

    const formData = new FormData();

    formData.append("image", image);
    formData.append("servicerName", servicerName);


    try {
        const res = await axios.post('http://localhost:5000/api/services/profile', formData);

        dispatch({
            type: CREATE_PROFILE,
            payload: res.data,
        });


        history.push('/service-provider/profile')


    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
    }
}

export const editProfile = (image, history) => async dispatch => {

    const formData = new FormData();

    formData.append("image", image);

    try {

        const res = await axios.post('http://localhost:5000/api/services/profile/update', formData);

        dispatch({
            type: EDIT_PROFILE,
            payload: res.data,
        });


        history.push('/service-provider/profile')


    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
    }
}


export const getServices = () => async dispatch => {


    try {

        const res = await axios.get('http://localhost:5000/api/services/all');

        dispatch({
            type: GET_SERVICES,
            payload: res.data,
        });

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
    }
}


export const addServices = (services, history) => async dispatch => {


    try {

        const res = await axios.post('http://localhost:5000/api/services/profile/services', services);

        dispatch({
            type: ADD_SERVICES,
            payload: res.data,
        });

        history.push('/service-provider/profile')

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
    }
}

export const removeService = (serviceId, _id, history) => async dispatch => {

    try {
        const res = await axios.delete(`http://localhost:5000/api/services/profile/service/${serviceId}`);

        dispatch({
            type: DELETE_SERVICE,
            payload: _id
        })

        getProfile();

        if (res.status === 200) {
            history.push('/service-provider/profile')
        }

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
    }
}

export const addLocation = (location, history) => async dispatch => {

    try {
        const res = await axios.post('http://localhost:5000/api/services/profile/location', location);
        if (res.status === 200) {
            history.push('/service-provider/profile')
        }

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
    }
}

export const getLimitedProfiles = () => async dispatch => {

    try {
        const res = await axios.get('http://localhost:5000/api/services/profile/limited');
        dispatch({
            type: GET_LIMITED_PROFILES,
            payload: res.data
        })

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
    }
}
export const getProfiles = service_name => async dispatch => {

    const variables ={
        serviceName: service_name
    }
    
    try {
        const res = await axios.post('http://localhost:5000/api/services/profile/all', variables);

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
    }
}

export const addReview = (rating, comment, id) => dispatch => {
    const payload = {
        rating,
        comment
    }
    axios.post(`http://localhost:5000/api/services/profile/review/${id}`,payload)
        .then(res => {
          getSpecificProfile(id);
          alert("Review is Added.");
        })
        .catch(err => {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
            }
           
        });
}


//logout
// export const logout = () => dispatch => {
//     dispatch({
//         type: LOGOUT
//     })
//     dispatch({
//         type: CLEAR_PROFILE
//     })
// }