const express = require('express');
const router = express.Router({mergeParams: true});
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');

router.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(403).send('');
    } else {
        res.send(req.user);
    }
});

router.post('/login',
    passport.authenticate('local', {failureRedirect: '/login' }),
    (req, res) => {
    console.log(res.cookies)
        res.send(req.user) ;
    });

router.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy((err) => {
        if (err) {
            return res.send('err3');
        }
        return res.send('that\'s all folks')
    })
});

module.exports = router;