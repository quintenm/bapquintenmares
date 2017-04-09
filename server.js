var express = require('express');

var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

var path = require('path');

// IP-adress

var os = require('os');

var interfaces = os.networkInterfaces();
var addresses = [];

// end IP-adress

// Define the port to run on
app.use(express.static(__dirname + '/public'));


// Listen for requests

server.listen(port, function () {
  console.log('Server listening at port %d', port);
  console.log('Go to\n');
  console.log('\x1b[36m%s\x1b[0m','http://localhost:' + port);
  console.log('\non your computer\nor on other devices in the same network\n');


  for (var k in interfaces) {
      for (var k2 in interfaces[k]) {
          var address = interfaces[k][k2];
          if (address.family === 'IPv4' && !address.internal) {
              console.log('\x1b[36m%s\x1b[0m','http://' + address.address + ':' + port);
          }
      }
  }
});

//Socket.io

var io = require('socket.io')(server);


io.on('connection', function (socket) {
    console.log('A user connected');
    socket.on('disconnect', function() {
        console.log('A user disconnected');
    });

    socket.on('controlls', function(data){
      var msg = data.msg;
      console.log(msg);
      io.emit('controlls', msg);
    });

});
