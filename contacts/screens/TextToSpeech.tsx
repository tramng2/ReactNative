import React, { useState } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import * as Speech from "expo-speech";
import { TextInput } from "react-native-gesture-handler";

export default function TextToSpeech() {
  const [text, setText] = useState("");

  const speak = () => {
    Speech.speak(text);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setText(text)}
        value={text}
        multiline={true}
        numberOfLines={3}
      />
      <Button title="Start listening" onPress={speak} />
      <Button title="Clear input" onPress={() => setText("")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  textInput: {
    height: 150,
    borderColor: "gray",
    borderWidth: 1,
    margin: 30,
    padding: 10,
  },
});
