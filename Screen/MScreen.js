import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import ProfileScreen from './MainScreen/ProfileScreen';
import MainHud from './MainScreen/MainHud';

const Tab = createBottomTabNavigator();

function MTabs() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'user' : 'user';
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={MainHud} 
          options={{ headerShown: false }}  // Remover o header da tela MainHud
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ headerShown: false }}  // Remover o header da tela ProfileScreen
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MScreen
const styles = StyleSheet.create({
  
});