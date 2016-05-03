/**
 * Created by jxy on 02/01/16.
 */

// This file is required by App.js. It sets up event listeners
// for the two main URL endpoints of the application - /create and /chat/:id
// and listens for socket.io messages.

// Use the gravatar module, to turn email addresses into avatar images:

var gravatar = require('gravatar');

// mongoose
var mongoose = require('mongoose');
ObjectId = mongoose.Types.ObjectId;

// load up the user model
var User       		= require('../config/models/user');

// Export a function, so that we can pass
// the app and io instances from the App.js file:

module.exports = function(app, io, pub, sub){

    app.get('/', function(req, res){

        // Render views/home.html
        res.render('index');
    });

    app.get('/chatPage', isLoggedIn, function(req, res){

        // Render views/home.html
        res.render('./chat/chat');
    });

    app.get('/userInfo', isLoggedIn, function(req, res){
        res.json({ 'userInfo': req.user});
    })

    app.get('/friendList', isLoggedIn, function(req, res){

        var list = [];
        User.findById(req.query.userId, function(err, user) {
            user.friendList.forEach(function(item){
                list.push({
                    id: item.id,
                    userMood: item.userMood,
                    userName: item.userName,
                    userStatus: item.userStatue,
                    imgSrc: item.imgSrc,
                    unReadMsg: item.unReadMsg
                })
            })
            res.send(JSON.stringify(
                list
            ))
        })

    })

    app.post('/addFriend', isLoggedIn, function(req, res) {

        //check if the friend to be added already exist in user friend list or not
        User.findOne({ 'info.email' :  req.user._doc.info.email},
                     { 'friendList' :  { $elemMatch: {'email': req.body.email }}}, function(err, user) {

                if(user._doc.friendList.length == 0 ) {
                    updateFriendList(req, res, chat);
                } else {
                    console.log('friend already exist');
                }
        })


    })

     app.get('/chatRecord', isLoggedIn, function(req, res){

        //return mock friend list
        res.contentType('application/json');
        res.send(JSON.stringify(
           mockList
        ))
    })

    app.get('/create', function(req,res){

        // Generate unique id for the room
        var id = Math.round((Math.random() * 1000000));

        // Redirect to the random room
        res.redirect('/chat/'+id);
    });

    app.get('/chat/:id', function(req,res){

        // Render the chant.html view
        res.render('chat');
    });



    // Initialize a new socket.io application, named 'chat'
    var chat = io.on('connection', function (socket) {


        /*
            Establish connection with clients
         */

        // Handle the receiving of messages
        socket.on('sendMsg', function(payload){
            // When the server receives a message, it sends it to the other person in the room.
            //socket.broadcast.to(socket.room).emit('receive', {msg: data.msg, user: data.user, img: data.img});

            pub.publish(payload.to, JSON.stringify(payload));

            //cache chat history at current user redis cache channel
            pub.RPUSH('chatHistory@' + payload.from, JSON.stringify(payload));
            pub.LTRIM('chatHistory@' + payload.from, 0, 100); //keep chat history size to 100

            //cache chat history at friend redis cache channel at the same time
            pub.RPUSH('chatHistory@' + payload.to, JSON.stringify(payload));
            pub.LTRIM('chatHistory@' + payload.to, 0, 100); //keep chat history size to 100
        });

        socket.on('iam', function(id) {

            sub.subscribe(id) //only subscribe current user ID, friend who want to talk to me, just publishing on my ID
        })

        socket.on('loadAllChatHistory', function(id) { //load all chat history belong to current user
            pub.LRANGE('chatHistory@' + id, 0, -1, function(err, data){
                socket.emit('chatHistoryAllFriends', data);
            })
        })

    });

    sub.on('message', function(channel, payload) {

        var msg = JSON.parse(payload)
           chat.emit('receiveMsg@' + msg.to, msg); //emit msg to dedicated socket listener specified by message destination
    })

};

function updateFriendList(req, res, chat) {

     User.findOne({ 'info.email' :  req.body.email }, function(err, user) {
        // if there are any errors, return the error
        if (err)
            return err

        // check to see if a friend exist in the database with that email
        if (!user) { //friend does not exist
             res.status(404).send('not found');
        } else {
            /*
                Two step for adding new friend
                1: if friend can be find in mongodb, add friend to the friend list of current user
                2: add current user to friend's friend list at the same time
             */

            //construct information of friend to be added for current user
            var currentUser_friendToBeAdded = user;
            var currentUser_friendToBeAddedInfo_id = ObjectId(currentUser_friendToBeAdded._doc._id.id).toString();
            var currentUser_friendToBeAddedInfo_userName = currentUser_friendToBeAdded._doc.info.userName;
            var currentUser_friendToBeAddedInfo_imgSrc = currentUser_friendToBeAdded._doc.info.imgSrc;
            var currentUser_friendToBeAddedInfo_email = currentUser_friendToBeAdded._doc.info.email;
            var currentUser_friendToBeAddedInfo = {
                'id'        : currentUser_friendToBeAddedInfo_id,
                'userName'  : currentUser_friendToBeAddedInfo_userName,
                'email'     : currentUser_friendToBeAddedInfo_email,
                'imgSrc'    : currentUser_friendToBeAddedInfo_imgSrc,
                'userMood'  : 'happy mood',
                'unReadMsg' : false
            }
            //update and insert new friend into current user friend list
            User.findByIdAndUpdate(
                ObjectId(req.user._doc._id.id).toString(),
                {$push: {'friendList': currentUser_friendToBeAddedInfo }},
                function(err, model) {
                    if (err)
                        console.log(err);
                    else {
                        //res.json({
                        //    status: 200
                        //});
                    }
                }
            );

            //update and insert current user into friend's friend list
            var friend_friendToBeAdded = req.user;
            var friend_friendToBeAddedInfo_id = ObjectId(friend_friendToBeAdded._doc._id.id).toString();
            var friend_friendToBeAddedInfo_userName = friend_friendToBeAdded._doc.info.userName;
            var friend_friendToBeAddedInfo_imgSrc = friend_friendToBeAdded._doc.info.imgSrc;
            var friend_friendTobeAddedInfo_email = friend_friendToBeAdded._doc.info.email;
            var friend_friendToBeAddedInfo = {
                'id'        : friend_friendToBeAddedInfo_id,
                'userName'  : friend_friendToBeAddedInfo_userName,
                'email'     : friend_friendTobeAddedInfo_email,
                'imgSrc'    : friend_friendToBeAddedInfo_imgSrc,
                'userMood'  : 'happy mood',
                'unReadMsg' : false
            }
            //update and insert new friend into current user friend list
            User.findByIdAndUpdate(
                ObjectId(currentUser_friendToBeAdded._doc._id.id).toString(),
                {$push: {'friendList': friend_friendToBeAddedInfo }},
                function(err, model) {
                    if (err)
                        console.log(err);
                    else {
                        res.status(200).send('success');
                    }
                }
            );

            chat.emit('refreshFriendList@' + ObjectId(req.user._doc._id.id).toString()); //inform current user to refresh it's friend list
            chat.emit('refreshFriendList@' + ObjectId(currentUser_friendToBeAdded._doc._id.id).toString() ); //inform your friend to update it's friend list
        }

    });
}

// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

