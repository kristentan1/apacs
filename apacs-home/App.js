import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './src/screens/Home';

// We will use these two screen in our AppNavigator
import Sundowning from './src/screens/Sundowning';
import Dressing from './src/screens/Dressing';
import Wandering from './src/screens/Wandering';
import Caring from './src/screens/Caring';

const AppNavigator = createStackNavigator(
  {
    Home,
    Sundowning,
    Dressing,
    Wandering,
    Caring
  },
  {
    initialRouteName: 'Home'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}