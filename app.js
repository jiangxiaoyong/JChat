var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Set listening port
var port = process.env.PORT || 8080;
app.set('port', port);

server.listen(port);
console.log('Your application is running on http://localhost:' + port);

// Require the configuration and the routes files, and pass
// the app and io as arguments to the returned functions.

require('./config')(app, io);
require('./routes/routes')(app, io);

//error handle

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/


