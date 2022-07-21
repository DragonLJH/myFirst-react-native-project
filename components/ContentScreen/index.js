import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, View, Text, DrawerButton } from 'react-native';
import HomeScreen from "./HomeScreen/HomeScreen"
import ProductDetailsScreen from "./HomeScreen/ProductDetailsScreen"
import ShoppingCartScreen from "./ShoppingCartScreen/index"
import UserScreen from "./UserScreen/index"

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ShoppingCartStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();

export default function TabStack({ route, navigation }) {
    let { userName } = route.params;
    console.log("userName", userName)
    return (

        <Tab.Navigator screenOptions={{ headerShown: false }}>

            <Tab.Screen name="HomeStack">
                {() => (
                    <HomeStack.Navigator>
                        {/* XXXStack.Screen 中使用options={{ headerShown: false }}隐藏头部标题 */}
                        <HomeStack.Screen name="Home" component={HomeScreen} options={{
                            title: '首页'
                        }} />
                        <HomeStack.Screen name="ProductDetails" component={ProductDetailsScreen} />
                    </HomeStack.Navigator>
                )}
            </Tab.Screen>
            <Tab.Screen name="ShoppingCartStack">
                {() => (
                    <ShoppingCartStack.Navigator>
                        <ShoppingCartStack.Screen name="ShoppingCart" component={ShoppingCartScreen} options={{ headerShown: false }} />
                    </ShoppingCartStack.Navigator>
                )}
            </Tab.Screen>
            <Tab.Screen name="UserStack">
                {() => (
                    <UserStack.Navigator>
                        <UserStack.Screen name="User" component={UserScreen} options={{ headerShown: false }} />
                    </UserStack.Navigator>
                )}
            </Tab.Screen>
        </Tab.Navigator>
    )
}

