const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Avatar = new Schema({
    path: String,
});

module.exports = mongoose.model('Avatar', Avatar);