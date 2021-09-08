import React from 'react'
import { View, Text } from 'react-native'

export default function HistoryScreen ({ route, navigation }: any) {
  const { user } = route.params
  return (
    <View>
      <Text>Welcometo settings {user}</Text>
    </View>
  )
}
