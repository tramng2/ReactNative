import React from "react";
import { View, Text, StyleSheet, TextInput, Button, Image } from "react-native";

function RecipeList({ item }: any) {
  return (
    <View style={styles.recipeList}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: item.strMealThumb,
        }}
      />
      <Text style={styles.foodName}>{item.strMeal}</Text>
    </View>
  );
}

export default RecipeList;

const styles = StyleSheet.create({
  recipeList: {
    flexDirection: "row",
    padding: 10,
  },
  tinyLogo: {
    width: 60,
    height: 60,
    borderRadius: 100,
    margin: 5,
  },
  foodName: {
    marginLeft: 10,
    alignSelf: "center",
    fontSize: 20,
  },
});
