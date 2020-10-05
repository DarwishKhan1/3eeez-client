import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import MultiSelect from "react-multi-select-component";
import { getServices,addServices } from '../../actions/auth'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


const AddServices = ({ auth: { loading, services }, getServices, history,addServices }) => {
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        getServices();
    }, []);


    const updatedArray = () => {
        //format data according to the structure of db model
      const array=  selected.length > 0 && selected.map(sr => {
            return {
                serviceId: sr._id,
                serviceName: sr.value
            }
        })
        return {services: array};
    }


    return (services && <div className="container mb-4">
        <h1>Select Services</h1>
       
        <MultiSelect
            options={services}
            value={selected}
            onChange={setSelected}
            labelledBy={"Select"}
        />
       
        <button className="btn bg-color px-5 my-2" onClick={() => addServices(updatedArray(),history)}>Add Services</button>
    </div>
    )
}

AddServices.propTypes = {
    addServices: PropTypes.func.isRequired,
    getServices: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { getServices, addServices })(withRouter(AddServices))
