const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../models/User');

const mongoose = require('mongoose');
const db = require('../db');


router.post('/', (req, res, next) => {
  const user = new User({
    username: 'test'
  });

  user.save((err) => {
    if (err) {
      console.log(err);
    }
  });

  res.send('ok');
});

module.exports = router;
