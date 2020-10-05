import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { saveShippingDetails } from "../../../actions/order";

const ShippingForm = ({ saveShippingDetails, history }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    address1: "",
    address2: "",
    country: "",
    city: "",
    zipcode: "",
    phonenumber: "",
    shippingtype: "free",
  });

  const countries = [
    { id: 1, name: "UAE" },
    { id: 2, name: "Pakistan" },
    { id: 3, name: "Qatar" },
    { id: 4, name: "Saud Arbia" },
    { id: 5, name: "USA" },
  ];

  useEffect(() => {
    setFormData({
      ...formData,
      country: countries.length > 0 && countries[0].name,
    });
  }, []);

  const {
    firstname,
    lastname,
    address1,
    address2,
    country,
    city,
    zipcode,
    phonenumber,
    shippingtype,
  } = formData;

  const onchange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const setShippingType = (e) => {
    setFormData({ ...formData, shippingtype: e.target.value });
  };

  const onsubmit = async (e) => {
    e.preventDefault();

    if (
      firstname == "" ||
      lastname == "" ||
      address1 == "" ||
      address2 == "" ||
      city == "" ||
      zipcode == "" ||
      phonenumber == ""
    ) {
        alert("Pleas fill All the fields")
    } else {
        saveShippingDetails(
            firstname,
            lastname,
            address1,
            address2,
            country,
            city,
            zipcode,
            phonenumber,
            shippingtype,
            history
          );
    }
  };
  return (
    <div className="col-sm-6 ml-5">
      <h3>Shipping Details</h3>
      <hr />
      <div className="container">
        <form onSubmit={(e) => onsubmit(e)}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                onChange={(e) => onchange(e)}
                value={firstname}
                name="firstname"
              />
            </div>
            <div className="form-group col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                onChange={(e) => onchange(e)}
                value={lastname}
                name="lastname"
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Address1"
              onChange={(e) => onchange(e)}
              value={address1}
              name="address1"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Address2"
              onChange={(e) => onchange(e)}
              value={address2}
              name="address2"
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputState">Country</label>
              <select
                id="inputState"
                className="form-control"
                onChange={(e) => onchange(e)}
                value={country}
                name="country"
              >
                {countries.map((country) => (
                  <option key={country.id} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">City</label>
              <input
                type="text"
                className="form-control"
                id="inputCity"
                placeholder="City"
                name="city"
                onChange={(e) => onchange(e)}
                value={city}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Zip/Postal Code"
                name="zipcode"
                onChange={(e) => onchange(e)}
                value={zipcode}
              />
            </div>
            <div className="form-group col-md-6">
              <input
                type="text"
                className="form-control"
                id="inputPhoneNo"
                placeholder="Phone No"
                name="phonenumber"
                onChange={(e) => onchange(e)}
                value={phonenumber}
              />
            </div>
          </div>
          <hr />
          <div className="form-row" onChange={(e) => setShippingType(e)}>
            <div className="form-group col-md-6">
              <div className="form-check form-check-inline wrap-border">
                <input
                  className="form-check-input"
                  defaultChecked
                  type="radio"
                  name="inlineRadioOptions"
                  value="free"
                />
                <label className="form-check-label ml-3">
                  <h6>Free Shipping</h6>
                  <h6>Between 2-5 working Days</h6>
                </label>
              </div>
            </div>
            <div className="form-group col-md-6">
              <div className="form-check form-check-inline wrap-border">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  value="cost"
                />
                <label className="form-check-label ml-3">
                  <h6>Next Day Delivery - AED 20</h6>
                  <h6>24 hours from checkout</h6>
                </label>
              </div>
            </div>
          </div>
          <hr />
          <div className="row mx-3 mb-3">
            <div className="col-sm-6 d-flex justify-content-between">
              <input type="submit" className="btn bg-color px-5" value="Next" />
              <Link
                to="/store/shopping-cart"
                className="btn btn-secondary px-3 mx-2"
                type="button"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
        <hr />
      </div>
    </div>
  );
};

ShippingForm.propTypes = {
  saveShippingDetails: PropTypes.func.isRequired,
};

export default connect(null, { saveShippingDetails })(withRouter(ShippingForm));
