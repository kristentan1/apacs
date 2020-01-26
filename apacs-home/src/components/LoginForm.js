import React, { Component } from 'react';
import { View, Button, Text, ActivityIndicator } from 'react-native';
import Input from './Input';
import firebase from 'firebase'

import { db } from '../config';

let addLoginError = item => {
    let currTime = new Date();
    console.log(currTime);
    db.ref('/loginerrors').push({
        loginerror: item,
        errorTime: currTime.toString()
    });
};

export default class LoginForm extends Component {
    state = { email: '', password: '' };

    consoleContents = [];


    onButtonPress() {
        this.setState({ error: '', loading: true })
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((error) => {
                        this.onLoginSuccess.bind(this);
                        error = 'NOTHING';
                    })
                    .catch((error) => {
                        console.log('-------------------------------------------');
                        console.log(error);
                        console.log('-------------------------------------------');
                        console.log(this.consoleContents);
                        if (this.consoleContents[this.consoleContents.length - 1] !== 'in') {
                            let errorCode = error.code
                            let errorMessage = error.message;
                            if (errorCode == 'auth/weak-password') {
                                this.onLoginFailure.bind(this)('Weak password!')
                            } else {
                                this.onLoginFailure.bind(this)(errorMessage)
                            }
                        }
                        // console.log(con)
                        this.consoleContents.push('nah');
                        console.log('*******************');
                        console.log(this.consoleContents);
                        console.log('*******************');
                        // let errorCode = error.code
                        // let errorMessage = error.message;
                        // if (errorCode == 'auth/weak-password') {
                        //     this.onLoginFailure.bind(this)('Weak password!')
                        // } else {
                        //     this.onLoginFailure.bind(this)(errorMessage)
                        // }
                    });
            });
    }
    onLoginSuccess() {
        console.log('LOGIN SUCCESS');
        // this.props.navigation.navigate('Home');
        this.setState({
            email: '', password: '', error: '', loading: false
        });
        this.consoleContents.push('in');
        this.props.navigation.navigate('Home');
        // console.log('BRUUHHH');
    }
    onLoginFailure(errorMessage) {
        console.log('WE ARE HERE');
        if (errorMessage === 'The email address is already in use by another account.') {
            errorMessage = 'This email address is already in use by another account. If you are not attempting to create a new account and you are certain your email address is correct, please try again with the correct password.';
        }
        if (errorMessage === 'Weak password!') {
            errorMessage = 'If you are attempting to create a new account, your password is too weak! Please create a password of at least 8 characters that contains at least one uppercase letter and one number.\n\nIf you are not attempting to create a new account and you are certain your email is correct, please re-type your password.';
        }
        addLoginError(errorMessage);
        this.setState({ error: errorMessage, loading: false });
    }
    renderButton() {
        if (this.state.loading) {
            return (
                <View style={styles.spinnerStyle}>
                    <ActivityIndicator size={"small"} />
                </View>
            );
        }
        return (
            <Button
                title="SIGN IN / SIGN UP"
                onPress={this.onButtonPress.bind(this)}
            />
        );
    }

    render() {
        return (
            <View>
                <Input label="Email"
                    placeholder="user@mail.com"
                    value={this.state.email}
                    secureTextEntry={false}
                    onChangeText={email => this.setState({ email })}
                />
                <Input label="Password"
                    placeholder="password"
                    value={this.state.password}
                    secureTextEntry={true}
                    onChangeText={password => this.setState({ password })}
                />

                {this.renderButton()}

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

            </View>
        );
    }

}

const styles = {
    errorTextStyle: {
        fontSize: 18,
        alignSelf: 'center',
        color: 'red'
    }
}