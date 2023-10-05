import React from 'react'
import { View, Text, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const WelcomeScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-amber-500">
      <StatusBar style='light' />

      {/* logo image */}
      <View>
        <View>
          <Image 
            source={require('../../assets/images/welcome.png')}
            style={{ width: hp(20), height: hp(20) }}          
          />
        </View>
      </View>
    </View>
  )
}

export default WelcomeScreen