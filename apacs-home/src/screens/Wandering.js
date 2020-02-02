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
var ref = db.ref("/motionAlerts");
console.log('aaaaaaaaaaaaaah');
ref.on('value', function (data) {
    // this.setState({ logs: data.val() });
    console.log(Object.values(data.val()));
}.bind(this));
console.log('here we are!!!!!!!!!!!!!!!!!');
// function readFromDb(databaseArg) {
//     var ref = databaseArg.ref("/motionAlerts");

//     let snapshotArray = [];
//     let logString = '';

//     // Attach an asynchronous callback to read the data at our posts reference
//     ref.on("value", function (snapshot) {
//         let snapshotObj = snapshot.val();
//         snapshotArray = Object.values(snapshotObj);
//         console.log('++++++++++++++++++++++++++++++++');
//         console.log(snapshotObj);
//         console.log(typeof snapshot.val());
//         console.log(snapshotArray);
//         // console.log(typeof snapshotArray);
//         // console.log(snapshotArray[snapshotArray.length - 1].time);
//         console.log('++++++++++++++++++++++++++++++++');
//         // for (let i = 0; i < snapshotArray.length; i++) {
//         //     logString += snapshotArray[i] + '\n';
//         // }
//         // console.log('');
//         return snapshotArray;
//     }, function (errorObject) {
//         return ("The read failed: " + errorObject.code);
//     });
//     return snapshotArray;
// };

let addItem = item => {
    db.ref('/items').push({
        name: item
    });
};

export default class Wandering extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        logs: []
    };

    componentWillMount() {
        var ref = db.ref("/motionAlerts");
        ref.on('value', function (data) {
            this.setState({ logs: Object.values(data.val()) });
        }.bind(this));
    }

    // retrieved_logs = readFromDb(db);

    render() {
        return (
            <View style={styles.main}>
                <Text style={styles.title}>Wander Beacon</Text>
                <Text>The following are the most recent logs of the wander beacon.</Text>
                <Text></Text>
                <Text>Some logs here.</Text>
                <Text></Text>
                {/* <Text>{this.state.logs.toString()}</Text> */}
                <Text>
                    {this.state.logs.map(function (item, index) {
                        return <Text>{item.message}</Text>
                    })}
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