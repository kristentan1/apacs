import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TouchableHighlight,
    StyleSheet,
    TextInput,
    Alert
} from 'react-native';

import { db } from '../config';
import {withNavigation} from 'react-navigation';

let addItem = item => {
    db.ref('/urls').push({
        url: item
    });
};

export default class Dressing extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            urls: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({
            urls: value
        });
        addItem(value);
        Alert.alert('Link updated');
    };

    render() {
        return (
            <View>
                <Text style = {styles.title}>
                    Getting Dressed
                </Text>
                <Button
                    title = "Little Help Tutorial"
                    value = {'firsturl'}
                    onPress = {() => {
                        this.handleChange("firsturl");
                    }}
                />
                <Text style = {styles.infoText}>
                    Inlcudes bottom help.
                </Text>
                <Button
                    title = "Some Help Tutorial"
                    color = "green"
                    onPress = {() => {
                        this.handleChange("secondurl");
                    }}
                />
                <Text style = {styles.infoText}>
                    Inlcudes top and bottom help.
                </Text>
                <Button
                    title = "A Lot of Help Tutorial"
                    color = "orange"
                    onPress = {() => {
                        this.handleChange("thirdurl");
                    }}
                />
                <Text style = {styles.infoText}>
                    Inlcudes top, bottom and shoes help.
                </Text>
                <Button
                    title = "Full Tutorial"
                    color = "red"
                    onPress = {() => {
                        this.handleChange("https://youtu.be/TwIVUSjBQTc");
                    }}
                />
                <Text style = {styles.infoText}>
                    Inlcudes full getting dressed tutorial.
                </Text>
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
        backgroundColor: '#6565fc'
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
      infoText: {
        fontSize: 14,
        color: '#111',
        alignContent: 'center'
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
