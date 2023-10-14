import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import axios from 'axios'

import Categories from '../components/categories'
import Recipes from '../components/recipes';

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Beef')
  const [categories, setCategories] = useState([])
  const [meals, setMeals] = useState([])
  const [searchKeyword, setSearchKeyword] = useState('')

  const filterData = () => {
    console.log({searchKeyword})
    let filteredData = meals.filter(item => item.strMeal.toLowerCase().includes(searchKeyword.toLowerCase()))
    console.log({filteredData})
    setMeals(filteredData)
  }

  const handleKeywordChange = (keyword) => {
    console.log({keyword})
    setSearchKeyword(keyword)
    if(!keyword) {
      getMealsByCategory(activeCategory)
      return
    }    
  }
  
  const getCategories = async () => {
    try {
      const res = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      if(res && res.data) {
        setCategories(res.data.categories)
      }
    } catch (err) {
      console.error("Error: ", err.message)
      alert(err.message)
    }
  }

  const getMealsByCategory = async (category="Beef") => {
    setSearchKeyword('')
    try {
      const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      if(res && res.data) {
        setMeals(res.data.meals)
      }
    } catch (err) {
      console.error("Error: ", err.message)
      alert(err.message)
    }
  }

  useEffect(() => {
    getCategories()
    getMealsByCategory()
  }, [])

  const handleChangeCategory = (category) => {
    setMeals([])
    getMealsByCategory(category)
    setActiveCategory(category)
  }

  return (
    <View>
      <StatusBar style='dark' />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >

        {/*header */}
        <View className="mx-4 flex-row justify-between items-center">
          <Image
            source={require('../../assets/images/avatar.png')}
            style={{ height: hp(5), width: hp(5.5) }}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* Welcome text */}
        <View className="mx-4 space-y-2 mb-2">
          <Text className="text-neutral-600" style={{ fontSize: hp(2) }}>Hello, Steve</Text>
          <Text className="font-semibold text-neutral-600" style={{ fontSize: hp(3.8) }}>
            Prepare your own meals,
          </Text>
          <Text className="font-semibold text-neutral-600" style={{ fontSize: hp(3.8) }}>
            stay at <Text className='text-green-500'>home</Text>
          </Text>
        </View>

        {/* Search Bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
            placeholder='Search any recipe'
            placeholderTextColor={'gray'}
            value={searchKeyword}
            onChangeText={text => handleKeywordChange(text)}
          />
          <TouchableOpacity
            className="bg-white rounded-full p-3"
            onPress={() => filterData()}
           >
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View>
          {
            categories.length > 0 &&
              <Categories 
                categories={categories}
                activeCategory={activeCategory} 
                setActiveCategory={handleChangeCategory} 
              />
          }
        </View>

        {/* Recipes */}
        <View>
            <Recipes categories={categories} meals={meals} />
        </View>

      </ScrollView>
    </View>
  )
}

export default HomeScreen