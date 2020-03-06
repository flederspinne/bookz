const express = require('express');
const router = express.Router();


router.get('*', function(req, res, next) {
    const options = {
        root: __dirname + '/../public',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    res.sendFile('./index.html', options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', './index.html');
        }
    });
});

module.exports = router;
