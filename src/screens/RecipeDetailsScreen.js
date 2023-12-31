import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { ChevronLeftIcon, ClockIcon, FireIcon } from 'react-native-heroicons/outline'
import {  HeartIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/solid'
import YouTubeIframe from 'react-native-youtube-iframe'
import axios from 'axios'

import Loading from '../components/loading'
import { useNavigation } from '@react-navigation/native'

const RecipeDetailScreen = (props) => {
    let item = props.route.params
    const navigation = useNavigation()

    const [isFavourite, setIsFavourite] = useState(false)
    const [loading, setLoading] = useState(true)
    const [meal, setMeal] = useState(null)
    const [dataIndexes, setDataIndexes] = useState([])
    
    // Youtube frame render 
    const [isReadyForRender, setIsReadyForRender] = useState(false);
    function onReady() {
        setIsReadyForRender(true)
    }
  
    useEffect(() => {

        const getMealData = async (id)=>{
            try{
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            if(response && response.data){
                setMeal(response.data.meals[0])
                ingredientsIndexes(response.data.meals[0])
                setLoading(false);
            }
            } catch(err) {
                console.log('error: ', err.message)
                alert(err.message)
            }
        }

        getMealData(item.idMeal)
    },[])

    // Get index wirh values
    const ingredientsIndexes = (meal) => {
        if(!meal) {
            setDataIndexes([])
            return
        };
        let indexes = [];
        for(let i = 1; i<=20; i++){
            if(meal['strIngredient'+i]){
                indexes.push(i);
            }
        }
        setDataIndexes(indexes)
        return 
    }

    const getYoutubeVideoId = url=>{
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
          return match[1];
        }
        return null;
    }

  return (
    <ScrollView
        className="bg-white flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}
    >
      <StatusBar style={"light"} />

      {/* Recipe image */}
      <View className="flex-row justify-center">
        <Animated.View sharedTransitionTag={item.strMeal}>
            <Image 
                source={{uri: item.strMealThumb}}
                style={{ 
                    width: wp(98), 
                    height: hp(50), 
                    borderRadius: 32, 
                    marginTop: 4
                }}
            />
        </Animated.View>
      </View>

      {/* Buttons */}
      <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity onPress={()=> navigation.goBack()} className="p-2 rounded-full ml-5 bg-white">
            <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#22c55e" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> setIsFavourite(!isFavourite)} className="p-2 rounded-full mr-5 bg-white">
            <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite? "red": "gray"} />
        </TouchableOpacity>
      </Animated.View>

      {/* Description */}
      {
        loading? (
            <Loading size="large" className="mt-16" />
        ) : (
            <View className="px-4 flex justify-between space-y-4 pt-8">
                {/* Title and location */}
                <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-2">
                    <Text style={{fontSize: hp(3)}} className="font-bold flex-1 text-neutral-700">
                        {meal?.strMeal}
                    </Text>
                    <Text style={{fontSize: hp(2)}} className="font-medium flex-1 text-neutral-500">
                        {meal?.strArea}
                    </Text>
                </Animated.View>

                {/* Details*/}
                <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className="flex-row justify-around">
                    <View className="flex rounded-full bg-green-400 p-2">
                        <View 
                            style={{height: hp(6.5), width: hp(6.5)}}
                            className="bg-white rounded-full flex items-center justify-center"
                        >
                            <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                        </View>
                        <View className="flex items-center py-2 space-y-1">
                            <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700">
                                35
                            </Text>
                            <Text style={{fontSize: hp(1.3)}} className="font-bold text-neutral-700">
                                Mins
                            </Text>
                        </View>
                    </View>
                    <View className="flex rounded-full bg-green-400 p-2">
                        <View 
                            style={{height: hp(6.5), width: hp(6.5)}}
                            className="bg-white rounded-full flex items-center justify-center"
                        >
                            <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                        </View>
                        <View className="flex items-center py-2 space-y-1">
                            <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700">
                                03
                            </Text>
                            <Text style={{fontSize: hp(1.3)}} className="font-bold text-neutral-700">
                                Servings
                            </Text>
                        </View>
                    </View>
                    <View className="flex rounded-full bg-green-400 p-2">
                        <View 
                            style={{height: hp(6.5), width: hp(6.5)}}
                            className="bg-white rounded-full flex items-center justify-center"
                        >
                            <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                        </View>
                        <View className="flex items-center py-2 space-y-1">
                            <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700">
                                103
                            </Text>
                            <Text style={{fontSize: hp(1.3)}} className="font-bold text-neutral-700">
                                Cal
                            </Text>
                        </View>
                    </View>
                    <View className="flex rounded-full bg-green-400 p-2">
                        <View 
                            style={{height: hp(6.5), width: hp(6.5)}}
                            className="bg-white rounded-full flex items-center justify-center"
                        >
                            <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                        </View>
                        <View className="flex items-center py-2 space-y-1">
                            <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700">
                                
                            </Text>
                            <Text style={{fontSize: hp(1.3)}} className="font-bold text-neutral-700">
                                Easy
                            </Text>
                        </View>
                    </View>
                </Animated.View>

                {/* Ingredients */}
                <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="space-y-4">
                    <Text style={{fontSize: hp(2.5)}} className="font-bold flex-1 text-neutral-700">
                        Ingredients
                    </Text>
                    <View className="space-y-2 ml-3">
                        {
                           (dataIndexes.map(i=>{
                                return (
                                    <View key={i} className="flex-row space-x-4">
                                        <View style={{height: hp(1.5), width: hp(1.5)}}
                                            className="bg-green-400 rounded-full" />
                                        <View className="flex-row space-x-2">
                                                <Text style={{fontSize: hp(1.7)}} className="font-extrabold text-neutral-700">{meal['strMeasure'+i]}</Text>
                                                <Text style={{fontSize: hp(1.7)}} className="font-medium text-neutral-600">{meal['strIngredient'+i]}</Text>
                                        </View>
                                    </View>
                                )
                            })) 
                        }
                    </View>
                </Animated.View>

                {/* Instructions */}
                <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="space-y-4">
                    <Text style={{fontSize: hp(2.5)}} className="font-bold flex-1 text-neutral-700">
                        Instructions
                    </Text>
                    <Text style={{fontSize: hp(1.6)}} className="text-neutral-700">
                        {
                            meal?.strInstructions
                        }
                    </Text>
                </Animated.View>

                {/* Youtube Video */}
                {
                    meal?.strYoutube && (
                        <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className="space-y-4">
                            <Text style={{fontSize: hp(2.5)}} className="font-bold flex-1 text-neutral-700">
                                Recipe Video
                            </Text>
                            <View>
                                <YouTubeIframe
                                    videoId={getYoutubeVideoId(meal.strYoutube)}
                                    height={hp(30)}
                                    onReady={onReady}
                                    webViewStyle={{opacity: 0.99, display: isReadyForRender ? 'flex' : 'none'}}
                                    webViewProps={{androidLayerType: isReadyForRender ? 'hardware' : 'software'}}
                                />
                            </View>
                        </Animated.View>
                    )
                }
            </View>
        )
      }
    </ScrollView>
  )
}

export default RecipeDetailScreen