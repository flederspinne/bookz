const express = require('express');
const router = express.Router();
const usersRouter = require('./users');


router.use('/users', usersRouter);

router.get('/', function(req, res, next) {
    res.send('api');
});

module.exports = router;