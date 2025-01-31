import React, { Fragment } from 'react'
import TabList from '../ShoppingCart/TabsList'
import OrderSummary from '../ShippingDetails/OrderSummary'

const OrderConfirmation = props => {
    return (
        <Fragment>
            <div class="container">
                <TabList title="orderconfirmation" />
                <hr />
                <div class="row mt-2">
                    <div class="col-sm-6 ml-5">
                        <h3>Order Confirmation</h3>
                        <hr />
                        <h4>Thank you !</h4>
                        <p>
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
                            Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
                            Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from </p>
                        <p> a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the                 undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
                        (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics,
                          very popular during the Renaissance.</p>
                        <hr />
                    </div>
                   <OrderSummary />
                </div>
            </div>
        </Fragment >
    )
}

OrderConfirmation.propTypes = {

}

export default OrderConfirmation
