import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";

function HomeScreen() {
  const [euro, setEuro] = useState<Number>(0);
  const [euros, setEuros] = useState<any>(0);
  const handleConvert = async () => {
    const response = await fetch(
      "http://api.exchangeratesapi.io/latest?access_key=26c396297bee8c2e39fc2798a0b843fe"
    );
    const res = await response.json();
    setEuros(res);
  };
  console.log("s", euros);
  return (
    <View style={styles.homeScreen}>
      <View style={styles.homeScreen_result}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            width: 200,
            height: 200,
          }}
        />
        <Text>{euro}€ </Text>
      </View>
      <View style={styles.button}>
        <Button title="CONVERT" onPress={() => handleConvert()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    backgroundColor: "red",
  },
  homeScreen_result: {
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 50,
  },
  button: {},
});

export default HomeScreen;
