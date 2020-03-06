const express = require('express');
const router = express.Router({mergeParams: true});
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');
const User = require('../models/User');

const mongoose = require('mongoose');
const db = require('../db');

const aws = require('aws-sdk');
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
aws.config.region = 'eu-north-1';

const multer = require('multer');
const upload = multer();

const isAuth = require('../middleware/isAuthenticated')


router.post('/register', (req, res, next) => {

  User.register(new User({ username: req.body.username }), req.body.password, (err) => {
    if (err) {
      console.log('error while user register!', err);
      return res.send('err');
    }

    passport.authenticate('local')(req, res, () => {
      res.redirect('/api/users/me');
    });
  });
});

router.get('/me', isAuth, (req, res) => {
  res.send(req.user);
});

router.get('/avatar', isAuth, (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET_NAME,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  const imageUrl = `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`

  console.log('user', req.user)
  User.updateOne(req.user, { avatarUrl: imageUrl })
      .then((data)=>{
        console.log(data);
      })
      .catch((err)=>{
        console.log(err);
      })

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: imageUrl
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

module.exports = router;
