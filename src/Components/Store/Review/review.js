import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import Rating from './rating'
import Avatar from '../../../Assets/images/avatar.png'
import ReviewForm from './reviewForm'

const review = ({ selproduct: {reviews, _id} }) => {

    return <Fragment>
       { !reviews || reviews.length <= 0 ? <h3 className="my-3 text-center">No Reviews for this product</h3> : (<div className="row">
            <h2 className="my-5">Reviews</h2>
            <div className="container">
                {
                    reviews.map(rev => {
                        return (
                            <Fragment key={rev._id}>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="row">
                                            <div className="col-sm-3 my-auto">
                                                <img className="avatar-border" src={Avatar} height="40rem" width="40rem" />
                                            </div>
                                            <div className="col-sm-9 text-orange">
                                                <h4>{rev.name}</h4>
                                                <p>{rev.date}</p>
                                                <Rating productRating={rev.rating} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-9">
                                        <p>{rev.comment}</p>
                                    </div>
                                </div>
                                <hr width="25%" />
                            </Fragment>
                        )
                    })
                }
            </div>

        </div>)}
        <ReviewForm productId={_id}/>
    </Fragment>
}

review.propTypes = {
    selproduct: PropTypes.object.isRequired,
}

export default review
