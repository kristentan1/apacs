import React, { Component } from 'react';
import { View, Button} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './src/screens/Home';
import Entry from './src/screens/Entry';
import Header from './src/components/Header';
// import Input from './src/components/Input';
import LoginForm from './src/components/LoginForm';

// We will use these two screen in our AppNavigator
import Sundowning from './src/screens/Sundowning';
import Dressing from './src/screens/Dressing';
import Wandering from './src/screens/Wandering';
import Caring from './src/screens/Caring';

import { YellowBox } from 'react-native';
import _ from 'lodash';

import firebase from 'firebase';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const AppNavigator = createStackNavigator(
  {
    Entry,
    Home,
    Sundowning,
    Dressing,
    Wandering,
    Caring
  },
  {
    initialRouteName: 'Entry'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  state = { loggedIn: null };
  componentDidMount() {
    // let config = {
    //   apiKey: "AIzaSyAnDPR1_QDrw5pKKxi17yzv9PJplzrf-Ww",
    //   authDomain: "rnfirebase-d80d9.firebaseapp.com",
    //   databaseURL: "https://rnfirebase-d80d9.firebaseio.com",
    //   projectId: "rnfirebase-d80d9",
    //   storageBucket: "rnfirebase-d80d9.appspot.com",
    //   messagingSenderId: "401684256760",
    //   appId: "1:401684256760:web:6b7b4638c1c588fed4680d",
    //   measurementId: "G-ZFVDNZS9R9"
    // };
    // firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    });
  }

  renderComponent() {
    // return (
    //     <LoginForm />
    //   );
    if (this.state.loggedIn) {
      return (
        <Button
          title="Sign out"
          onPress={() => firebase.auth().signOut()}
        />
      );
    } else {
      return (
        <LoginForm />
      );
    }
  }

  render() {
    return (
      <AppContainer />
      // <View>
      //   <Header title='Authenticator' />
      //   {this.renderComponent()}
      // </View>
    );
  }
}