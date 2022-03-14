const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', checkNotAuthentication, (req, res) => {
    res.render('login');
});

router.post('/', checkNotAuthentication, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

function checkNotAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }

    next();
}

module.exports = router;