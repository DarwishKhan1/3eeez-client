import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'


const FeaturedProducts = ({ products }) => {

    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        autoplay: true,
        arrows: true,
        slidesToScroll: 1,
        className: "slides"
    };

    return (
        <div className="text-center">
            <h3>Featured Products</h3>
            {
                products && <Slider {...settings} >
                    {products.map(product => {
                        
                        return (
                            <Link key={product._id} to={`/store/selected-product/${product._id}`} className="link">
                                <img src={`http://localhost:5000/${product.imageUrl}`} className="mx-auto" width="450px" height="200px"/>
                                <p className="mx-auto">{product.title}</p>
                            </Link>
                        )
                    })}
                </Slider>
            }
        </div>
    )
}

FeaturedProducts.propTypes = {
    products: PropTypes.array.isRequired,
}

export default FeaturedProducts
