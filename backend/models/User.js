const mongoose = require('mongoose');
const Schema = mongoose.Schema;

ObjectId = require('mongoose').Types.ObjectId;

const User = mongoose.model('User',
    new Schema({
        _id: ObjectId,
        username: String,
        description: String,
        registrationDateTime: {
            type: Date,
            default: Date.now
        }
    })
);

module.exports = User;