const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Book = new Schema({
    title: String,
    authors: [String],
    genres: [String],
    coverUrl: {
        type: String,
        default: '../../../common/assets/images/book.png'
    },
    rating: {
        type: Number,
        min: 0,
        max: 10
    },
    read: Number,
    isbn: String,
    year: Number,
    publishingHouse: String,
    series: String,
    language: String,
    annotation: String,
    pages: Number
});

module.exports = mongoose.model('Book', Book);