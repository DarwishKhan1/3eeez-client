import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { CreateAppointment } from "../../../../actions/Services/appointment";
import AppointmentSummary from "../../AppoinmentSummary/appointmentSummary";
import StripePayment from "react-stripe-checkout";

const SelectPaymentType = ({
  CreateAppointment,
  servicescart: { BookServices },
  history,
}) => {
  const [paymentType, set_Payment_Type] = useState("offline");
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const appoint = JSON.parse(localStorage.getItem("appointment"));
    setAppointment(appoint);
  }, []);

  const setPaymentType = (e) => {
    set_Payment_Type(e.target.value);
  };
  const getSubTotal = (services) => {
    let subtotal = 0;
    services.forEach(function (item) {
      subtotal = subtotal + item.price;
    });

    return subtotal;
  };

  const onsubmit = (e) => {
    e.preventDefault();
    let paymentStatus = "unclear";
    if (paymentType === "online") {
      paymentStatus = "clear";
    }

    const {
      servicerId,
      startDate,
      vehicleType,
      pickUpCoord,
      dropOffCoord,
    } = appointment;

    const finalAppointment = {
      servicerId,
      appointmentDate: startDate,
      vehicleType,
      pickUpCoord,
      dropOffCoord,
      paymentType,
      paymentStatus,
    };

    CreateAppointment(finalAppointment, history);
  };

  const makePayments = (token) => {
    const data = {
      token,
      products: BookServices,
      amount: getSubTotal(BookServices),
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

  return (
    <Fragment>
      <div className="container">
        <div className="row mt-2">
          <div className="col-sm-6 ml-5">
            <h3>Payment Options</h3>
            <hr />
            <div className="container">
              <div className="my-2">
                <StripePayment
                  token={makePayments}
                  stripeKey="pk_test_51HPStyDim1uE4htjuCgbCQaeJTlUoWHuUM5fGAFxrlpJOoJXzLA6JyPHTTHoNPSjpGHvTcksVcejnVFNSO8R1Abj00Uk4Ik78x"
                  name="Online payments"
                  amount={getSubTotal(BookServices) * 100}
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
          <AppointmentSummary />
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  servicescart: state.servicescart,
});

export default connect(mapStateToProps, { CreateAppointment })(
  withRouter(SelectPaymentType)
);
