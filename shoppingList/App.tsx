import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  Text,
  FlatList
} from 'react-native'

interface Data {
  key: string
}
export default function App () {
  const [item, setItem] = useState<string>('')
  const [data, setData] = useState<Data[]>([])
  const handlePress = () => {
    setData([...data, { key: item }])
    setItem('')
  }
  const handleClear = () => {
    setData([])
    setItem('')
  }
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={input => setItem(input)}
          value={item}
        />
        <StatusBar style='auto' />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Button title='ADD' onPress={handlePress} />
        <Button title='CLEAR' onPress={handleClear} />
      </View>
      <View style={styles.listcontainer}>
        <Text style={{ color: 'blue' }}>Shopping list</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => <Text>{item.key}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listcontainer: {
    flex: 2,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  textInput: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  }
})
