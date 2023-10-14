import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import MasonryList from '@react-native-seoul/masonry-list'
import Animated, { FadeInDown } from 'react-native-reanimated'

import Loading from './loading'
import { CachedImage } from '../helpers/cachedImage';
// import { mealData } from '../constants'

const Recipes = ({ categories, meals }) => {
    const navigation = useNavigation()

    return (
        <View className="mx-4 space-y-3">
            <Text className="font-semibold text-neutral-600" style={{ fontSize: hp(3.5) }}>
                Recipes
            </Text>
            { (categories.length === 0 || meals.length === 0)
                ? (
                    <Loading size="large" className="mt-20" />
                ) : (
                    <View>
                        <MasonryList
                            data={meals}
                            keyExtractor={(item) => item.idMeal}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item, i}) => <RecipeCard item={item} index={i} navigation={navigation} />}
                            onEndReachedThreshold={0.1}
                        />
                    </View>
                )
            }
        </View>
    )
}

const RecipeCard = ({ item, index, navigation }) => {
    let isEven = index % 2 == 0
    return (
        <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping()}>
            <Pressable
                style={{ width: '100%', paddingLeft: isEven ? 0: 8, paddingRight: isEven ? 8 : 0}}
                className="flex justify-center mb-4 space-y-1"
                onPress = {() => navigation.push('RecipeDetails', {...item})}
            >
                <Animated.View sharedTransitionTag={item.strMeal}>
                    <Image 
                        source={{ uri: item.strMealThumb }}
                        className="bg-black/5"
                        style={{ width: '100%', height: index %3 == 0 ? hp(25) : hp(35), borderRadius: 35}}
                        
                    />
                </Animated.View>
                {/* <CachedImage
                     uri= {item.strMealThumb}
                     style={{width: '100%', height: index%3==0? hp(25): hp(35), borderRadius: 35}}
                     className="bg-black/5"
                     sharedTransitionTag={item.strMeal}
                /> */}
                <Text className="font-semibold ml-2 text-neutral-600" style={{ fontSize: hp(1.8)}}>
                    {
                        item?.strMeal.length > 20 ? item.strMeal.slice(0,20)+'...' : item.strMeal
                    }
                </Text>
            </Pressable>
        </Animated.View>
    )
}


export default Recipes