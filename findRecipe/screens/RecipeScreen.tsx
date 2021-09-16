import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Recipes } from "../types";
import { StatusBar } from "expo-status-bar";

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
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View>
          <Text>Recipe Finder</Text>
          <TextInput
            style={styles.textInput}
            value={input}
            onChangeText={(input) => setInput(input)}
            placeholder="Descreptions"
          />
          <Button
            title="Start to find recipes"
            onPress={() => handleFind()}
            disabled={input ? false : true}
          />
        </View>
        <View style={styles.resultList}>
          {recipes ? (
            <FlatList
              data={recipes}
              renderItem={({ item }) => <Text>{item.strMeal}</Text>}
              keyExtractor={(item) => item.idMeal}
            />
          ) : (
            <Text>No result</Text>
          )}
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  textInput: {
    width: 200,
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
    margin: 5,
  },
  resultList: {},
});
