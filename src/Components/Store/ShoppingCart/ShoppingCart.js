import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import PropTypes from "prop-types";
import {
  getItems,
  IncreaseQuantity,
  RemoveItemFromCart,
} from "../../../actions/cart";
import { Link } from "react-router-dom";

import TabList from "./TabsList";

const ShoppingCart = ({
  cart: { loading, cart, cartItems },
  getItems,
  IncreaseQuantity,
  RemoveItemFromCart,
}) => {
  useEffect(() => {
    getItems();
  }, []);

  return loading || !cart ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container">
        <TabList title="shoppingcart" />
        <hr />
        <div className="row mt-2">
          <div className="col-sm-8">
            <h3>Shopping Cart</h3>
            <hr />
            {cartItems.length <= 0
              ? "No Items"
              : cartItems.map((item, index) => (
                  <div className="row" key={index}>
                    <div className="col-sm-12 d-flex">
                      <div>
                        <img
                          src={`http://localhost:5000/${item.productId.imageUrl}`}
                          width="100px"
                          alt=""
                        />
                      </div>
                      <div className="ml-4 my-2">
                        <h5 className="m-0 p-0">{item.productId.title}</h5>
                        <p className="text-muted m-0 p-0">
                          {item.productId.description}
                        </p>
                        <p className="m-0 p-0">AED {item.price}</p>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn text-orange"
                          onClick={() => RemoveItemFromCart(item.productId._id)}
                        >
                          Remove Item
                        </button>
                        <p className="mx-2">{item.quantity}</p>
                        <button
                          className="btn text-orange"
                          onClick={() => IncreaseQuantity(item)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            <hr />
          </div>
        
        </div>
        <div className="row mx-3 mb-3">
          <div className="col-sm-6 d-flex justify-content-between">
            <Link
              to="/store/shipping-details"
              className="btn btn-secondary px-3 mx-2"
              type="button"
            >
              Next
            </Link>
            <button className="btn bg-color px-3 mx-2" type="button">
              Cancel
            </button>
            <Link
              to="/store/products"
              className="btn btn-secondary px-3 mx-2"
              type="button"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ShoppingCart.propTypes = {
  cart: PropTypes.object.isRequired,
  getItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, {
  getItems,
  IncreaseQuantity,
  RemoveItemFromCart,
})(ShoppingCart);
