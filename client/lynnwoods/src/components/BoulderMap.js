import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import React from "react";
import { compose, withProps } from "recompose";

const BoulderMap = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIa95EK04YAEKm3rg3QN0nbxmRpTRIwk4",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `480px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  return (
    <GoogleMap
      defaultZoom={18}
      onClick={props.changeBoulder}
      center={{
        lat: props.boulder.latitude,
        lng: props.boulder.longitude,
      }}
      defaultCenter={{
        lat: 42.361145,
        lng: -72.057083,
      }}
    >
      <Marker
        position={{
          lat: props.boulder.latitude,
          lng: props.boulder.longitude,
        }}
      />
      {/* {props.isMarkerShown && (
        <Marker
          position={{ lat: -34.397, lng: 150.644 }}
          onClick={props.onMarkerClick}
        />
      )} */}
    </GoogleMap>
  );
});

class MyFancyComponent extends React.PureComponent {
  render() {
    console.log(this.props.boulder);
    return (
      <BoulderMap
        boulder={this.props.boulder}
        changeBoulder={this.props.changeBoulder}
      />
    );
  }
}

export default MyFancyComponent;
