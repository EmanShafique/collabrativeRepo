import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importing all screens
import WelcomeScreen from '../screens/WelcomeScreen';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Tasks from '../screens/Tasks';
import ExercisesAPI from '../screens/ExercisesAPI';


// Creating the stack navigator
const Stack = createStackNavigator();

// Main app navigator that controls all screen transitions
export default function AppNavigator() {
  return (
    // Navigation container wraps entire navigation system
    <NavigationContainer>
      {/* Stack navigator for switching between screens */}
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Tasks" component={Tasks} />
        <Stack.Screen name="ExercisesAPI" component={ExercisesAPI} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
