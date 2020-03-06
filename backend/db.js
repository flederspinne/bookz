const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dbLink = process.env.MONGODB_URI;

// Устанавливаем соединение с базой данных:
mongoose.connect(dbLink)
    .catch(err => {
        console.log(err)
    });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

module.exports = db;