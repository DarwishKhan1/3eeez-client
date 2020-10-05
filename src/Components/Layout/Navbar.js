import React, { Fragment } from 'react'
import Logo from '../../Assets/images/logo.PNG'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated,isServiceProvider }) => {
    //Authenticated Links
    const authLinks = (<ul className="nav navbar-nav ml-auto">
        <li className="nav-item">
            <Link className="nav-link btn" to="/">
                Home
        </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link btn ml-1"to="/aboutus">
                About Us
        </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link btn ml-1" to="/store">
                Store
        </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link btn ml-1" to="/services/feature-services">
                Services
        </Link>
        </li>
        <li className="nav-item">
            <Link className="btn btn-outline-warning mx-5" to="/store/shopping-cart">
                <i className="fa fa-shopping-cart fa-2x"></i>

            </Link>
        </li>
    </ul>
    );
    //Guest Links
    const guestLinks = (<ul className="nav navbar-nav ml-auto">
        <li className="nav-item">
            <Link className="nav-link btn" to="/">
                Home
    </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link btn ml-1" to="/aboutus">
                About Us
    </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link btn ml-1" to="/store">
                Store
    </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link btn ml-1" to="/services/feature-services">
                Services
    </Link>
        </li>
        <li className="nav-item">
            <Link className="btn btn-outline-warning mx-5" to="/login">
                Login
    </Link>
        </li>
    </ul>
    );

    //service provider

    const servicerLinks = (<ul className="nav navbar-nav ml-auto">
        <li className="nav-item">
            <Link className="nav-link btn" to="/">
                Home
</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link btn ml-1" to="/aboutus">
                About Us
</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link btn ml-1" to="/service-provider/profile">
                Dashboard
</Link>
        </li>
       
        <li className="nav-item">
            <Link className="btn btn-outline-warning mx-5" to="/logout">
                Logout
</Link>
        </li>
    </ul>
    );
    return (
        <nav className="navbar navbar-expand-md  main-navbar mb-5">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={Logo} className="rounded" width="65%" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#mobile-nav"
                >
                    <span className="navbar-toggler-icon" >
                        <i className="fa fa-navicon" style={{ color: "#fff", fontsize: "28px" }}></i>
                    </span>
                </button>

                <div className="collapse navbar-collapse" id="mobile-nav">
                    {
                        isServiceProvider ? (servicerLinks) : (isAuthenticated ? authLinks : guestLinks )
                    }
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isServiceProvider: state.auth.isServiceProvider
})

export default connect(mapStateToProps, {})(Navbar)
