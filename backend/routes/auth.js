const express = require('express');
const router = express.Router({mergeParams: true});
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');


router.post('/login', (req, res, next) => {
    passport.authenticate('local')(req, res, () => {
        req.session.save(function (err) {
            if (err) {
                return res.send('err2');
            }
            return res.send(req.session)
        });
    });
});

module.exports = router;