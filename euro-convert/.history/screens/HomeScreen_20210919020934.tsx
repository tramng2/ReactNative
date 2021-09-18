import { Picker } from "@react-native-community/picker";
import { ItemValue } from "@react-native-community/picker/typings/Picker";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Button, TextInput } from "react-native";
import { CurrencyData } from "../types";

function HomeScreen() {
  //   const [currency, setCurrency] = useState<CurrencyData>();
  const [currencyList, setCurrencyList] = useState<CurrencyData>({});
  const [selectedCurrency, setSelectedCurrency] = useState<ItemValue>("");
  const [input, setInput] = useState<string>("");
  const [euroConverted, setEuroCoverted] = useState<Number>(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://api.exchangeratesapi.io/latest?access_key=26c396297bee8c2e39fc2798a0b843fe"
      );
      const { rates } = await response.json();
      setCurrencyList(rates);
    }
    fetchData();
  }, []);

  const handleConvert = async () => {
    const euroAmount = Number(input) * Number(selectedCurrency);
    setEuroCoverted(euroAmount);
  };
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
        <Text>{euroConverted}€</Text>
        <TextInput
          value={input}
          onChangeText={(input) => setInput(input)}
          placeholder="Type"
        />
      </View>
      <View style={styles.button}>
        <Picker
          selectedValue={selectedCurrency}
          onValueChange={(itemValue: any, itemIndex) =>
            setSelectedCurrency(itemValue)
          }
        >
          {Object.entries(currencyList).map(([key, value]) => (
            <Picker.Item label={key} value={value} key={key} />
          ))}
          <Picker.Item label="js" value="js" />
        </Picker>
        <Button title="CONVERT" onPress={() => handleConvert()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
  },
  homeScreen_result: {
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 50,
  },
  button: {},
});

export default HomeScreen;
{
  /* {for (const propperty in currencyList) {
              <Picker.Item label=`${propperty}` value=`${currencyList[propperty]}` />
          }} */
}
{
  /* <Picker.Item label="JavaScript" value="js" /> */
}
