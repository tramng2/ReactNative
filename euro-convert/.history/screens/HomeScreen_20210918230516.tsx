import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

function HomeScreen() {
  return (
    <View style={styles.homeScreen}>
      <Text>cucc</Text>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
          width: 200,
          height: 200,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
