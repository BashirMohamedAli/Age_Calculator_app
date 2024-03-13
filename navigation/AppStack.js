/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the Icon component from react-native-vector-icons

import AgeCal from '../screens/AgeCal';
import BabyAge from '../screens/BabyAge';
import WorkingDay from '../screens/WorkingDay';
import Others from '../screens/Others';
import AgeComparison from '../screens/AgeComparison';
import AgeDetailsScreen from '../screens/AgeDetailsScreen';
import BMIScreen from '../screens/BMI';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomStack = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Age Cal"
      component={AgeCal}
      options={{
        title: 'Age Calculator',
        tabBarIcon: ({color, size}) => (
          <Icon name="calculator" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Baby Age"
      component={BabyAge}
      options={{
        tabBarIcon: ({color, size}) => (
          <Icon name="child" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="WorkingDay"
      component={WorkingDay}
      options={{
        tabBarIcon: ({color, size}) => (
          <Icon name="briefcase" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Other"
      component={Others}
      options={{
        tabBarIcon: ({color, size}) => (
          <Icon name="ellipsis-h" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="BMI"
      component={BMIScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <Icon name="ellipsis-h" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tab"
          component={BottomStack}
          options={{header: () => null}}
        />
        <Stack.Screen name="AgeComparison" component={AgeComparison} />
        <Stack.Screen
          name="AgeDetailsScreen"
          component={AgeDetailsScreen}
          options={{title: 'Age Calculator'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
