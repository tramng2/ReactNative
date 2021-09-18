import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

function HomeScreen() {
  return (
    <View style={styles.homeScreen}>
      <Text>cucc</Text>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1602503497646-97650e4a7a44?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=632&q=80",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cohomeScreenntainer: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
