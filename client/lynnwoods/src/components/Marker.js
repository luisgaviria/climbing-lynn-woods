import { InfoWindow, Marker } from "react-google-maps";

import React from "react";

class CustomMarker extends React.Component {
  render() {
    const { info } = this.props;
    console.log(info);
    return (
      <Marker
        key={info.name}
        position={{
          lat: info.latitude,
          lng: info.longitude,
        }}
      />
    );
  }
}

export default CustomMarker;
