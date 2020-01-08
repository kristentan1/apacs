import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
// import LoginForm from './LoginForm';

import { db } from '../config';

let addUserEntry = entry => {
    db.ref('/userEntries').push({
        user: entry
    });
};

let addEntry = function addEntry(usernameEntry, passwordEntry) {
    db.ref('/userEntries').push({
        username: usernameEntry,
        password: passwordEntry
    });
}

export default class Login extends Component {
    state = {
        username: '',
        password: ''
    };

    handleUsernameChange = e => {
        this.setState({
            username: e.nativeEvent.text,
        });
    };

    handlePasswordChange = e => {
        this.setState({
            password: e.nativeEvent.text,
        });
    };

    handleSubmit = () => {
        addEntry(this.state.username, this.state.password);
        this.textInput.clear()
        Alert.alert('Success!');
        this.props.navigation.navigate('Home')
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Text style={styles.title}>APACS</Text>
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                    ref={input => { this.textInput = input }}
                    placeholder='Username'
                    placeholderTextColor='rgba(255, 255, 255, 0.7)'
                    style={styles.input}
                    onChange={this.handleUsernameChange}
                    />
                    <TextInput
                    ref={input => { this.textInput = input }}
                    placeholder='Password'
                    placeholderTextColor='rgba(255, 255, 255, 0.7)'
                    style={styles.input}
                    onChange={this.handlePasswordChange}
                    />

                    <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={this.handleSubmit}
                    // onPress = {() => this.props.navigation.navigate('Home')}
                    >
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={this.handleSubmit}
                    // onPress = {() => this.props.navigation.navigate('Home')}
                    >
                        <Text style={styles.buttonText}>SIGNUP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}   

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#a9a9a9",
        padding: 20
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    title: {
        color: '#000000',
        fontSize: 40,
        fontWeight: "bold",
        width: 200,
        textAlign: 'center'
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        marginBottom: 20,
        color: '#FFFFFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#000000',
        paddingVertical: 10,
        marginBottom: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF'
    }
});