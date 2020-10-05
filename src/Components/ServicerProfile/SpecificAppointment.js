import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSpecificAppointment } from "../../actions/Services/appointment";

const SpecificAppointment = ({
  appointment: { appointment, loading },
  getSpecificAppointment,
  match,
}) => {
  const appID = match.params.id;
  useEffect(() => {
    getSpecificAppointment(appID);
  }, []);
  return appointment == null || loading ? (
    "Loading"
  ) : (
    <div className="container">
      <div className="card">
        <div class="card-body">
          <h2 class="card-title">
            <strong>Customer Name: </strong>
            {appointment.userId.name}
          </h2>
          <h3 className="text-orange">Services</h3>
          {appointment.services.map((ser, index) => (
            <div key={index}>
              <p>
                {" "}
                <strong>Service Name: </strong>
                {ser.serviceName}
              </p>
            </div>
          ))}
          <hr />
          <p class="card-text">
            <strong>Vehicle Type: </strong>
            {appointment.vehicleType[0]}
          </p>
          <p class="card-text">
            <strong>Appointment Time: </strong>
            {appointment.date}
          </p>
          <p class="card-text">
            <strong>Total Cost: </strong>
            {appointment.total}
          </p>
          <p class="card-text">
            <strong>Payment Type: </strong>
            {appointment.paymentType}
          </p>
          <p class="card-text">
            <strong>Payment Status: </strong>
            {appointment.paymentStatus}
          </p>
          <hr />
          <Link
            to={`/service-provider/appointment/${appointment.pickUpLocation.lat}/${appointment.pickUpLocation.lng}`}
            class="card-link"
          >
            Pick Up Location
          </Link>
          <Link
            to={`/service-provider/appointment/${appointment.dropOffLocation.lat}/${appointment.dropOffLocation.lng}`}
            class="card-link"
          >
            Drop Off Location
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  appointment: state.appointment,
});

export default connect(mapStateToProps, { getSpecificAppointment })(
  SpecificAppointment
);
