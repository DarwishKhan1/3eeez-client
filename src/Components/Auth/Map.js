import React from "react";
import PropTypes from "prop-types";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const GoogleMap = (props) => {
  function mapClicked(mapProps, map, coord) {
    const { latLng } = coord;

    const lat = latLng.lat();
    const lng = latLng.lng();

    props.handleCoordinates({ lat, lng });
  }

  const style = {
    width: "80%",
    height: "80%",
  };
  return (
    <div>
      <Map
        google={props.google}
        zoom={8}
        style={style}
        onClick={mapClicked}
        initialCenter={{
          lat: props.latitude,
          lng: props.longitude,
        }}
      >
        {props.showMarker && <Marker position={{ lat: props.latitude, lng:  props.longitude }} /> }
      </Map>
    </div>
  );
};

GoogleMap.propTypes = {};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBxZzD-KekhDCYnlZEeLu2_GVhQZMY1ASI",
})(GoogleMap);
