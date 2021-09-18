import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Recipes, Thumbnail } from "../types";
import { StatusBar } from "expo-status-bar";
import RecipeList from "./RecipeList";

export default function RecipeScreen() {
  const [input, setInput] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipes[]>([]);

  const findRecipe = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`
    );
    const { meals } = await response.json();
    setRecipes(meals);
  };
  const handleFind = () => {
    findRecipe();
    setInput("");
  };
  const renderRecipeList = () => {};
  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={input}
          onChangeText={(input) => setInput(input)}
          placeholder="Type your ingredients"
          onSubmitEditing={() => findRecipe()}
        />
        <Button
          title="Find"
          onPress={() => handleFind()}
          disabled={input ? false : true}
        />
      </View>
      <View style={styles.resultList}>
        {recipes ? (
          <FlatList
            data={recipes}
            renderItem={({ item }) => (
              <RecipeList item={item} styles={styles} />
            )}
            keyExtractor={(item) => item.idMeal}
          />
        ) : (
          <Text>No result</Text>
        )}
      </View>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
  },
  btn: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  textInput: {
    width: 200,
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
    margin: 15,
  },
  resultList: {
    alignItems: "center",
  },
});
