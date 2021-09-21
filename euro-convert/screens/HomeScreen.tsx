import { Picker } from "@react-native-community/picker";
import { ItemValue } from "@react-native-community/picker/typings/Picker";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Button, TextInput } from "react-native";
import { CurrencyData } from "../types";

function HomeScreen() {
  const [currencyList, setCurrencyList] = useState<CurrencyData>({});
  const [selectedCurrency, setSelectedCurrency] = useState<ItemValue>("");
  const [input, setInput] = useState<string>("");
  const [euroConverted, setEuroCoverted] = useState<number>(0);
  const [indexCurrency, setIndexCurrency] = useState<number>(0);

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
    const euroAmount = Number(input) / Number(selectedCurrency);
    setEuroCoverted(Math.round(euroAmount * 100) / 100);
    setInput("");
  };

  return (
    <View>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            width: 200,
            height: 100,
          }}
        />
        <Text style={styles.text}>{euroConverted}€</Text>
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          value={input}
          onChangeText={(input) => setInput(input)}
          placeholder="Type"
          keyboardType="numeric"
        />
        <Text style={styles.textCurrencyUnit}>
          {Object.keys(currencyList)[indexCurrency]}
        </Text>
      </View>
      <View style={styles.currencyPicker}>
        <Button
          title="CONVERT"
          onPress={() => handleConvert()}
          disabled={input ? false : true}
        />

        <Picker
          selectedValue={selectedCurrency}
          onValueChange={(itemValue: any, itemIndex: number) => {
            setIndexCurrency(itemIndex);
            setSelectedCurrency(itemValue);
          }}
        >
          {Object.entries(currencyList).map(([key, value]) => (
            <Picker.Item label={key} value={value} key={key} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 50,
    flex: 1,
  },
  currencyPicker: {
    flex: 6,
  },
  text: {
    fontSize: 30,
  },
  input: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  textInput: {
    alignItems: "center",
    fontSize: 20,
    width: 50,
  },
  textCurrencyUnit: {
    alignSelf: "center",
  },
});

export default HomeScreen;
