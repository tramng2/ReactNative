import { API_KEY } from "@env";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Map from "./screens/Map";
import { Locations } from "./types";

export default function App() {
  const [input, setInput] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [locations, setLocations] = useState<Locations[]>([]);
  const handleClick = async () => {
    const response = await fetch(
      `http://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY}&location=${input}`
    );
    const { results } = await response.json();
    const { locations } = results[0];
    setLocations(locations);
  };
  return (
    <View style={styles.container}>
      <Map />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setInput(text)}
          value={input}
          placeholder="Search here"
          maxLength={1000}
          onSubmitEditing={() => handleClick()}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    justifyContent: "flex-end",
    backgroundColor: "white",
  },
  input: {
    height: 50,
    marginTop: 65,
    margin: 20,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#b6b8b6",
    padding: 15,
  },
  btn: {
    alignSelf: "center",
  },
});
