import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GoogleMap from './Map';
import { getProfile, removeService } from '../../actions/auth';
import ProfileActions from './ProfileActions'
import Spinner from '../common/Spinner'
import { Table, Tbody, Thead, Tr, Td, Th } from 'react-responsive-list'
import 'react-responsive-list/assets/index.css'

const Profile = ({ auth: { loading, profile, profileServices, user }, getProfile, removeService, history, google }) => {

    useEffect(() => {
        getProfile();
    }, []);

    const style = {
        width: '100%',
        height: '500px'
    }

    return (
        profile === null && loading ? <Spinner /> : <Fragment>
            <div className="container">
                <h1 className="text-orange">Dashboard</h1>
                <p className="lead">
                    <i className="fa fa-user" /> Welcome {user && user.name}
                </p>

                {profile !== null ? <Fragment>
                    <ProfileActions />

                    {/* Dispalay Location */}
                    <div className="container">
                        <h4 className="text-center text-orange">Location</h4>
                        <div style={style} className="mb-2">
                            <GoogleMap latitude={profile.location.lat} longitude={profile.location.lang} />
                        </div>    
                        <h5>{profile.location.address}</h5>
                    </div>

                    {/* Dispalay Services */}
                    <div className="container my-5">
                        <h4 className="text-center text-orange">Services</h4>
                        <Table breakPoint={768}>
                            <Thead>
                                <Tr>
                                    <Th>Image</Th>
                                    <Th>Name</Th>
                                    <Th>Description</Th>
                                    <Th>Price</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    profileServices && profileServices.map((service, index) => {


                                        const { _id, value, description, imageUrl, price } = service.serviceId;//destructuring

                                        return (
                                            <Tr key={index}>
                                                <Td>
                                                    <img src={`http://localhost:5000/${imageUrl}`} width="50" height="30" alt={value} />
                                                </Td>
                                                <Td>{value}</Td>
                                                <Td>{description}</Td>
                                                <Td>{price}</Td>
                                                <Td>
                                                    <button onClick={() => removeService(_id, service._id, history)} className="btn bg-color px-3">Delete</button>
                                                </Td>
                                            </Tr>
                                        )
                                    })
                                }
                            </Tbody>
                        </Table>
                    </div>

                </Fragment> : <Fragment>
                    <p>You have not yet setup a profile, please add some info </p>
                    <Link to="/service-provider/create-profile" className="btn bg-color px-5 mb-2">Create Profile</Link>
                </Fragment>}
            </div>
        </Fragment>
    )
}

Profile.propTypes = {
    getProfile: PropTypes.func.isRequired,
    removeService: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { getProfile, removeService })(withRouter(Profile))
