import React, { useState } from 'react'
import {FaStar} from 'react-icons/fa'
import {connect} from 'react-redux'
import {addReview} from '../../../actions/auth'

const ReviewForm = ({productId, addReview, isAuthenticated}) => {

    const [comment, setcomment] = useState("");
    const [rating, setRating] = useState(null)

    const onchange = e => {
        setcomment(e.target.value);
    }

    const onsubmit = e => {
        e.preventDefault();

        if(rating !== null){
            addReview(rating,comment,productId);
        }else{
            alert("Please rate the profile.")
        }
    }

    return isAuthenticated && (
        <div className="container">
            <h4 className="text-center">You can give review about this product</h4>
            <hr />
            <div className="row">
                <div className="star-rating mx-auto">
                    {
                        [...Array(5)].map((star, i) => {
                            const ratingvalue = i + 1;
                            return (
                                <label key={i}>
                                    <input type="radio" name="rating" value={ratingvalue} onClick={() => setRating(ratingvalue)} />
                                    <FaStar className="star" color={ratingvalue <= rating ? "orange" : "#000"} size="30" />
                                </label>
                            )
                        })
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <form onSubmit={e => onsubmit(e)}>
                        <div className="form-group text-center pt-3">
                            <textarea className="form-control textarea" onChange={e => onchange(e)} rows="7" placeholder="Write Your Short comment here"></textarea>
                        </div>
                        <button type="submit" className="btn bg-color">Send</button>
                    </form>
                </div>
            </div>
            <hr />
        </div>
    )
}


const mapStateToProps= state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {addReview})(ReviewForm)
