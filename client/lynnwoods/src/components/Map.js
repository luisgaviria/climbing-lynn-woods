import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import { url } from "../url";

import { useHistory } from "react-router-dom";

import axios from "axios";

import icon from "../images/climbing.svg";

const mapContainerStyle = {
  width: "100vw",
  height: "60vh",
};

const libraries = ["places"];

const center = {
  lat: 42.4832054,
  lng: -70.9828326,
};

export default function Map() {
  const history = useHistory();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBIa95EK04YAEKm3rg3QN0nbxmRpTRIwk4",
    libraries,
  });

  const [markers, setMarkers] = React.useState([]);
  const [myPosition, setMyPosition] = React.useState(null);
  const [selected, setSelected] = React.useState(null);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(async (map) => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMyPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      console.log("Latitude is: ", position.coords.latitude);
      console.log("Longitude is: ", position.coords.longitude);
    });
    const response = await axios.get(url + "/boulders", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    setMarkers(response.data.boulders);
    mapRef.current = map;
    console.log(response.data.boulders);
  }, []);
  const onClickRoute = React.useCallback((route) => {
    history.push(`/path/${route}`);
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(10);
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className="map">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        onLoad={onMapLoad}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

        <Marker key={"position"} position={myPosition} icon={icon} />

        {selected ? (
          <InfoWindow
            position={{ lat: selected.latitude, lng: selected.longitude }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>{selected.Boulder}</h2>
              {selected.routes.map((route) => {
                return (
                  <p
                    onClick={() => onClickRoute(route)}
                    style={{ cursor: "pointer" }}
                  >
                    {route}
                  </p>
                );
              })}
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}
