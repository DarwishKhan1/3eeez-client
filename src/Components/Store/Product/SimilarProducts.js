import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProductByCategory } from '../../../actions/product'
import { Link } from 'react-router-dom'
import Rating from '../Review/rating'

const SimilarProducts = ({ product: { similarProducts, loading }, categoryId, getProductByCategory }) => {
    useEffect(() => {
        getProductByCategory(categoryId._id);
    }, [categoryId])

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

    return loading || !similarProducts ? '' : (
        <Fragment>
            <div className="row">
                <h2 className="my-4 mx-auto">Similar Products</h2>
                <div className="container">
                    <div className="row">
                        {
                            similarProducts.map(prd => (
                                <Fragment key={prd._id}>
                                    <Link className="col-md-4 link" to={`/store/selected-product/${prd._id}`}>
                                        <img src={`http://localhost:5000/${prd.imageUrl}`} width="50%" height="50%" alt="Product Image" />
                                        <h5>{prd.title}</h5>
                                        <Rating productRating={getRating(prd.reviews)} />
                                        <h6>AED {prd.price}</h6>
                                    </Link>
                                </Fragment>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

SimilarProducts.propTypes = {
    getProductByCategory: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    categoryId: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    product: state.product
})

export default connect(mapStateToProps, { getProductByCategory })(SimilarProducts)
