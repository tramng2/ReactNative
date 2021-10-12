import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import * as Contacts from "expo-contacts";
import { Contact } from "expo-contacts";

const Item = ({ item }) => {
  return (
    <View style={styles.item}>
      <Text>{item.name}</Text>
      {item.phoneNumbers?.map((el: any) => (
        <Text key={el.id}>{el.number}</Text>
      ))}
    </View>
  );
};

export default function ContactScreen() {
  const [contactList, setContactList] = useState<Contact[]>([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      setContactList(data);
    }
  };
  const renderItem = ({ item }: any) => <Item item={item} />;

  return (
    <>
      <View style={styles.container}>
        <Button title="Get Contact" onPress={getContacts} />
      </View>
      <View style={styles.contactList}>
        {contactList.length > 0 ? (
          <FlatList
            data={contactList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        ) : null}
      </View>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    width: 220,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  contactList: {
    alignItems: "center",
    flex: 4,
  },
});
