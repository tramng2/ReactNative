import React from "react";
import { Text, StyleSheet } from "react-native";
import { Locations } from "../types";

function SearchList({
  item,
  onHandleClick,
}: {
  item: Locations;
  onHandleClick: (item: Locations) => void;
}) {
  return (
    <Text
      style={styles.recipeList}
      onPress={() => {
        onHandleClick(item);
      }}
    >
      <Text style={styles.titleText}>
        {item.street ? `${item.street}` : `${item.adminArea6}`}
        {"\n"}
      </Text>
      <Text style={styles.sub_titleText}>
        {item.adminArea5} {item.postalCode} {item.adminArea3}
      </Text>
    </Text>
  );
}
export default SearchList;
const styles = StyleSheet.create({
  recipeList: {
    alignItems: "flex-start",
    margin: 10,
  },
  titleText: {
    fontSize: 15,
  },
  sub_titleText: {
    color: "gray",
  },
});
