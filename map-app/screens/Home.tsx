import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import {
  StyleSheet,
  TouchableHighlight,
  Text,
  Alert,
  Button,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { LocationObject } from "expo-location";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

export default function HomeScreen({ navigation }: Props) {
  const [currentLocation, setCurrentLocation] = useState<LocationObject>();
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("No permissionto get location");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
    })();
  }, []);
  return (
    <>
      <TouchableHighlight style={styles.btn}>
        <Button
          onPress={() => navigation.navigate("Search")}
          title="Search here"
          color="#cacccf"
        />
      </TouchableHighlight>
      {currentLocation ? (
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.00322,
            longitudeDelta: 0.00221,
          }}
        >
          <Marker
            coordinate={{
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            }}
            title="Current Location"
          />
        </MapView>
      ) : (
        <Text>Wait.....</Text>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#fff",
    opacity: 50,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
});
