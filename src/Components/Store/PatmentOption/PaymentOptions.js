import React, { Fragment } from 'react'
import TabList from '../ShoppingCart/TabsList'
import SelectPaymentType from './SelectPaymentType'
import OrderSummary from '../ShippingDetails/OrderSummary'

const PaymentOptions = props => {
    return (
        <Fragment>
            <div class="container">
                <TabList title="paymentoption" />
                <hr />
                <SelectPaymentType />
            </div>
        </Fragment>
    )
}

PaymentOptions.propTypes = {

}

export default PaymentOptions
