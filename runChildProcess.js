var express = require('express');
var app = express();

app.listen(3000, () => {
	console.log('server running on port 3000');
});

app.get('/', runSensor);

function runSensor(req, res) {

	var spawn = require('child_process').spawn;

	var process = spawn('python', ['./sensor2.py']);

	process.stdout.on('data', function(data) {
		res.send(data.toString());
	} );
} 
