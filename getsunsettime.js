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
    todaysSunsetTime.hour = 13;
    todaysSunsetTime.min = 59;
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
}

main();
