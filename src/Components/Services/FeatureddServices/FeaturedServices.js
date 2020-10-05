import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import ServicesSlider from "./ServicesSlider";
import { getLimitedProfiles } from "../../../actions/auth";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Rating from '../Review/rating'
import GoogleMaps from "../../common/GoogleMaps";

const FeaturedServices = ({
  getLimitedProfiles,
  auth: { profiles, loading },
}) => {
  useEffect(() => {
    getLimitedProfiles();
  }, []);

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

  return (
    <div className="container">
      <ServicesSlider />
      <hr className="my-3" />
      {!(profiles.length > 0) ? (
        <h3 className="my-4">No Profiles</h3>
      ) : (
        <Fragment>
          <div className="container">
            <h3 className="text-center">Service Providers Near You</h3>
            <GoogleMaps markersArray={profiles} />
          </div>
          <div className="container">
            <div className="row">
              {loading || !profiles ? (
                <Spinner />
              ) : (
                profiles.map((prf) => {
                  return (
                    <Link
                      key={prf._id}
                      to={`/services/services-store`}
                      className="col-md-4 col-sm-12 text-center link"
                    >
                      <div className="card profile-height">
                        <img
                          className="mx-auto mb-1"
                          src={`http://localhost:5000/${prf.profileImage}`}
                          width="100%"
                          height="200px"
                          alt=""
                        />
                        <h6 className="m-0">{prf.location.city}</h6>
                        <Rating productRating={getRating(prf.reviews)} />
                        <p className="address-font-size">{prf.location.address}</p>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
            <div className="row">
                    <Link to={`/services/services-store`}>More Services</Link>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

FeaturedServices.propTypes = {
  getLimitedProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getLimitedProfiles })(
  FeaturedServices
);
