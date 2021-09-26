import React from "react";
import MapView, { Marker } from "react-native-maps";
function Map() {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
      }}
    >
      <Marker
        coordinate={{ latitude: 60.201373, longitude: 24.934041 }}
        title="Haaga-Helia"
      />
    </MapView>
  );
}

export default Map;