import React from 'react'
import { Link } from 'react-router-dom'

const ProfileActions = () => {
    return (
        <div className="mb-3">
            <Link to="/service-provider/edit-profile" className="btn btn-light m-1">
                <i className="fa fa-user-circle text-orange" />Edit Profile
            </Link>
            <Link to="/service-provider/add-location" className="btn btn-light m-1">
                <i className="fa fa-user-circle text-orange" />Add Location
            </Link>
            <Link to="/service-provider/add-services" className="btn btn-light m-1">
                <i className="fa fa-user-circle text-orange" />Add Services
            </Link>
            <Link to="/service-provider/appointments" className="btn btn-light m-1">
                <i className="fa fa-user-circle text-orange" />Appointments
            </Link>
        </div>
    )
}

export default ProfileActions