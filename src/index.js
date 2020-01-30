var express = require('express');
var app = express();
var fs = require("fs");
var spawn = require('child_process').spawn;
var mustacheExpress = require('mustache-express');

var lastChange = new Date();
var currentVolume = 0;

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname);
app.get('/', function (req, res) {
  // if (new Date() - lastChange > 1000 * 60 * 60 * 3) {
  //   currentVolume = 0;
  // }
  res.render('site.mustache', { currentVolume: currentVolume });
})

app.get('/reset', function (req, res) {
  currentVolume = 0;
  lastChange = new Date();
  res.send('done')
})

app.get('/vol_up', function (req, res) {
  var count = parseInt(req.query.count || 1);
  currentVolume += count / 5;
  lastChange = new Date();
  var command = [
    'src/irrp.py',
    '-p',
    '-g', '18',
    '-f', __dirname + '/ir-codes',
  ];
  command = command.concat(Array(count).fill('vol_up'));
  var child = spawn('python', command);

  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  child.on('exit', function() {
    res.send('done')
  });
})

app.get('/vol_down', function (req, res) {
  var count = parseInt(req.query.count || 1);
  currentVolume -= count / 5;
  lastChange = new Date();
  var command = [
    'src/irrp.py',
    '-p',
    '-g', '18',
    '-f', __dirname + '/ir-codes',
  ];
  command = command.concat(Array(count).fill('vol_down'));
  var child = spawn('python', command);

  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  child.on('exit', function() {
    res.send('done')
  });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
