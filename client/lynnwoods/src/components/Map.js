import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  InfoWindow,
  Marker,
} from "react-google-maps";
import React from "react";
import { compose, withProps, withStateHandlers } from "recompose";
import axios from "axios";
import { url } from "../url";

const Map = compose(
  withStateHandlers(
    () => ({
      isOpen: {},
    }),
    {
      onToggleOpen:
        ({ isOpen }) =>
        (index) => ({
          isOpen: {
            ...isOpen,
            [index]: isOpen[index] == undefined ? true : !isOpen[index],
          },
        }),
    }
  ),
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
  // const mapRef = React.useRef();

  // const onMapLoad = React.useCallback((map) => {
  //   mapRef.current = map;
  // }, []);

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  return (
    <GoogleMap
      options={options}
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
              console.log(boulder);
              props.onToggleOpen(index);
              // setSelected(boulder);
              // setSelected(boulder);
            }}
          >
            {props.isOpen[index] === true ? (
              <InfoWindow onCloseClick={() => props.onToggleOpen(index)}>
                <h1>{props.boulders[index].Boulder}</h1>
              </InfoWindow>
            ) : null}
          </Marker>
        );
      })}
      {/* {selected ? (
        <InfoWindow
          position={{ lat: selected.latitude, lng: selected.longitude }}
          onCloseClick={() => {
            console.log(selected);
            setSelected(null);
          }}
        >
          <div>{selected.route}</div>
        </InfoWindow>
      ) : null} */}
    </GoogleMap>
  );
});

class MyFancyComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      boulders: [],
      // info: null,
      isOpen: {},
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

  // onCloseInfoWindow = () => {
  //   this.setState({ ...this.state, info: null });
  // };

  render() {
    return (
      <Map
        isMarkerShown
        boulders={this.state.boulders}
        onClickMarker={this.onClickMarker}
        onCloseInfoWindow={this.onCloseInfoWindow}
        info={this.state.info}
      />
    );
  }
}

export default MyFancyComponent;
