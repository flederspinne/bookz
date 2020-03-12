const express = require('express');
const router = express.Router({mergeParams: true});
const Book = require('../models/Book');

const mongoose = require('mongoose');
const db = require('../db');

const aws = require('aws-sdk');
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
aws.config.region = 'eu-north-1';

const multer = require('multer');
const upload = multer();


router.post('/save', (req, res, next) => {
    let newBook = new Book({
        title: 'lol'
    });

    newBook.save(function (err, book) {
        if (err) {
            console.log('error while book saving!', err);
            return res.send('err');
        }
    });
    res.end();
});


module.exports = router;