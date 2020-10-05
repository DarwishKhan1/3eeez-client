import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getServiceCart } from "../../../actions/Services/servicesCart";
import ServicesTabList from "../../common/ServicesTabList";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import "react-datepicker/dist/react-datepicker.css";
import Map from "../../Auth/Map";
import SelectVehicle from '../../common/SelectVehicle';

const style1 = {
  width: "100%",
  height: "400px",
  marginLeft: "40px",
};

const Appointment = ({
  servicescart: { BookServices, loading },
  getServiceCart,
  match,
  history
}) => {
  const servicerId = match.params.servicerId;
  const [pickUpCoord, setPickUpCoord] = useState(null);
  const [dropOffCoord, setDropOffCoord] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 9)
  );

  useEffect(() => {
    getServiceCart(servicerId);
  }, [servicerId]);

  const handleAppointment = () => {
    const appointment = {
      servicerId,
      startDate,
      vehicleType,
      pickUpCoord,
      dropOffCoord,
    };
    if (pickUpCoord === null || dropOffCoord === null || vehicleType === null) {
      alert("Please Fill the Fields");
    } else {
      localStorage.setItem("appointment", JSON.stringify(appointment));
      history.push("/services/payment-options");
      
    }
  };

  const getPickUpCoordinates = (e) => {
    setPickUpCoord(e);
    alert("You Selected Pick Up Coordinates");
  };

  const getDropOffCoordinates = (e) => {
    setDropOffCoord(e);
    alert("You Selected Drop Off Coordinates");
  };

  return (
    <Fragment>
      <div className="container">
        <ServicesTabList title="bookappointment" />
        <hr />
        <div className="row mt-2">
          <div className="col-sm-12">
            <h3>Services Selected</h3>
            <hr />
            <div className="row">
              <div className="col-sm-6">
                {BookServices.map((item) => (
                  <div className="row" key={item._id}>
                    <div className="col-sm-12 d-flex">
                      <div>
                        <img
                          src={`http://localhost:5000/${item.serviceId.imageUrl}`}
                          width="100px"
                          alt=""
                        />
                      </div>
                      <div className="ml-4 my-2">
                        <h5 className="m-0 p-0">{item.serviceId.value}</h5>
                        <h6 className="text-orange mt-2 p-0">Servicer Name:</h6>
                        <p className="m-0 p-0">{item.servicerName}</p>
                        <p className="m-0 p-0">AED {item.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-sm-6">
                <div className="my-2">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    minDate={new Date()}
                    showTimeSelect
                    includeTimes={[
                      setHours(setMinutes(new Date(), 0), 9),
                      setHours(setMinutes(new Date(), 0), 10),
                      setHours(setMinutes(new Date(), 0), 11),
                      setHours(setMinutes(new Date(), 0), 12),
                      setHours(setMinutes(new Date(), 0), 13),
                      setHours(setMinutes(new Date(), 0), 14),
                      setHours(setMinutes(new Date(), 0), 15),
                      setHours(setMinutes(new Date(), 0), 16),
                    ]}
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                </div>
                <div>
                  <SelectVehicle selectedVehicle={e => setVehicleType(e)}/>
                </div>
              </div>
            </div>
            <div className="container">
              <hr />
              <h3>Select Your Location for Vehicle Pick-up</h3>

              <button
                type="button"
                className="btn text-orange"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                Select Pick Up Location
              </button>
            </div>
            <div className="container">
              <hr />
              <h3>Select Your Location for Vehicle Drop-Off</h3>
              <button
                type="button"
                className="btn text-orange"
                data-toggle="modal"
                data-target="#dropOffModal"
              >
                Select Drop Off Location
              </button>
            </div>
          </div>
        </div>
        <div className="row mx-3 my-3">
          <div className="col-sm-6 d-flex justify-content-between">
            <button
              onClick={handleAppointment}
              className="btn btn-secondary px-5"
              type="button"
            >
              Next
            </button>
            <Link
              to="/services/services-store"
              className="btn bg-color px-5"
              type="button"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>

      {/* To get Pick Up Location */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Select Pick Up Location
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div style={style1}>
                <Map
                  latitude={30.3753}
                  longitude={69.34}
                  showMarker={false}
                  handleCoordinates={(e) => getPickUpCoordinates(e)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* To get Drop Off Location */}

      <div
        className="modal fade"
        id="dropOffModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Select Pick Up Location
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div style={style1}>
                <Map
                  latitude={30.3753}
                  longitude={69.34}
                  showMarker={false}
                  handleCoordinates={(e) => getDropOffCoordinates(e)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Appointment.propTypes = {
  servicescart: PropTypes.object.isRequired,
  getServiceCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  servicescart: state.servicescart,
});

export default connect(mapStateToProps, { getServiceCart })(
  withRouter(Appointment)
);
