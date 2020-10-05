import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { addOrder } from "../../../actions/order";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import PropTypes from "prop-types";
import { getItems } from "../../../actions/cart";
import StripePayment from "react-stripe-checkout";


const SelectPaymentType = ({
  addOrder,
  cart: { loading, cart, subTotal,cartItems },
  getItems,
  history,
}) => {
  const [paymentType, set_Payment_Type] = useState("offline");
  useEffect(() => {
    getItems();
  }, []);

  const setPaymentType = (e) => {
    set_Payment_Type(e.target.value);
  };

  const onsubmit = (e) => {
    e.preventDefault();
    let paymentStatus = "unclear";
    if (paymentType === "online") {
      paymentStatus = "clear";
    }

    addOrder(paymentType, paymentStatus, history);
  };
  const makePayments = (token) => {
    const data = {
      token,
      products: cartItems,
      amount: subTotal
    };

    const headers = {
      "Content-Type": "application/json",
    };

    return fetch("http://localhost:5000/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    })
      .then((result) => {
        console.log(result);
        if (result.status === "200") {
          set_Payment_Type("online");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return loading || !cart ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container">
        <hr />
        <div className="row mt-2">
          <div className="col-sm-12 ml-5">
            <h3>Payment Options</h3>
            <hr />
            <div className="container">
              <div className="my-2">
                <StripePayment
                  token={makePayments}
                  stripeKey="pk_test_51HPStyDim1uE4htjuCgbCQaeJTlUoWHuUM5fGAFxrlpJOoJXzLA6JyPHTTHoNPSjpGHvTcksVcejnVFNSO8R1Abj00Uk4Ik78x"
                  name="Online payments"
                  amount={subTotal * 100}
                >
                  <button className="btn btn-primary-outline">
                    Pay With Stripe
                  </button>
                </StripePayment>
              </div>

              <form onSubmit={(e) => onsubmit(e)}>
                <div className="form-group">
                  <div className="form-check form-check-inline wrap-border">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      value="offline"
                      onChange={(e) => setPaymentType(e)}
                    />
                    <label className="form-check-label ml-3">
                      <h5>Cash On Delivery</h5>
                      <p className="text-muted">
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
                        ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                      </p>
                    </label>
                  </div>
                </div>
                <hr />
                <div className="row mx-3 mb-3">
                  <div className="col-sm-6 d-flex justify-content-between">
                    <input
                      type="submit"
                      className="btn btn-secondary px-4 mx-2"
                      value="Next"
                    />
                    <button className="btn bg-color px-3 mx-2" type="button">
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

SelectPaymentType.propTypes = {
  addOrder: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, { addOrder, getItems })(
  withRouter(SelectPaymentType)
);
