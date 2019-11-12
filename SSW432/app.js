const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const static = express.static(__dirname + "/public");

const exphbs = require("express-handlebars");

const Handlebars = require("handlebars");

const handlebarsInstance = exphbs.create({
    defaultLayout: "main",
    // Specify helpers which are only registered on this instance.
    helpers: {
      asJSON: (obj, spacing) => {
        if (typeof spacing === "number")
          return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));
  
        return new Handlebars.SafeString(JSON.stringify(obj));
      }
    },
    partialsDir: ["views/partials/"]
  });

    var receivedResult = true;
    var spawn = require('child_process').spawn,
    py = spawn('python', ['getPressureReadings.py']),
    data = [1, 2, 3, 4, 5, 6, 7, 8, 9],
    dataString = '';

    py.stdout.on('data', function(data){
        // dataString += data.toString(); 
        console.log("");
    });
    py.stdout.on('end', function(){
      receivedResult = true; // Indicate that we have returned successfully from the Python program.
      console.log("");
    });
    py.stdin.write(JSON.stringify(data));
    py.stdin.end();

    // if (data) {
    //   receivedResult = true;
    // }

app.engine("handlebars", handlebarsInstance.engine);
app.set("view engine", "handlebars");

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});

if (receivedResult === true) {
  app.get('/', (req, res) => {
    res.render('layouts/main')
  }); 
}