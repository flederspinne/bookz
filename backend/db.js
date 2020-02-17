const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dbLink = 'mongodb://localhost:27017/bookz';
// const dbLink = 'mongodb://mongo:27017/bookz';

// Устанавливаем соединение с базой данных:
mongoose.connect(dbLink)
    .catch(err => {
        console.log(err)
    });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

module.exports = db;