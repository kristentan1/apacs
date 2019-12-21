import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    TextInput,
    Alert
} from 'react-native';

import { db } from '../config';

let addItem = item => {
    db.ref('/items').push({
        time: item
    });
};

export default class AddItem extends Component {
    state = {
        time: ''
    };

    handleChange = e => {
        this.setState({
            time: e.nativeEvent.text
        });
    };

    handleSubmit = () => {
        addItem(this.state.time);
        Alert.alert('Time set successfully');
    };

    render() {
        return (
            <View style={styles.main}>
                <Text style={styles.title}>Sundowning Prevention</Text>
                <Text>If you would like to override the default sundowning prevention time of 16:00, please enter a lights-on time in the format XX:XX below.</Text>
                <TextInput style={styles.itemInput} onChange={this.handleChange} />
                <TouchableHighlight
                    style={styles.button}
                    underlayColor="white"
                    onPress={this.handleSubmit}
                >
                    <Text style={styles.buttonText}>Set Time</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#45b3e0'
      },
      title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center'
      },
      itemInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white'
      },
      buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
      },
      button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
      }
});