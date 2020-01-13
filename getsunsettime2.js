const Firebase = require('firebase');
const axios = require('axios');

let config = {
    apiKey: "AIzaSyAnDPR1_QDrw5pKKxi17yzv9PJplzrf-Ww",
    authDomain: "rnfirebase-d80d9.firebaseapp.com",
    databaseURL: "https://rnfirebase-d80d9.firebaseio.com/",
    projectId: "rnfirebase-d80d9",
    storageBucket: "rnfirebase-d80d9.appspot.com",
    messagingSenderId: "401684256760",
    appId: "1:401684256760:web:6b7b4638c1c588fed4680d",
    measurementId: "G-ZFVDNZS9R9"
};
let app = Firebase.initializeApp(config);
const db = app.database();

async function readFromDb(databaseArg) {
    var ref = databaseArg.ref("/items");

    let snapshotArray = [];

    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function (snapshot) {
        let snapshotObj = snapshot.val();
        snapshotArray = Object.values(snapshotObj);
        console.log('++++++++++++++++++++++++++++++++');
        console.log(snapshotObj);
        console.log(typeof snapshot.val());
        console.log(snapshotArray);
        console.log(typeof snapshotArray);
        console.log(snapshotArray[snapshotArray.length - 1].time);
        console.log('++++++++++++++++++++++++++++++++');
        return snapshotArray;
    }, function (errorObject) {
        return ("The read failed: " + errorObject.code);
    });
    return snapshotArray;
}

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

async function main() {
    let overridden = false;
    // Try again
    var ref = db.ref("/items");
    ref.on("value", function (snapshot) {
        let snapshotObj = snapshot.val();
        console.log(snapshotObj);
        if (snapshotObj === null) {
            return;
        }
        overridden = true;
        snapshotArray = Object.values(snapshotObj);
        return snapshotArray;
    }, function (errorObject) {
        return ("The read failed: " + errorObject.code);
    });

    const todaysSunsetTime = await convertSunsetTime();
    let lightsOnTimeHour = todaysSunsetTime.hour - 5; // Convert from UTC to EST
    let lightsOnTimeMin = todaysSunsetTime.min - 20;
    if (lightsOnTimeMin < 0) {
        lightsOnTimeMin = 60 + lightsOnTimeMin;
        lightsOnTimeHour = lightsOnTimeHour - 1;
    }

    // Check to see if sundowning prevention time has been manually overridden
    if (overridden) {
        snapshotNewestTime = snapshotArray[snapshotArray.length-1].time;
        snapshotHourMinArr = snapshotNewestTime.split(':');
        lightsOnTimeHour = parseInt(snapshotHourMinArr[0]);
        lightsOnTimeMin = parseInt(snapshotHourMinArr[1]);
        console.log('Lights-on time overridden.');
        console.log('');
    }

    // todaysSunsetTime.hour = 12;
    // todaysSunsetTime.min = 40;
    console.log('Sunset hour and minute:');
    console.log(todaysSunsetTime.hour);
    console.log(todaysSunsetTime.min);

    console.log();
    console.log('Lights on time hour and minute:');
    // lightsOnTimeHour = 16;
    // lightsOnTimeMin = 28;
    console.log(lightsOnTimeHour);
    console.log(lightsOnTimeMin);

    // console.log('Assume sunset time is ' + todaysSunsetTime.hour + ':' + todaysSunsetTime.min);

    while (true) {
        // let currHour = date.getHours();
        // let currMin = date.getMinutes();
        let date = new Date();
        if (date.getHours() === lightsOnTimeHour && date.getMinutes() === lightsOnTimeMin) {
            console.log('TRUE');
            break; // The program should end after this. This is not the most updated code. (12/21/19)
        }
    }

    // Time is now equal to sunset time
    console.log("Lights turning on!");
    // Send email
    // window.open('mailto:trigger@applet.ifttt.com');

    var spawn = require('child_process').spawn,
        py = spawn('python', ['turnonlights.py']),
        data = [1, 2, 3, 4, 5, 6, 7, 8, 9],
        dataString = '';

    // I think we don't need to do this because we don't need anything to happen when we return from the Python process.
    py.stdout.on('data', function (data) {
        // dataString += data.toString();
        console.log("");
    });
    py.stdout.on('end', function () {
        console.log("");
    });
    py.stdin.write(JSON.stringify(data));
    py.stdin.end();

    console.log('Process complete');
}

main();