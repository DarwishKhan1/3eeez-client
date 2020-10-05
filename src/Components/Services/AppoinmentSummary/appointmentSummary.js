import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";

const AppointmentSummary = ({ servicescart: { BookServices, loading } }) => {

  const getSubTotal = (services) => {
    let subtotal = 0;
    services.forEach(function (item) {
      subtotal = subtotal + item.price;
    });

    return subtotal;
  };


  return loading ? (
    <Spinner />
  ) : (
    <div className="col-sm-4 ml-5">
      <h3>Appoinmtent Summary</h3>
      <hr />
      <div className="row">
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
      <hr />
      {BookServices.length > 0 && (
        <div>
          <div className="d-flex justify-content-between">
            <h6>SUBTOTAL</h6>
            <p> AED: {getSubTotal(BookServices)}</p>
          </div>
          <div className="d-flex justify-content-between">
            <h6>DELIEVERYCHARGES</h6>
            <p>FREE</p>
          </div>
          <div className="d-flex justify-content-between">
            <h6>TAXES</h6>
            <p>AED: 26.3</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h6>TOTAL</h6>
            <p>AED: {getSubTotal(BookServices) + 26.3}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  servicescart: state.servicescart,
});

export default connect(mapStateToProps)(AppointmentSummary);
