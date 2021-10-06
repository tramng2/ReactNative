import React, { useEffect, useState } from "react";
import {
  TextInput,
  View,
  Button,
  Text,
  FlatList,
  Alert,
  SegmentedControlIOSComponent,
} from "react-native";
import { Data } from "./type";
import { styles } from "./style";
import firebase from "./config";

export default function App() {
  const [item, setItem] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [product, setProduct] = useState<Data[]>([]);

  useEffect(() => {
    firebase
      .database()
      .ref("items/")
      .on("value", (snapshot: any) => {
        const aux: Data[] = [];
        snapshot.forEach((child: any) => {
          aux.push({
            item: child.val().item,
            amount: child.val().amount,
            id: child.key,
          });
        });
        setProduct(aux);
      });
  }, []);
  const saveItem = () => {
    if (amount && item) {
      firebase.database().ref("items/").push({ item: item, amount: amount });
    } else {
      Alert.alert("Error", "Type product");
    }
  };
  const deleteItem = (id: any) => {
    const itemDelete = firebase.database().ref("items/" + id);
    itemDelete.remove();
  };

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%",
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput1}
        onChangeText={(input) => setItem(input)}
        value={item}
        placeholder="item"
      />
      <TextInput
        keyboardType="numeric"
        style={styles.textInput2}
        onChangeText={(amount) => setAmount(amount)}
        value={amount}
        placeholder="amount"
      />
      <Button title="ADD" onPress={saveItem} />
      <Text style={{ fontSize: 20 }}>Shopping list</Text>

      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={(item, index) => index.toString()}
        data={product}
        renderItem={({ item }) => (
          <View style={styles.listcontainer}>
            <Text style={{ fontSize: 15 }}>
              {item.item}, {item.amount}
            </Text>
            <Text
              style={{ fontSize: 15, color: "#0000ff", marginLeft: 5 }}
              onPress={() => deleteItem(item.id)}
            >
              bought
            </Text>
          </View>
        )}
        ItemSeparatorComponent={listSeparator}
      />
    </View>
  );
}
