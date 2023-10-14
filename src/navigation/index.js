import * as React from 'react'
import { NavigationContainer } from  '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import WelcomeScreen from '../screens/WelcomeScreen'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen.js'
import HomeScreen from '../screens/HomeScreen'
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen'

const Stack = createNativeStackNavigator()

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation