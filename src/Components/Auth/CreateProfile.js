import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { createProfile } from "../../actions/auth";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const CreateProfile = ({ createProfile, auth: {user}, history }) => {


    const [formData, setFormData] = useState({
        image: ''
    });

    const fileHandler = e => setFormData({ ...formData, image: e.target.files[0] });

    const { image } = formData;

    const onsubmit = async e => {
        e.preventDefault();

        createProfile(image,user.name, history);
    }

    return (
        <div className="container">
            <h3 className="text-orange">Upload Image</h3>
            <form onSubmit={e => onsubmit(e)} className="my-3">
                <div className="form-group">
                    <input type="file" onChange={e => fileHandler(e)} className="form-control bg-light" required />
                </div>

                <input type="submit" className="btn bg-color px-5" value="Create Profile" />
            </form>
        </div>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
  });

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile))
