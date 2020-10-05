import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { getProfiles } from "../../../actions/auth";
import { connect } from "react-redux";
import SearchFilter from "../../common/SearchFilter";
import ServicesList from "./servicesList";
import Pagination from "../../common/Pagination";
import DisplayProfiles from "./DisplayProfiles";
import axios from "axios";

const Services = ({ getProfiles, auth: { loading, profiles } }) => {
  const [serviceName, setServiceName] = useState("");
  const [serviceId, setServiceId] = useState(null);
  const [serviceClicked,setServiceClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [profilesPerPage] = useState(6);

  const getAllServices = () => {
    axios
      .get("http://localhost:5000/api/services/all")
      .then((res) => {
          setServiceName(res.data[0].value)
          setServiceId(res.data[0]._id)
      })
      .catch((err) => {
          alert(err);
      });
  };

  useEffect(() => {
    getProfiles(serviceName);
    if (!serviceClicked) {
        getAllServices()
    }
  }, [serviceName]);

  const handleSearchFilter = (searchingTerm, ser_id) => {
    setServiceName(searchingTerm);
    setServiceId(ser_id);
    setServiceClicked(true);
  };

  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles =
    profiles && profiles.slice(indexOfFirstProfile, indexOfLastProfile);

  const handlePagination = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          {/* Specify Category which is clicked*/}
          <div className="col-md-6 ">
            <div className="row selected-category">
              <p>
                Services Home <i className="fa fa-angle-right"></i>
              </p>
              {serviceName && (
                <p className="ml-4 text-orange">
                  {serviceName} <i className="fa fa-angle-right"></i>
                </p>
              )}
            </div>
          </div>
          {/* Search Component */}
          <SearchFilter
            handleSearch={(searchingTerm) => handleSearchFilter(searchingTerm)}
          />
        </div>
      </div>
      {/* Pagination */}
      <Pagination
        totalItems={profiles.length}
        itemsPerPage={profilesPerPage}
        paginate={handlePagination}
      />

      <div className="container my-3">
        <div className="row">
          {/* Category List */}
          <ServicesList handleService={(name,ser_id) => handleSearchFilter(name, ser_id)} />

          {/* List Of Products */}
          <DisplayProfiles profiles={currentProfiles} loading={loading} serviceId={serviceId}/>
        </div>
      </div>
    </Fragment>
  );
};

Services.propTypes = {
  getProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfiles })(Services);
