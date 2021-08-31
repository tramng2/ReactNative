import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";
interface Data {
  content: string;
}
export default function App() {
  const [num1, setNum1] = useState<string>();
  const [num2, setNum2] = useState<string>();
  const [sign, setSign] = useState<string>();
  const [result, setResult] = useState<number>();
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    if (result && sign) {
      setData([...data, { content: `${num1} ${sign} ${num2} = ${result}` }]);
      setNum1("");
      setNum2("");
      setSign("");
    }
  }, [result]);

  const covertDecimal = (numberStr: any) => {
    const decimal: any = numberStr;
    return parseFloat(decimal.replace(",", "."));
  };
  const handlePlus = () => {
    setResult(covertDecimal(num1) + covertDecimal(num2));
    setSign("+");
  };
  const handleMinus = () => {
    setResult(covertDecimal(num1) + covertDecimal(num2));
    setSign("-");
  };
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>{result}</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(input) => setNum1(input)}
          value={num1}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(input) => setNum2(input)}
          value={num2}
        />
        <View style={styles.btn}>
          <Button
            title="+"
            onPress={handlePlus}
            disabled={num1 && num2 ? false : true}
          />
          <Button
            title="-"
            onPress={handleMinus}
            disabled={num1 && num2 ? false : true}
          />
        </View>
      </View>
      <View style={styles.listcontainer}>
        <Text>History</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => <Text>{item.content}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  listcontainer: {
    flex: 2,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
  },
  btn: {
    flexDirection: "row",
  },
});
