import React, { Fragment,useEffect } from "react";
import ServicesTabList from "../../common/ServicesTabList";
import AppointmentSummary from "../AppoinmentSummary/appointmentSummary";

const AppointmentConfirmation = (props) => {
  useEffect(() => {
    localStorage.removeItem("appointment");
  }, []);
  return (
    <Fragment>
      <div className="container">
        <ServicesTabList title="bookingconfirmation" />

        <hr />
        <div class="row mt-2">
          <div class="col-sm-6 ml-5">
            <h3>Appointment Confirmation</h3>
            <hr />
            <h4>Thank you !</h4>
            <p>
              Your appointment booking is now CONFIRMED. You will receive an
              email with the name and phone number of your dispatched Service
              Provider who shall be arriving at your location at your chosen
              date and time.
            </p>
            <p>
              Don't forget to rate your Service Provider once the service has
              been completed to your satisfaction.
            </p>
            <hr />
          </div>
          <AppointmentSummary />
        </div>
      </div>
    </Fragment>
  );
};

export default AppointmentConfirmation;
