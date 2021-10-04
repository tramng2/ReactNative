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
      <View style={styles.container}>
        <Text>Shopping list</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(stuff) => setStuff(stuff)}
          value={stuff}
        />
        <TextInput
          keyboardType="numeric"
          style={styles.textInput}
          onChangeText={(amount) => setAmount(amount)}
          value={amount}
        />
        <StatusBar style="auto" />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Button title="ADD" onPress={saveItem} />
      </View>

      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listcontainer}>
            <Text style={{ fontSize: 18 }}>
              {item.stuff} {item.amount}
            </Text>
            <Text
              style={{ fontSize: 18, color: "#0000ff", marginLeft: 12 }}
              onPress={() => deleteItem(item.id)}
            >
              Done
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
    justifyContent: "flex-end",
  },
  listcontainer: {
    flex: 2,
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  textInput: {
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
  },
});
