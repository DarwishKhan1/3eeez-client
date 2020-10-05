import React, { Fragment } from 'react'
import TabList from '../ShoppingCart/TabsList'
import ShippingForm from './ShippingForm'
import OrderSummary from './OrderSummary'

const ShippingDetails = props => {
    return (
        <Fragment>
            <div className="container">
                <TabList title="shippingdetails" />
                <hr />
                <div className="row mt-2">

                    <ShippingForm />
                    <OrderSummary />
                </div>
            </div>
        </Fragment>
    )
}

export default ShippingDetails
