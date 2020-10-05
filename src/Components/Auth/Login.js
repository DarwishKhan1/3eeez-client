import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Logo from '../../Assets/images/logo.PNG'
import { Link, Redirect,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import Alert from '../Alert/alert';


const Login = ({ isAuthenticated, login, isServiceProvider, history }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onchange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onsubmit = async e => {
        e.preventDefault();

        login({ email, password,history });
    }

    if(isServiceProvider){
        return <Redirect to="/" />
    }

    if (isAuthenticated) {
        return <Redirect to="/store" />
    }


    return (
        <Fragment>
            <section className="mb-3">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="login">
                            <h4 className="d-flex justify-content-center">3eeez Automotive Store & Portal</h4>
                            <img className="mx-auto d-block" src={Logo} width="100" height="60" />
                            <label className="d-flex justify-content-center text-muted">Sign In User</label>
                            <div>
                                <Alert />
                            </div>
                            <form onSubmit={e => onsubmit(e)}>
                                <div className="form-group">
                                    <input type="email" name="email" value={email} onChange={e => onchange(e)} className="form-control bg-light" placeholder="Email" />
                                </div>

                                <div className="form-group">
                                    <input value={password} name="password" onChange={e => onchange(e)} className="form-control bg-light" type="password" placeholder="Password" />
                                </div>

                                <input type="submit" className="btn bg-color mx-auto d-block px-5" value="Login" />
                                <label className="d-flex justify-content-center my-2 text-muted">Don't have an account?</label>
                                <Link to="/register" className="d-flex justify-content-center h6 text-muted">Sign Up User</Link>
                                <Link to="/service-provider-register" className="h6 d-flex justify-content-center text-muted">Sign Up Service Provider</Link>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isServiceProvider: state.auth.isServiceProvider
})


export default connect(mapStateToProps, { login })(withRouter(Login));
