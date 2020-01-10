const express = require('express');
const router = express.Router({mergeParams: true});
const passport = require('passport');


router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/api/users/me');
    }
);

router.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy((err) => {
        if (err) {
            return res.send('err3');
        }
        return res.send(null)
    })
});

router.post('/vkontakte',
    passport.authenticate('vkontakte'),
    function(req, res){
        // The request will be redirected to vk.com for authentication, so
        // this function will not be called.
    });

router.get('/vkontakte/callback',
    passport.authenticate('vkontakte', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/api/users/me');
    });

module.exports = router;