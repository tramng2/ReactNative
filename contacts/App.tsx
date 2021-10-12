import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

import ContactScreen from "./screens/Contacts";
import TextToSpeech from "./screens/TextToSpeech";
import { RootStackParamList } from "./types";
import HomeScreen from "./screens/Home";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Contacts" component={ContactScreen} />
        <Stack.Screen name="TextToSpeech" component={TextToSpeech} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
