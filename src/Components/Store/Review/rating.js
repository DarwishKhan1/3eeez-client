import React from 'react'
import PropTypes from 'prop-types'
import {FaStar} from 'react-icons/fa'

const Rating = ({productRating}) => {

    return (
        <div className="star-rating">
            {
                [...Array(5)].map((star,i) => {
                    const ratingvalue = i +1;
                    return (
                       <label key={i}>
                           <FaStar className="star" color={ratingvalue <= productRating ? "orange": "#000"} size="10" />
                       </label>
                    )
                } )
            }
        </div>
    )
}

Rating.propTypes = {
    productRating: PropTypes.number.isRequired,
}

export default Rating
