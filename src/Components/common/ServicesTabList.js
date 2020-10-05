import React, { Fragment } from 'react'

const ServicesTabList = ({title}) => {
    return (
        <Fragment>
            <div className="TabList">
                <ul className="d-flex justify-content-between">
                    <li className={`btn ${title==="bookappointment" ? "ActiveTab": " "}`}><a href="#">1. Book Appointment</a></li>
                    <li  className={`btn ${title==="paymentoptions" ? "ActiveTab": " "}`}><a href="#">2. Payment Options</a></li>
                    <li  className={`btn ${title==="bookingconfirmation" ? "ActiveTab": " "}`}><a href="#">3. Booking Confirmation</a></li>
                </ul>
            </div>
        </Fragment>
    )
}

export default ServicesTabList