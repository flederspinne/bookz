const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


const User = new Schema({
    username: String,
    password: String,
    ensureIndex: String,
    about: String,
    registrationDateTime: {
        type: Date,
        default: Date.now
    },
    avatarUrl: {
        type: String,
        default: '../../../common/assets/images/avatar.jpg'
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);