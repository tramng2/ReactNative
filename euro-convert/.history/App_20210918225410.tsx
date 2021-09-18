import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <View>
      <Text>Open up App.tsx to start working on your app!</Text>

      <HomeScreen />
      <StatusBar style="auto" />
    </View>
  );
}
