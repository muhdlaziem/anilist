import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AnimeList from '../components/AnimeList';
import Information from '../components/Information';

const StackNav = createStackNavigator();
const Navigator = () => (
  <NavigationContainer>
    <StackNav.Navigator initialRouteName="Anime List">
      <StackNav.Screen
        //   options={{headerShown: false}}
        name="Anime List"
        component={AnimeList}
      />
      <StackNav.Screen
        //   options={{headerShown: false}}
        name="Characters & Informations"
        component={Information}
      />
    </StackNav.Navigator>
  </NavigationContainer>
);

export default Navigator;
