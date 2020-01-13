import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Header from '../components/Header'
import LoginForm from '../components/LoginForm'
import firebase from 'firebase';

export default class Entry extends Component {
  state = { loggedIn: null };
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '' };
  }

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

  // Testing this to see if I just need to migrate some App.js stuff to Entry.js oh pls work - 01/12/20
  renderComponent() {
    // return (
    //     <LoginForm />
    //   );
    if (this.state.loggedIn) {
      console.log('LOGGED IN');
      return (
        <Button
          title="Sign out"
          onPress={() => firebase.auth().signOut()}
        />
      );
    } else {
      console.log('NAH NOT LOGGED IN');
      return (
        <LoginForm />
      );
    }
  }

  render() {
    return (
      <View>
        <Header title='APACS' />
        {/* <LoginForm /> */}
        {/* <Header title='Authenticator' /> */}
        {this.renderComponent()}
      </View>
      
    );
  }
}