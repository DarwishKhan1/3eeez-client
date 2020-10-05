import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Logo from '../../Assets/images/logo.PNG'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import Alert from '../Alert/alert';


const ServiceProviderRegister = ({ isAuthenticated, setAlert, register }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        isServiceProvider: true
    });

    const { name, email, password, password2, isServiceProvider } = formData;

    const onchange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onsubmit = async e => {
        e.preventDefault();

        if (password !== password2) {
            setAlert("Password do not match", "danger");
        } else {
            register({ name, email, password, isServiceProvider });
        }
    }

    if (isAuthenticated) {
        return <Redirect to="/store" />
    }


    return (
        <Fragment>
            <section className="mb-5">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="login">
                            <div className="mx-auto">
                                <h4 className="d-flex justify-content-center">3eeez Automotive Studios</h4>
                                <img className="mx-auto d-block" src={Logo} width="100" height="60" />
                                <label className="d-flex justify-content-center text-muted">Sign Up Service Provider</label>
                            </div>
                            <Alert />
                            <form onSubmit={e => onsubmit(e)}>
                                <div className="form-group">
                                    <input type="text" name='name' value={name} onChange={e => onchange(e)} className="form-control bg-light" placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <input type="email" name="email" value={email} onChange={e => onchange(e)} className="form-control bg-light" placeholder="Email" />
                                </div>

                                <div className="form-group">
                                    <input value={password} name="password" onChange={e => onchange(e)} className="form-control bg-light" type="password" placeholder="Password" />
                                </div>

                                <div className="form-group">
                                    <input value={password2} name="password2" onChange={e => onchange(e)} className="form-control bg-light" type="password" placeholder="Confirm Password" />
                                </div>

                                <input type="submit" className="btn bg-color mx-auto d-block px-5" value="Register" />

                                <label className="d-flex justify-content-center my-2 text-muted">Already have an account?</label>
                                <Link to="/login" className="signup">Sign In</Link>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

ServiceProviderRegister.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, { setAlert, register })(ServiceProviderRegister);
