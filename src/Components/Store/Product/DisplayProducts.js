import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Rating from "../Review/rating";

const DisplayProducts = ({ products, loading }) => {
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
    <div className="col-md-9">
      <div className="row">
        {!products || loading
          ? ""
          : products.map((prd) => (
              <Link
                key={prd._id}
                to={`/store/selected-product/${prd._id}`}
                className="col-md-3 col-sm-12 text-center link"
              >
                <div className="card">
                  <img
                    className="mx-auto mb-1"
                    src={`http://localhost:5000/${prd.imageUrl}`}
                    width="100%"
                    height="150px"
                    alt=""
                  />
                  <h6 className="m-0">{prd.title}</h6>
                  <Rating productRating={getRating(prd.reviews)} />
                  <p>AED {prd.price}</p>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

DisplayProducts.propTypes = {};

export default DisplayProducts;
