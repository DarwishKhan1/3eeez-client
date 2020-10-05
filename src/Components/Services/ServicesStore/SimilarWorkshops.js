import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Rating from '../Review/rating'

const SimilarWorkshops = ({profiles, serviceId}) => {

    const getRating = reviews => {

        let totalRating = 0;
        let totalprdrating = 0;

        reviews && reviews.map((rat, i) => {
            totalprdrating = i + 1;
            return totalRating = totalRating + rat.rating;
        });

        if ((totalRating / totalprdrating).toString() === "NaN") {
            return 0;
        } else {
            return (totalRating / totalprdrating);
        }
    }

    return profiles.length <= 0 ? '' : (
        <Fragment>
            <div className="row">
                <h2 className="my-4 mx-auto">Similar Service Provider</h2>
                <div className="container">
                    <div className="row">
                        {
                            profiles.map((prd) => (
                                <Link
                                  key={prd._id}
                                  to={`/services/services-store/${prd.serviceProdviderId}/${serviceId}`}
                                  className="col-md-4 col-sm-12 text-center link"
                                >
                                  <div className="card">
                                    <img
                                      className="mx-auto mb-1"
                                      src={`http://localhost:5000/${prd.profileImage}`}
                                      width="100%"
                                      height="160px"
                                      alt=""
                                    />
                                    <h6 className="m-0">{prd.location.country}</h6>
                                    <Rating productRating={getRating(prd.reviews)} />
                                    <p>{prd.location.address}</p>
                                  </div>
                                </Link>
                              ))
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(SimilarWorkshops)
