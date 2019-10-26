const axios = require('axios');

async function getTimes() {
    const {data} = await axios.get('https://api.sunrise-sunset.org/json?lat=40.7440&lng=-74.0324&date=today');
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
    // let date = new Date();
    const todaysSunsetTime = await convertSunsetTime();
    todaysSunsetTime.hour = 23;
    todaysSunsetTime.min = 13;
    console.log('~~~~~~~~~~');
    console.log(todaysSunsetTime.hour);
    console.log(todaysSunsetTime.min);
    console.log('~~~~~~~~~~');

    while (true) {
        // let currHour = date.getHours();
        // let currMin = date.getMinutes();
        let date = new Date();
        if (date.getHours() === todaysSunsetTime.hour && date.getMinutes() === todaysSunsetTime.min) {
            break;
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
    py.stdout.on('data', function(data){
        // dataString += data.toString();
        console.log("Made it here");
    });
    py.stdout.on('end', function(){
        console.log("And now here");
    });
    py.stdin.write(JSON.stringify(data));
    py.stdin.end();
}

main();
