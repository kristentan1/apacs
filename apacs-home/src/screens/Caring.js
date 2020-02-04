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
    db.ref('/reminders').push({
        reminder: item
    });
};

export default class AddItem extends Component {
    state = {
        time: '',
        text: ''

    };

    handleTimeChange = e => {
        this.setState({
            time: e.nativeEvent.text
        });
    };

    handleReminderChange = e => {
        this.setState({
            text: e.nativeEvent.text
        });
    }


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
            addItem(this.state);
            //addItem(this.state.reminder)
 //this.textInput.clear();
            Alert.alert('Time set successfully');
        }
    };

    render() {
        return (
            <View style={styles.main}>
                <Text style={styles.title}>Care Reminders</Text>
                <Text style={{textAlign: 'center', marginBottom: 20}}>Set a daily reminder for yourself</Text>
                <TextInput clearButtonMode="always" placeholder = "Time" style={styles.itemInput} onChange={this.handleTimeChange} />
                <TextInput clearButtonMode="always" placeholder = "Reminder Text" style={styles.itemInput} onChange={this.handleReminderChange} />
                <TouchableHighlight
                    style={styles.button}
                    underlayColor="white"
                    onPress={this.handleSubmit}
                >
                    <Text style={styles.buttonText}>Set Reminder</Text>
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
        backgroundColor: 'red'
      },
      title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center'
      },
      itemInput: {
        height: 50,
        padding: 4,
        marginBottom: 5,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        borderRadius: 8,
        color: 'black'
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
