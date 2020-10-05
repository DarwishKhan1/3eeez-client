import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProduct } from '../../../actions/product'
import { AddProductToCart } from '../../../actions/cart'
import SimilarProducts from './SimilarProducts'
import { Link } from 'react-router-dom'
import Review from '../Review/review'
import SelectVehicle from '../../common/SelectVehicle'


const SelectedProduct = ({ product: { product, loading }, match, getProduct, AddProductToCart, isAuthenticated }) => {

    const [model, setModel] = useState("")

    useEffect(() => {
        getProduct(match.params.id);

    }, [match.params.id]);

    const handleModel = e => {
        setModel(e.target.value)
    };

    return (
        <Fragment>
            <div className="container">
                <div className="row selected-category">
                    <p>Shopping Home  <i className="fa fa-angle-right"></i></p>
                    <p className="ml-4">Categories  <i className="fa fa-angle-right "></i></p>
                    <p className="ml-4 text-orange">{product && product.categoryId.name} <i className="fa fa-angle-right"></i></p>
                </div>
                <hr />
                {
                    loading || !product ? '' : (
                        <Fragment>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="selected-product-img">
                                        <img src={`http://localhost:5000/${product.imageUrl}`} width="80%" height="80%" alt="Product Image" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h1 className="mt-2" >{product.title}</h1>
                                    <h5>{product.reviews.length} reviews</h5>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-4 my-5">
                                            <h2 className="mt-2">AED {product.price}</h2>
                                        </div>
                                        <div className="col-md-8 m-auto">
                                           <SelectVehicle selectedVehicle={e=>setModel(e)} />
                                        </div>
                                    </div>
                                    <hr />
                                    <p className="mt-1 ml-2">{product.description}</p>
                                    <hr />
                                    {
                                        isAuthenticated ? <Link to="/store/shopping-cart" onClick={() => AddProductToCart(model, product)} className="bg-color btn" type="button" >Add to Cart</Link> : <Link to="/login" className="bg-color btn">Login First</Link>
                                    }
                                </div>
                            </div>
                            <hr />
                            <SimilarProducts categoryId={product.categoryId} />
                            <hr />
                            <Review  selproduct={product}/>
                        </Fragment>
                    )
                }
            </div>
        </Fragment>
    )
}

SelectedProduct.propTypes = {
    getProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    AddProductToCart: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    product: state.product
})

export default connect(mapStateToProps, { getProduct, AddProductToCart })(SelectedProduct)
