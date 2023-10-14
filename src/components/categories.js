import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { CachedImage } from '../helpers/cachedImage';

// import { categoryData } from '../constants'

const Categories = ({ categories,  activeCategory, setActiveCategory }) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="space-x-4"
            contentContainerStyle={{ paddingHorizontal: 15 }}
        >
            {categories.map((category, index) => {
                let isActive = category.strCategory == activeCategory
                let activeButtonClass = isActive ? 'bg-green-400' : 'bg-black/10';
                return (
                    <TouchableOpacity
                        key={index}
                        className="flex items-center space-y-1"
                        onPress={() => setActiveCategory(category.strCategory)}
                    >
                        <View className={"rounded-full p-[6px] "+activeButtonClass}>
                            <CachedImage 
                                uri={category.strCategoryThumb }
                                style={{ width: hp(6), height: hp(6) }}
                                className="rounded-full"
                            />
                        </View>
                        <Text className="text-neutral-600">
                            {category.strCategory}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    </Animated.View>
  )
}

export default Categories