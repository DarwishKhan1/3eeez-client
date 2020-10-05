import {GET_CATEGORY, GET_CATEGORIES, CATEGORY_ERROR} from './types'
import axios from 'axios'
//get all categories
export const getCategories = () => dispatch => {
    axios.get('http://localhost:5000/api/admin/category/all')
    .then(res => {
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data

        })
    })
    .catch(err =>{
        dispatch({
            type: CATEGORY_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    })

}

//get single category
// export const getCurrentCategory = categoryId => async dispatch => {

//     try {
//         const res = await axios.get(`/api/admin/category/${categoryId}`);
//         dispatch({
//             type: GET_CURRENT_CATEGORY,
//             payload: res.data
//         })
//     } catch (err) {
//         dispatch({
//             type: CATEGORY_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status }
//         });
//     }
// }
