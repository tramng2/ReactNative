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
interface Data {
  stuff: string;
}
const db = SQLite.openDatabase("shoppinglistdb.db");
console.log(db);

export default function App() {
  const [item, setItem] = useState<string>("");
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists shoppinglist (id integer primary key not null, stuff text);"
      );
    });
    updateList();
  }, []);

  // const handlePress = () => {
  //   setData([...data, { key: item }]);
  //   setItem("");
  // };
  const saveItem = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into shoppinglist (stuff) values (?);", [item]);
      },
      undefined,
      updateList
    );
  };

  const updateList = () => {
    db.transaction((tx) => {
      tx.executeSql("select * from shoppinglist;", [], (_, { rows }) =>
        setData(rows._array)
      );
    });
  };

  const handleClear = () => {
    setItem("");
  };
  const deleteItem = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`delete from shoppinglist where id = ?;`, [id]);
      },
      null,
      updateList
    );
  };

  console.log(data);
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={(input) => setItem(input)}
          value={item}
        />
        <StatusBar style="auto" />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Button title="ADD" onPress={saveItem} />
        <Button title="CLEAR" onPress={handleClear} />
      </View>
      <Text style={{ color: "blue" }}>Shopping list</Text>

      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listcontainer}>
            <Text style={{ fontSize: 18 }}>{item.stuff}</Text>
            <Text
              style={{ fontSize: 18, color: "#0000ff" }}
              onPress={() => deleteItem(item.id)}
            >
              Done
            </Text>
          </View>
        )}
        data={data}
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
  },
  textInput: {
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
  },
});

// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   Button,
//   FlatList,
// } from "react-native";
// import * as SQLite from "expo-sqlite";

// const db = SQLite.openDatabase("coursedb.db");
// console.log(db);
// export default function App() {
//   const [credit, setCredit] = useState("");
//   const [title, setTitle] = useState("");
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         "create table if not exists course (id integer primary key not null, credits int, title text);"
//       );
//     });
//     updateList();
//   }, []);

//   // Save course
//   const saveItem = () => {
//     console.log("dkm");
//     db.transaction(
//       (tx) => {
//         tx.executeSql("insert into course (credits, title) values (?, ?);", [
//           parseInt(credit),
//           title,
//         ]);
//       },
//       null,
//       updateList
//     );
//   };

//   // Update courselist
//   const updateList = () => {
//     db.transaction((tx) => {
//       tx.executeSql("select * from course;", [], (_, { rows }) =>
//         setCourses(rows._array)
//       );
//     });
//     console.log("dkm3");
//   };

//   // Delete course
//   const deleteItem = (id) => {
//     db.transaction(
//       (tx) => {
//         tx.executeSql(`delete from course where id = ?;`, [id]);
//       },
//       null,
//       updateList
//     );
//   };

//   const listSeparator = () => {
//     return (
//       <View
//         style={{
//           height: 5,
//           width: "80%",
//           backgroundColor: "#fff",
//           marginLeft: "10%",
//         }}
//       />
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="Title"
//         style={{
//           marginTop: 30,
//           fontSize: 18,
//           width: 200,
//           borderColor: "gray",
//           borderWidth: 1,
//         }}
//         onChangeText={(title) => setTitle(title)}
//         value={title}
//       />
//       <TextInput
//         placeholder="Credits"
//         keyboardType="numeric"
//         style={{
//           marginTop: 5,
//           marginBottom: 5,
//           fontSize: 18,
//           width: 200,
//           borderColor: "gray",
//           borderWidth: 1,
//         }}
//         onChangeText={(credit) => setCredit(credit)}
//         value={credit}
//       />
//       <Button onPress={saveItem} title="Save" />
//       <Text style={{ marginTop: 30, fontSize: 20 }}>Courses</Text>
//       <FlatList
//         style={{ marginLeft: "5%" }}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.listcontainer}>
//             <Text style={{ fontSize: 18 }}>
//               {item.title}, {item.credits}
//             </Text>
//             <Text
//               style={{ fontSize: 18, color: "#0000ff" }}
//               onPress={() => deleteItem(item.id)}
//             >
//               {" "}
//               Done
//             </Text>
//           </View>
//         )}
//         data={courses}
//         ItemSeparatorComponent={listSeparator}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   listcontainer: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     alignItems: "center",
//   },
// });
