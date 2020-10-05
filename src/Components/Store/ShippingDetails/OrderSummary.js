import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { getItems } from '../../../actions/cart'
import { connect } from 'react-redux'
import Spinner from '../../common/Spinner'


const OrderSummary = ({ cart: { loading, cart, subTotal }, getItems }) => {

    useEffect(() => {
        getItems();
    }, [])

    return loading || !cart ? <Spinner /> : <div className="col-sm-4 ml-5">
        <h3>Order Summary</h3>
        <hr />
        <div className="row">
            {
                cart.items.map(item => (
                    <div className="d-flex mb-1" key={item._id}>
                        <div>
                            <img src={`http://localhost:5000/${item.productId.imageUrl}`} width="100px" alt="" />
                        </div>
                        <div className="m-2">
                            <h5>{item.productId.title}</h5>
                            <p>AED {item.price}</p>
                        </div>
                    </div>

                ))
            }
        </div>
        <hr />
        <div className="d-flex justify-content-between">
            <h6>SUBTOTAL</h6>
            <p> AED: {subTotal}</p>
        </div>
        <div className="d-flex justify-content-between">
            <h6>DELIEVERYCHARGES</h6>
            <p>FREE</p>
        </div>
        <div className="d-flex justify-content-between">
            <h6>TAXES</h6>
            <p>AED:26.3</p>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
            <h6>TOTAL</h6>
            <p>AED: {subTotal + 26.3}</p>
        </div>
    </div>
}

OrderSummary.propTypes = {
    cart: PropTypes.object.isRequired,
    getItems: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    cart: state.cart
})

export default connect(mapStateToProps, { getItems })(OrderSummary)
