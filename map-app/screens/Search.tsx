import { API_KEY } from "@env";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Locations, RootStackParamList } from "../types";
import SearchList from "./SearchList";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Map">;
};
function Search({ navigation }: Props) {
  const [input, setInput] = useState<string>("");
  const [locations, setLocations] = useState<Locations[]>([]);

  const handleClick = async () => {
    const response = await fetch(
      `http://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY}&location=${input.replace(
        /\s+/g,
        ""
      )}`
    );
    const { results } = await response.json();
    let { locations } = results[0];
    locations = locations.filter((el: any) => el.adminArea1 == "FI");
    if (locations.length) {
      setLocations(locations);
    } else {
      setLocations([{ street: "Can't find that place" }]);
    }
  };

  const handleOnpress = (item: Locations): void => {
    setInput("");
    setLocations([]);
    navigation.navigate("Map", {
      location: item,
    });
  };
  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setInput(text)}
          value={input}
          placeholder="Search here..."
          maxLength={1000}
          onSubmitEditing={() => handleClick()}
        />
      </View>
      <View style={styles.resultList}>
        {locations.map((item, index) => (
          <SearchList
            item={item}
            key={index}
            onHandleClick={() => handleOnpress(item)}
          />
        ))}
      </View>
    </>
  );
}

export default Search;
const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "flex-end",
    backgroundColor: "white",
  },
  input: {
    height: 50,
    marginTop: 65,
    margin: 20,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#b6b8b6",
    padding: 15,
  },
  resultList: {
    alignItems: "flex-start",
    paddingLeft: 30,
  },
});
