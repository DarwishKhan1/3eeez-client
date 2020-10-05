import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";
import GoogleMap from '../Auth/Map'
Geocode.setApiKey("AIzaSyBxZzD-KekhDCYnlZEeLu2_GVhQZMY1ASI");
Geocode.enableDebug();

const style = {
    width: '100%',
    height: '500px'
}

const ShowLocation = ({ match }) => {
  const latitude = match.params.lat;
  const longitude = match.params.lng;

  const [addres, setAddress] = useState(null);

  useEffect(() => {
    Geocode.fromLatLng("" + latitude, "" + longitude).then(
      (response) => {
        const userAddress = response.results[0].formatted_address;
        setAddress(userAddress);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  return (
    <div className="container">
      <h4 className="text-center text-orange">Location</h4>
      <div style={style} className="mb-2">
        <GoogleMap
          latitude={latitude}
          longitude={longitude}
          showMarker={true}
        />
      </div>
      <h5 className="my-5 text-center">{addres}</h5>
    </div>
  );
};

export default ShowLocation;
