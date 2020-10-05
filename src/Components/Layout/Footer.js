import React, { Fragment } from 'react'
import BorderLogo from '../../Assets/images/logo2.PNG'

const Footer = props => {
    return (
        <Fragment>
            <footer className="page-footer footer">
                <div className="bg-color">
                    <div className="container">
                        <div className="row d-flex align-items-center py-2">
                            <div className="col-md-6 col-lg-7 text-center text-md-left">
                                <h4>Get connected with us on social networks!</h4>
                            </div>
                            <div className="col-md-6 col-lg-5 text-center text-md-right">
                                <a className="fb-ic">
                                    <i className="fa fa-facebook-f fa-lg social-icon"> </i>
                                </a>
                                <a className="tw-ic">
                                    <i className="fa fa-twitter fa-lg social-icon"> </i>
                                </a>

                                <a className="ins-ic">
                                    <i className="fa fa-instagram fa-lg social-icon "> </i>
                                </a>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="container text-center text-md-left mt-3">

                    <div className="row top-margin">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto ">
                            <h6 className="text-uppercase main-heading">3eez Automative Studio</h6>
                            <hr/>
                            <img src={BorderLogo} alt="" />
                            <p className="text-orange">TwoFour54, Office 123, </p>
                            <p className="text-orange">Abu Dhabi - UAE </p>
                        </div>
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto ">

                            <h6 className="text-uppercase main-heading">MAIN MANU</h6>
                            <hr />
                            <p>
                                <a href="#">Home</a>
                            </p>
                            <p>
                                <a href="#">About</a>
                            </p>
                            <p>
                                <a href="#">Shop</a>
                            </p>
                            <p>
                                <a href="#">Services</a>
                            </p>
                            <p>
                                <a href="#">FAQs </a>
                            </p>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto ">
                            <h6  className="text-uppercase main-heading">COMPANY</h6>
                            <hr />
                            <p>
                                <a href="#!">The Company</a>
                            </p>
                            <p>
                                <a href="#!">Careers</a>
                            </p>

                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto">

                            <h6  className="text-uppercase main-heading">DISCOVERY</h6>
                            <hr />
                            <p>
                                <a href="#" >The Team</a>
                            </p>
                            <p>
                                <a href="#" >Our Hiatory</a>
                            </p>
                            <p>
                                <a href="#" >Brand Motto</a>
                            </p>

                        </div>

                    </div>
                </div>
                <hr />
                
                <div className="footer-copyright text-center pb-4 text-orange">
                    © 2020 Copyright: 3eez Automative studio
               </div>
            </footer>
        </Fragment>
    )
}

export default Footer
