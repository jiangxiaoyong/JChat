var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var redis = require("redis");
var RedisStore = require('connect-redis')(session);
var REDIS_ADDR = process.env.REDIS_PORT_6379_TCP_ADDR;
var REDIS_PORT = process.env.REDIS_PORT_6379_TCP_PORT;
var pub = redis.createClient(REDIS_PORT, REDIS_ADDR); //connect to redis that running in docker at that special ip, may be change when deploy tha app to PaaS
var sub = redis.createClient(REDIS_PORT, REDIS_ADDR);

//MongoDB configuration
var configDB = require('./config/database.js');
mongoose.connect(configDB.url); // connect to our database

//import configuration of Passport authentication
require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// user redis as session store. This way put session store out of our server, and can be retrieve fast.
// express use MemoryStore by default.
app.use(session({
    store: new RedisStore({
        host: REDIS_ADDR|| '192.168.99.100', // can also use redis internal ip address, like 172.17.*.*
        port: REDIS_PORT|| 6379,
    }),
    secret: 'secretKey' //session secret
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Set listening port
var port = process.env.PORT || 80;
app.set('port', port);

//check redis publisher connection status
pub.on('error', function(err) {
    console.log('Error connecting to redis publisher', err);
})

//check redis subscriber connection status
sub.on('error', function(err) {
    console.log('Error connecting to redis subscriber', err);
})

server.listen(port);
console.log('Your application is running on port:' + port);

// Require the configuration and the routes files, and pass
// the app and io as arguments to the returned functions.
require('./config')(app, io);
require('./routes/auth')(app, passport);
require('./routes/routes')(app, io, pub, sub);

//error handle

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/


