import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {getServices} from '../../../actions/auth'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'


const ShowCase = ({ getServices, auth: {loading, services} }) => {

    useEffect(()=> {
        getServices();
    },[])

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
        <div>
            <div className="text-center">
                <h3>Automotive Services at your Fingertips</h3>
                {                 
                    services && <Slider {...settings} >
                        {services.map(service => {
                            return (
                                <Link key={service._id} to={`/services/services-store`} className="link">
                                    <img src={`http://localhost:5000/${service.imageUrl}`} className="mx-auto" width="350px" height="200px" />
                                    <p className="mx-auto">{service.value}</p>
                                </Link>
                            )
                        })}
                    </Slider>
                }
            </div>
        </div>
    )
}

ShowCase.propTypes = {
    getServices: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps,{ getServices})(ShowCase)