import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./components/LoginScreen/index"
import ContentScreen from "./components/ContentScreen/index"


const FStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <FStack.Navigator>
        <FStack.Screen name="Login" component={LoginScreen} />
        <FStack.Screen name="TabStack" component={ContentScreen} options={{ headerShown: false }} />
      </FStack.Navigator>
    </NavigationContainer>
  );
}
