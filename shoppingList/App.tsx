import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  Text,
  FlatList,
} from "react-native";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

interface Data {
  stuff: string;
  id: number;
  amount: number;
}
const db = SQLite.openDatabase("shoppinglistdb.db");

export default function App() {
  const [stuff, setStuff] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [data, setData] = useState<Data[]>([]);

  console.log(FileSystem.documentDirectory);
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists shoppinglist (id integer primary key not null, amount int, stuff text);"
      );
    });
    updateList();
  }, []);

  const saveItem = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into shoppinglist (amount, stuff) values (?, ?);",
          [parseInt(amount), stuff]
        );
      },
      undefined,
      updateList
    );
    setAmount("");
    setStuff("");
  };

  const updateList = () => {
    db.transaction((tx) => {
      tx.executeSql("select * from shoppinglist;", [], (_, { rows }: any) =>
        setData(rows._array)
      );
    });
  };

  const deleteItem = (id: number) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`delete from shoppinglist where id = ?;`, [id]);
      },
      undefined,
      updateList
    );
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
        onChangeText={(stuff) => setStuff(stuff)}
        value={stuff}
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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listcontainer}>
            <Text style={{ fontSize: 15 }}>
              {item.stuff}, {item.amount}
            </Text>
            <Text
              style={{ fontSize: 15, color: "#0000ff", marginLeft: 5 }}
              onPress={() => deleteItem(item.id)}
            >
              bought
            </Text>
          </View>
        )}
        data={data}
        ItemSeparatorComponent={listSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listcontainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  textInput1: {
    marginTop: 70,
    fontSize: 18,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
  },
  textInput2: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 18,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
  },
});
