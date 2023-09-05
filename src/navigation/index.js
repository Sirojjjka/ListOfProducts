import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PostScreen from '../components/PostCommponent';
import CommentComponent from '../components/CommentComponent';
import FormComponent from '../components/FormComponent';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
        }}>
        <Stack.Screen name="Home" component={PostScreen} />
        <Stack.Screen name="Comment" component={CommentComponent} />
        <Stack.Screen name="FormComponent" component={FormComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;


