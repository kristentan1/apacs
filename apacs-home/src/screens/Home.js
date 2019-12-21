import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class Home extends Component {
    render() {
        return (
            <View>
                <Text>Home Screen</Text>
                <Button
                    title = "Sundowning Prevention"
                    onPress = {() => this.props.navigation.navigate('Sundowning')}
                />
                <Button
                    title = "Getting Dressed Tutorial"
                    color = "green"
                    onPress = {() => this.props.navigation.navigate('Dressing')}
                />
                <Button
                    title = "Wander Beacon"
                    color = "yellow"
                    onPress = {() => this.props.navigation.navigate('Wandering')}
                />
                <Button
                    title = "Caretaker Self Care"
                    color = "red"
                    onPress = {() => this.props.navigation.navigate('Caring')}
                />
            </View>
        );
    }
}   