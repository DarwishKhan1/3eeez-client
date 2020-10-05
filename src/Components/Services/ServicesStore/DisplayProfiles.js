import React from "react";
import { Link } from "react-router-dom";
import GoogleMaps from "../../common/GoogleMaps";
import Rating from '../Review/rating'

const DisplayProfiles = ({ profiles, loading,  serviceId }) => {
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
    !profiles || loading
    ? "" : (
      <div className="col-md-9">
          {
            //Google Map
            <GoogleMaps markersArray={profiles} />
          }
        <div className="row">
          {
          profiles.map((prd) => (
                <Link
                  key={prd._id}
                  to={`/services/services-store/${prd.serviceProdviderId}/${serviceId}`}
                  className="col-md-4 col-sm-12 text-center link"
                >
                  <div className="card profile-height">
                    <img
                      className="mx-auto mb-1"
                      src={`http://localhost:5000/${prd.profileImage}`}
                      width="100%"
                      height="160px"
                      alt=""
                    />
                    <h6 className="m-0">{prd.location.country}</h6>
                    <Rating productRating={getRating(prd.reviews)} />
                    <p className="address-font-size">{prd.location.address}</p>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    )
  );
};


export default DisplayProfiles;
