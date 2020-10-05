import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { addLocation } from '../../actions/auth'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


const AddLocation = ({ addLocation, history }) => {

    const [Address, setAddress] = useState("");

    const handleChange = address => {
        setAddress(address);
    };

    const getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    };

    const getCountry = (addressArray) => {
        let country = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'country' === addressArray[i].types[0]) {
                    country = addressArray[i].long_name;
                    return country;
                }
            }
        }
    };

    const handleSelect = async address => {

        const results = await geocodeByAddress(address);

        const latlng = await getLatLng(results[0]);

        const formatted_address = await results[0].formatted_address;

        const city = await getCity(results[0].address_components)

        const country = await getCountry(results[0].address_components)

        const location = {
            location: {
                lat: latlng.lat,
                lang: latlng.lng,
                country: country,
                city: city,
                address: formatted_address
            }
        }

        addLocation(location, history)
    };

    return (
        <div className="container mb-5">
            <h1>Add Location</h1>
            <PlacesAutocomplete
                value={Address}
                onChange={handleChange}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input className="form-control"
                            {...getInputProps({
                                placeholder: 'Search Places ...'
                            })}
                        />
                        <div>
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                // inline style
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </div>
    )
}

AddLocation.propTypes = {
    addLocation: PropTypes.func.isRequired,
}

export default connect(null, { addLocation })(withRouter(AddLocation))