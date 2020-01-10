import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header'
import LoginForm from '../components/LoginForm'
export default class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '' };
  }

  render() {
    return (
      <View>
        <Header title='APACS' />
        <LoginForm />
      </View>
    );
  }
}