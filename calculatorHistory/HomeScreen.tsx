import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

export default function HomeScreen ({ navigation }: any) {
  const [num1, setNum1] = useState<string>()
  const [num2, setNum2] = useState<string>()
  const [sign, setSign] = useState<string>()
  const [result, setResult] = useState<number>()

  useEffect(() => {
    if (result && sign) {
      setNum1('')
      setNum2('')
      setSign('')
    }
  }, [result])
  const covertDecimal = (numberStr: any) => {
    const decimal: any = numberStr
    return parseFloat(decimal.replace(',', '.'))
  }
  const handleOperation = (sign: string) => {
    if (sign === '+') {
      setResult(covertDecimal(num1) + covertDecimal(num2))
      setSign('+')
    } else if (sign === '-') {
      setResult(covertDecimal(num1) - covertDecimal(num2))
      setSign('-')
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>Result: {result}</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={input => setNum1(input)}
          value={num1}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={input => setNum2(input)}
          value={num2}
        />
        <View style={styles.btn}>
          <Button
            title='+'
            onPress={() => handleOperation('+')}
            disabled={num1 && num2 ? false : true}
          />
          <Button
            title='-'
            onPress={() => handleOperation('-')}
            disabled={num1 && num2 ? false : true}
          />
          <Button
            title='History'
            onPress={() => navigation.navigate('History', { user: 'tram' })}
          />
        </View>
      </View>
      <StatusBar style='auto' />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5
  },
  btn: {
    flexDirection: 'row'
  }
})

//   <View style={styles.listcontainer}>
//   <Text>History</Text>
//   <FlatList
//     data={data}
//     renderItem={({ item }) => <Text>{item.content}</Text>}
//     keyExtractor={(item, index) => index.toString()}
//   />
// </View>
