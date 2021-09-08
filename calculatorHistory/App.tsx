import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StackScreenProps } from '@react-navigation/stack'

import HomeScreen from './HomeScreen'
import HistoryScreen from './HistoryScreen'

type RootStackParamList = {
  Home: undefined
  History: { num1: number; num2: number; sign: string }
}
type Props = StackScreenProps<RootStackParamList, 'History'>

const Stack = createStackNavigator<RootStackParamList>()
export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='History' component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'flex-end'
//   },
//   listcontainer: {
//     flex: 2,
//     padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   textInput: {
//     width: 200,
//     borderColor: 'gray',
//     borderWidth: 1
//   },
//   btn: {
//     flexDirection: 'row'
//   }
// })
