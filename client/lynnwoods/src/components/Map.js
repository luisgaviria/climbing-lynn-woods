import React, { useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import MapStyle from "./MapStyle";

import { url } from "../url"; // NEED TO ADD URLS TO THE AXIOS ROUTE THROUGH DEVELOPMENT

import { useHistory } from "react-router-dom";

import axios from "axios";

const mapContainerStyle = {
  width: "100vw",
  height: "60vh",
};

const libraries = ["places"];

const center = {
  lat: 42.493851,
  lng: -70.995081,
};

export default function Map() {
  const history = useHistory();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBIa95EK04YAEKm3rg3QN0nbxmRpTRIwk4",
    libraries,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position)
        setMyPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }, 2000); // every two seconds
    return () => clearInterval(interval);
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
    const response = await axios.get("/boulders", {
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
        zoom={13.9}
        center={center}
        onLoad={onMapLoad}
        options={{
          styles: MapStyle,
        }}
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

        {myPosition?.lat ? (
          <Marker
            key={"position"}
            position={myPosition}
            icon={{
              url: "https://img.icons8.com/emoji/48/000000/blue-circle-emoji.png",
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
          />
        ) : null}

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
