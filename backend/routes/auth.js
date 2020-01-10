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

module.exports = router;