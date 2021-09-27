import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
  route: StackNavigationProp<RootStackParamList, "Map">;
};
function MapScreen({ route }: any) {
  const [latitude, setLatitude] = useState<number>(60.200692);
  const [longitude, setLongitude] = useState<number>(24.934302);
  const [marker, setMarker] = useState<string>("Haaga-Helia");
  useEffect(() => {
    if (route) {
      const { location } = route.params;
      setLatitude(location.displayLatLng.lat);
      setLongitude(location.displayLatLng.lng);
      setMarker(location.street);
    }
  }, [route]);
  return (
    <MapView
      style={{ flex: 1 }}
      region={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
      }}
    >
      <Marker
        coordinate={{ latitude: latitude, longitude: longitude }}
        title={marker}
      />
    </MapView>
  );
}

export default MapScreen;
