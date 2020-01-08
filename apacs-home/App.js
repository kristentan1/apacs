import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './src/screens/Home';
import Login from './src/screens/Login';

// We will use these two screen in our AppNavigator
import Sundowning from './src/screens/Sundowning';
import Dressing from './src/screens/Dressing';
import Wandering from './src/screens/Wandering';
import Caring from './src/screens/Caring';

import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const AppNavigator = createStackNavigator(
  {
    Login,
    Home,
    Sundowning,
    Dressing,
    Wandering,
    Caring
  },
  {
    initialRouteName: 'Login'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}