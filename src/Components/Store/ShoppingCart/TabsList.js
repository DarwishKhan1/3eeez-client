import React, { Fragment } from 'react'

const TabList = ({title}) => {
    return (
        <Fragment>
            <div className="TabList">
                <ul className="d-flex justify-content-between">
                    <li className={`btn ${title==="shoppingcart" ? "ActiveTab": " "}`}><a href="#">1. Shopping Cart</a></li>
                    <li  className={`btn ${title==="shippingdetails" ? "ActiveTab": " "}`}><a href="#">2. Shipping Detail</a></li>
                    <li  className={`btn ${title==="paymentoption" ? "ActiveTab": " "}`}><a href="#">3. Payment Option</a></li>
                    <li  className={`btn ${title==="orderconfirmation" ? "ActiveTab": " "}`}><a href="#">4. Order Confirmation</a></li>
                </ul>
            </div>
        </Fragment>
    )
}

export default TabList
