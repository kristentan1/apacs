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
    let lightsOnTimeHour = todaysSunsetTime.hour - 5; // Convert from UTC to EST
    let lightsOnTimeMin = todaysSunsetTime.min - 20;
    if (lightsOnTimeMin < 0) {
        lightsOnTimeMin = 60 + lightsOnTimeMin;
        lightsOnTimeHour = lightsOnTimeHour - 1;
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
    console.log('~~~~~~~~~~');
    // console.log('Assume sunset time is ' + todaysSunsetTime.hour + ':' + todaysSunsetTime.min);

    while (true) {
        // let currHour = date.getHours();
        // let currMin = date.getMinutes();
        let date = new Date();
        if (date.getHours() === lightsOnTimeHour && date.getMinutes() === lightsOnTimeMin) {
            console.log('TRUE');
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
        console.log("");
    });
    py.stdout.on('end', function(){
        console.log("");
    });
    py.stdin.write(JSON.stringify(data));
    py.stdin.end();

    console.log('Process complete');
}

main();