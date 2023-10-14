import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = (props) => {
  return (
    <View className="flex-1 flex justify-center items-center">
      <ActivityIndicator {...props} color='#22c55e' />
    </View>
  )
}

export default Loading