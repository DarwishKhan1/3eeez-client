import React, { useState } from 'react'
import PropTypes from 'prop-types'

const SearchFilter = ({ handleSearch }) => {

    const handleChange = e => {
        e.preventDefault();

        handleSearch(e.target.value);
    }
    return (
        <div className="col-md-6 d-flex flex-row-reverse">
            <form>
                <div className="form-group has-search">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input type="text" className="form-control" placeholder="Search" onChange={e => handleChange(e)} />
                </div>
            </form>
        </div>
    )
}

SearchFilter.propTypes = {
    handleSearch: PropTypes.func.isRequired,
}

export default SearchFilter
