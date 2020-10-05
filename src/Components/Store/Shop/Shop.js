import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProducts } from '../../../actions/product'
import FeaturedProducts from './FeaturedProducts'
import { Link } from 'react-router-dom'
import Rating from '../Review/rating'

const Shop = ({ product: { products, loading }, getProducts }) => {
    const page =1;
    useEffect(() => {
        const variables= {
            page: page
        }
        getProducts(variables);
    }, [])

    const getRating = reviews => {

        let totalRating = 0;
        let totalprdrating = 0;

        reviews && reviews.map((rat, i) => {
            totalprdrating = i + 1;
            return totalRating = totalRating + rat.rating;
        });

        if ((totalRating / totalprdrating).toString() === "NaN") {
            return 0;
        } else {
            return (totalRating / totalprdrating);
        }
    }

    return (
        <Fragment>

            <FeaturedProducts products={products} />

            <div className="container">
                <hr />
                <div className="row">
                    {                        
                        loading || !products ? "" : products.map(prd => {
                            return (
                                <Link key={prd._id} to={`/store/selected-product/${prd._id}`} className="col-md-3 col-sm-12 text-center link">
                                   <div className="card">
                                    <img className="mx-auto mb-1" src={`http://localhost:5000/${prd.imageUrl}`} width="100%" height="150px" alt="" />
                                    <h6 className="m-0">{prd.title}</h6>
                                    <Rating productRating={getRating(prd.reviews)} />
                                    <p>AED {prd.price}</p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>

                <div className="row">
                    <Link to={`/store/products`}>More Products</Link>
                </div>
            </div>

        </Fragment>
    )
}

Shop.propTypes = {
    getProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    product: state.product
})

export default connect(mapStateToProps, { getProducts })(Shop)