import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView
} from 'react-native'

export default function App () {
  const [firstInput, setFirstInput] = useState()
  const [secondInput, setSecondInput] = useState()
  const [result, setResult] = useState()

  const covertDecimal = number => {
    const decimal = number
    return parseFloat(decimal.replace(',', '.'))
  }
  console.log('5,2')
  const plus = () => {
    setResult(covertDecimal(firstInput) + covertDecimal(secondInput))
    setFirstInput()
    setSecondInput()
  }
  const minus = () => {
    setResult(covertDecimal(firstInput) - covertDecimal(secondInput))
    setFirstInput()
    setSecondInput()
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.container}>
        <Text>Result: {result}</Text>
        <TextInput
          style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
          value={firstInput}
          keyboardType='numeric'
          onChangeText={input => setFirstInput(input)}
        />
        <TextInput
          style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
          value={secondInput}
          keyboardType='numeric'
          onChangeText={input => setSecondInput(input)}
        />
      </View>
      <View style={styles.button}>
        <Button
          disabled={firstInput && secondInput ? false : true}
          color='blue'
          title='+'
          onPress={plus}
        />
        <Button
          disabled={firstInput && secondInput ? false : true}
          title='-'
          onPress={minus}
        />
      </View>
      <StatusBar style='auto' />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    flex: 2,
    width: 80,
    flexDirection: 'row',
    alignItems: 'flex-start'
  }
})
