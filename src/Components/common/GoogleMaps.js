import React from "react";
import PropTypes from "prop-types";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
let markers;
let pickUpLocation;

const getCoordinates = e => {
  pickUpLocation=e;
}

function map() {
  return (
    <GoogleMap defaultZoom={5} defaultCenter={{ lat: 30.3753, lng: 69.34 }} onClick={e => getCoordinates(e)}>
      {markers.length > 0 &&
        markers.map((marker, index) => {
          return (
            <Marker
              key={index}
              position={{
                lat: parseFloat(marker.location.lat),
                lng: parseFloat(marker.location.lang),
              }}
            />
          );
        })}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(map));

const GoogleMaps = ({ markersArray, coordinates }) => {
  coordinates=pickUpLocation;
  markers = markersArray;
  return (
    <div className="mt-1 mb-4 mx-auto">
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBxZzD-KekhDCYnlZEeLu2_GVhQZMY1ASI&libraries=places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `350px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

GoogleMaps.propTypes = {};

export default GoogleMaps;
