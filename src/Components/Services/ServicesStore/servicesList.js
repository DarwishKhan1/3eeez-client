import React, { useEffect, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getServices } from '../../../actions/auth'

const ServicesList = ({ auth: { services, loading }, getServices, handleService }) => {

    const handleClick = (name, id) => {
        handleService(name, id);
    }


    useEffect(() => {
        getServices();
    }, []);

    return (loading || !services ? "Loading" : <Fragment>
        <div className="col-md-3">
            <ul className="list-group category-list">
                {
                    services.map(srv => (
                        <li className="list-group-item py-3 text-orange" 
                        key={srv._id} onClick={() => handleClick(srv.value, srv._id)}>
                            {srv.value}
                        </li>
                    ))
                }
            </ul>
        </div>
    </Fragment>

    )
}

ServicesList.propTypes = {
    getServices: PropTypes.func.isRequired,
    handleService: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { getServices })(ServicesList)
