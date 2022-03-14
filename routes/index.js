const express = require('express');
const router = express.Router();

router.get('/', checkAuthentication, (req, res) => {
    res.render('index', {name: req.user.name});
});

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

module.exports = router;