const express = require('express');
const router = express.Router({mergeParams: true});
const passport = require('passport');


router.post('/login',
    // TODO: Отлавливать ошибки, если пользователя с такими учётными данными не существует,
    //       предлагать зарегистрироваться
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
        // return res.send(null)
        res.redirect('/api/users/me');
    })
});

router.get('/vkontakte',
    passport.authenticate('vkontakte'),
    function(req, res){
        // The request will be redirected to vk.com for authentication, so
        // this function will not be called.
    });

router.get('/vkontakte/callback',
    passport.authenticate('vkontakte', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        // res.redirect('/api/users/me');
        res.redirect(process.env.BUILD === 'PRODUCTION' ? '/' : 'http://localhost:3000/');
    });

router.get('/google',
    passport.authenticate('google', { scope: ['profile'] }),
    function(req, res){
    // The request will be redirected to vk.com for authentication, so
    // this function will not be called.
});

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect(process.env.BUILD === 'PRODUCTION' ? '/' : 'http://localhost:3000/');
    });

module.exports = router;