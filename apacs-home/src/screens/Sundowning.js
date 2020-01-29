import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    TextInput,
    Alert
} from 'react-native';
import axios from 'axios';

import { db } from '../config';

let addItem = item => {
    db.ref('/items').push({
        time: item
    });
};

async function getTimes() {
    const { data } = await axios.get('https://api.sunrise-sunset.org/json?lat=40.7440&lng=-74.0324&date=today');
    return data;
}

async function convertSunsetTime() {
    let rawTimeData = await getTimes();
    let rawSunsetTime = rawTimeData.results.sunset;
    let hourMinSecArr = rawSunsetTime.split(":");
    let sunsetHourMin = {};
    sunsetHourMin.hour = parseInt(hourMinSecArr[0]);
    sunsetHourMin.min = parseInt(hourMinSecArr[1]);
    return sunsetHourMin;
}

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
        let timeArr = this.state.time.split(':');
        console.log(timeArr);
        console.log(parseInt(timeArr[0]));
        if (this.state.time.length != 5) {
            Alert.alert('Improper time format. Please enter a time in the format ##:##.');
        } else if (timeArr.length != 2) {
            Alert.alert('Improper time format. Please enter a time in the format ##:##.');
        } else if ( isNaN(parseInt(timeArr[0])) || isNaN(parseInt(timeArr[1])) ) {
            Alert.alert('Improper time format. Please enter a time in the format ##:##');
        } else {
            addItem(this.state.time);
            this.textInput.clear();
            Alert.alert('Time set successfully');
        }
        // addItem(this.state.time);
        // this.textInput.clear()
        // Alert.alert('Time set successfully');
    };

    handleReset = async () => {
        const todaysSunsetTime = await convertSunsetTime();
        let lightsOnTimeHour = todaysSunsetTime.hour - 5; // Convert from UTC to EST
        let lightsOnTimeMin = todaysSunsetTime.min - 20;
        if (lightsOnTimeMin < 0) {
            lightsOnTimeMin = 60 + lightsOnTimeMin;
            lightsOnTimeHour = lightsOnTimeHour - 1;
        }
        addItem(lightsOnTimeHour.toString() + ':' + lightsOnTimeMin.toString());
        Alert.alert('The time has been reset.');
    }

    render() {
        return (
            <View style={styles.main}>
                <Text style={styles.title}>Sundowning Prevention</Text>
                <Text>If you would like to override the default sundowning prevention time of 16:00, please enter a lights-on time below.</Text>
                <TextInput ref={input => { this.textInput = input }} style={styles.itemInput} onChange={this.handleChange} />
                <TouchableHighlight
                    style={styles.button}
                    underlayColor="white"
                    onPress={this.handleSubmit}
                >
                    <Text style={styles.buttonText}>Set Time</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    underlayColor="white"
                    onPress={this.handleReset}
                >
                    <Text style={styles.buttonText}>Reset Time</Text>
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