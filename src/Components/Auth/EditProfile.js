import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getProfile,editProfile } from '../../actions/auth'

const EditProfile = ({ auth: { loading, profile }, history, editProfile }) => {
    const [formData, setFormData] = useState({
        image: ''
    });

    useEffect(() => {
        setFormData({
            image : profile ? profile.profileImage : ''
        })
    }, [])

    const { image } = formData;

    const fileHandler = e => setFormData({ image: e.target.files[0] });


    const onsubmit = async e => {
        e.preventDefault();
        
        editProfile(image, history);
    }
    return (
        profile !== null && <div className="container mb-4">
            <h2>Edit Profile</h2>
            {
            console.log(profile)
            }
            <form onSubmit={e => onsubmit(e)}>
                <div className="form-group">
                    <input type="file" onChange={e => fileHandler(e)} className="form-control bg-light" />
                </div>
                <input type="submit" className="btn bg-color px-5" value="Update Profile" />
            </form>
        </div>
    )
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { getProfile, editProfile })(withRouter(EditProfile))
