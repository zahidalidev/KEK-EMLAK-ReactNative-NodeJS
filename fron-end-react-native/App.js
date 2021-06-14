import React from 'react';
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"

// Screens
import LoginScreen from "./app/screeens/LoginScreen"
import RegisterScreen from "./app/screeens/RegisterScreen"
import HomeScreen from "./app/screeens/HomeScreen"
import SellerScreen from "./app/screeens/SellerScreen"

const Stack = createStackNavigator();

export default function App() {
  const config = {
    animation: 'timing',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        transitionSpec: {
          open: config,
          close: config,
        },
      }} initialRouteName='loginScreen'
      >
        <Stack.Screen name="loginScreen" >{(props) => <LoginScreen {...props} />}</Stack.Screen>
        <Stack.Screen name="registerScreen" >{(props) => <RegisterScreen {...props} />}</Stack.Screen>
        <Stack.Screen name="homeScreen" >{(props) => <HomeScreen {...props} />}</Stack.Screen>
        <Stack.Screen name="sellerScreen" >{(props) => <SellerScreen {...props} />}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

