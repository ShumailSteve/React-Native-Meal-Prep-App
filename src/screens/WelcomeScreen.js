import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated'

const WelcomeScreen = () => {
  const navigation = useNavigation()
  const ringOnePadding = useSharedValue(0)
  const ringTwoPadding = useSharedValue(0)

  useEffect(() => {
    ringOnePadding.value = 0
    ringTwoPadding.value = 0

    setTimeout(() =>  
      ringOnePadding.value = withSpring(ringOnePadding.value + hp(5))
      , 100
    )

    setTimeout(() =>  
      ringTwoPadding.value = withSpring(ringTwoPadding.value + hp(5.5))
      , 300
    )

    // Navigate to Login Screen
    setTimeout(() => navigation.replace('Login'), 2500)
  }, [])

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-green-500">
      <StatusBar style='light' />

      {/* logo image */}
      <Animated.View className='bg-white/20 rounded-full' style={{ padding: ringTwoPadding }}>
        <Animated.View className='bg-white/20 rounded-full' style={{ padding: ringOnePadding }}>
          <Image 
            source={require('../../assets/images/welcome.png')}
            style={{ width: hp(20), height: hp(20) }}          
          />
        </Animated.View>
      </Animated.View>
      
      {/* Title */}
      <View className='flex items-center space-y-2'>
        <Text className='font-bold text-white tracking-widest' style={{ fontSize: hp(7) }}>
          Prepify
        </Text>
        <Text className='font-medium text-white tracking-widest' style={{ fontSize: hp(2) }}>
          Effortless Meal Prep, Happy Eating!
        </Text>
      </View>
    </View>
  )
}

export default WelcomeScreen