import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getSpecificProfile, getSpecificService } from "../../../actions/auth";
import { AddServiceToServiceCart } from "../../../actions/Services/servicesCart";
import SimilarWorkshops from "./SimilarWorkshops";
import Review from "../Review/review";
import Rating from "../Review/rating";
import Alert from "../../Alert/alert";

const SelectedProfile = ({
  auth: { loading, profile, service, profiles },
  isAuthenticated,
  getSpecificProfile,
  getSpecificService,
  AddServiceToServiceCart,
  match,
  history
}) => {
  const profileId = match.params.profileId;
  const serviceId = match.params.serviceId;

  useEffect(() => {
    getSpecificProfile(profileId);
    getSpecificService(serviceId);
  }, [profileId]);

  const getRating = (reviews) => {
    let totalRating = 0;
    let totalprdrating = 0;

    reviews &&
      reviews.map((rat, i) => {
        totalprdrating = i + 1;
        return (totalRating = totalRating + rat.rating);
      });

    if ((totalRating / totalprdrating).toString() === "NaN") {
      return 0;
    } else {
      return totalRating / totalprdrating;
    }
  };

  return (
    <Fragment>
      <div className="container">
        <div className="text-center my-2">
          <Alert />
        </div>
        <div className="row selected-category">
          <p>
            Services Home <i className="fa fa-angle-right"></i>
          </p>
          <p className="ml-4 text-orange">
            {service && service.value} <i className="fa fa-angle-right"></i>
          </p>
        </div>
        <hr />
        {loading || !profile || !service ? (
          "Loading"
        ) : (
          <Fragment>
            <div className="row">
              <div className="col-md-6">
                <div className="selected-product-img">
                  <img
                    src={`http://localhost:5000/${profile.profileImage}`}
                    width="80%"
                    height="80%"
                    alt="Profile Image"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <h1 className="mt-2">{profile.servicerName}</h1>
                <div className="d-flex">
                  <Rating productRating={getRating(profile.reviews)} />
                  <span className="ml-2">{profile.reviews.length} reviews</span>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-4">
                    <h2 className="mt-2">AED {service.price}</h2>
                  </div>
                </div>
                <hr />
                <p className="mt-1 ml-2">{service.description}</p>
                <hr />
                {isAuthenticated ? (
                  <button
                    onClick={() => AddServiceToServiceCart(profileId,serviceId,service.value,service.price, profile.servicerName,history)}
                    className="bg-color btn"
                    type="button"
                  >
                    Book Service
                  </button>
                ) : (
                  <Link to="/login" className="bg-color btn">
                    Login First
                  </Link>
                )}
              </div>
            </div>
            <hr />
            <SimilarWorkshops profiles={profiles} serviceId={serviceId} />
            <hr />
            <Review selproduct={profile} />
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

SelectedProfile.propTypes = {
  getSpecificService: PropTypes.func.isRequired,
  getSpecificProfile: PropTypes.func.isRequired,
  AddServiceToServiceCart: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getSpecificProfile,
  getSpecificService,
  AddServiceToServiceCart
})(withRouter(SelectedProfile));
