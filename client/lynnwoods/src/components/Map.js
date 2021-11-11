import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import React from "react";
import { compose, withProps } from "recompose";
import axios from "axios";
import { url } from "../url";

const Map = compose(
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
      defaultZoom={15}
      defaultCenter={{
        lat: 42.47754,
        lng: -70.989036,
      }}
    >
      {props.boulders?.map((boulder, index) => {
        return (
          <Marker
            key={index}
            position={{
              lat: boulder.latitude,
              lng: boulder.longitude,
            }}
            onClick={() => {
              props.onClickMarker(boulder);
            }}
          />
        );
      })}
      {props.info ? (
        <InfoWindow
          position={{
            lat: props.info.latitude,
            lng: props.info.longitude,
          }}
        >
          <div>
            <img
              style={{ width: "200px", height: "150px" }}
              src={props.info.photos[0]}
            />
            <h4>
              {props.info.route} {props.info.rating} Stars:{" "}
              {props.info.avgStars}
            </h4>

            <h4>{props.info.location}</h4>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
});

class MyFancyComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      boulders: [],
      info: null,
    };
  }

  async componentDidMount() {
    const response = await axios.get(url + "/boulders", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    this.setState({ boulders: response.data.boulders });
  }

  onClickMarker = (boulder) => {
    this.setState({ ...this.state, info: boulder });
  };

  onCloseInfoWindow = () => {
    this.setState({ ...this.state, info: null });
  };

  render() {
    return (
      <Map
        boulders={this.state.boulders}
        onClickMarker={this.onClickMarker}
        onCloseInfoWindow={this.onCloseInfoWindow}
        info={this.state.info}
      />
    );
  }
}

export default MyFancyComponent;
