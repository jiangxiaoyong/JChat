/**
 * Created by jxy on 19/01/16.
 */
var MONGODB_ADDR = process.env.MONGODB_PORT_27017_TCP_ADDR
var MONGODB_PORT = process.env.MONGODB_PORT_27017_TCP_PORT;
var mongodb_connect_url = 'mongodb://' + MONGODB_ADDR + ':' + MONGODB_PORT + '/JChat';

console.log('mongodb running at address: ' + MONGODB_ADDR + ':' + MONGODB_PORT);

module.exports = {

    'url' : mongodb_connect_url // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot

};