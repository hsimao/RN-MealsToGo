import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import { RestaurantsScreen } from '../../features/restaurants/screens/restaurants.screen';

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator screenOptions={{ headerMode: 'none' }}>
      <RestaurantStack.Screen
        name="Restaurants"
        component={RestaurantsScreen}
      />
      <RestaurantStack.Screen
        name="RestaurantDetail"
        component={() => <Text>Restaurant Detail</Text>}
      />
    </RestaurantStack.Navigator>
  );
};
