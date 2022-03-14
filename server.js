// Imports
if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config();
}
const express = require("express");
const fileupload = require('express-fileupload');
const findRouter = require('./routes/ajaxResponses/find');
const addRouter = require('./routes/ajaxResponses/add');
const updateRouter = require('./routes/ajaxResponses/update');
const deleteRouter = require('./routes/ajaxResponses/delete');
const saveImageRouter = require('./routes/ajaxResponses/saveImage');
const initalizePassport = require('./passport-config');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

initalizePassport(passport, email => users.find(user => user.email === email));
const users = [];

// Constants
const PORT = process.env.PORT || 3000;
const app = express();

// Routers
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');

// Server setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(express.urlencoded({extended: false, limit: '10mb'}));
app.use(express.json());
app.use(fileupload());
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// Routes
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/find', findRouter);
app.use('/add', addRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);
app.use('/saveImage', saveImageRouter);

app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
})

app.listen(PORT);

console.log(`Server running on port ${PORT}`);

// User login functionality is complete; now I need to make it so only certain users can actually create accounts
// For demo purposes, I also want to make it so a "guest" user can login
// That will essentially be handling user permissions, so that'll be my next target