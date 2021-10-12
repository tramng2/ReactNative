import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Choose one</Text>
      <Button
        title="Get contact application"
        onPress={() => navigation.navigate("Contacts", { operation: [] })}
      />
      <Button
        title="Text to speech application"
        onPress={() => navigation.navigate("TextToSpeech")}
      />
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
  },
  txt: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 50,
  },
});
