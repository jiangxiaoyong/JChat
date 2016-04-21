/**
 * Created by jxy on 19/01/16.
 */
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    info            : {
        email        : String,
        password     : String,
        userName     : String,
        userMood     : String,
        imgSrc       : String
    },
    friendList       : [
        {
            id       : String,
            userMood : String,
            userName : String,
            email    : String,
            userStatus     : String,
            imgSrc   : String,
            unReadMsg: Boolean
        }
    ],
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.info.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);