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
      <Text style={styles.txt}>Welcome to Recipe Finder</Text>
      <Button
        title="Start to find recipes"
        onPress={() => navigation.navigate("Recipe", { operation: [] })}
      />
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  txt: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 50,
  },
});
