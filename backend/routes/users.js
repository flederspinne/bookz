const express = require('express');
const router = express.Router({mergeParams: true});
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');
const User = require('../models/User');

const mongoose = require('mongoose');
const db = require('../db');


router.post('/register', (req, res, next) => {

  User.register(new User({ username: req.body.username }), req.body.password, (err) => {
    if (err) {
      console.log('error while user register!', err);
      return res.send('err');
    }

    passport.authenticate('local')(req, res, () => {
      res.redirect('/api/users/id');
    });
  });
});

router.get('/id', (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(403).send(undefined);
  } else {
    res.send(req.user);
  }
});

module.exports = router;
