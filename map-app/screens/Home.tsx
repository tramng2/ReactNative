import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Button,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import MapScreen from "./MapScreen";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <>
      <TouchableHighlight style={styles.btn}>
        <Button
          onPress={() => navigation.navigate("Search")}
          title="Search here"
          color="#cacccf"
        />
      </TouchableHighlight>
      <MapScreen />
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
