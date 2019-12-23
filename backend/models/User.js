const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User = mongoose.model('User',
    new Schema({
        username: String,
        password: String,
        about: String,
        registrationDateTime: {
            type: Date,
            default: Date.now
        }
    })
);

module.exports = User;