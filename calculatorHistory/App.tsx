import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './HomeScreen'
import HistoryScreen from './HistoryScreen'

export type RootStackParamList = {
  Home: undefined
  History: { operation: Data[] }
}
export interface Data {
  content: string
}
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
