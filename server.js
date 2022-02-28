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

// Constants
const PORT = process.env.PORT || 3000;
const app = express();

// Routers
const indexRouter = require('./routes/index');

// Server setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(express.urlencoded({extended: false, limit: '10mb'}));
app.use(express.json());
app.use(fileupload());

// Routes
app.use('/', indexRouter);
app.use('/find', findRouter);
app.use('/add', addRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);
app.use('/saveImage', saveImageRouter);

app.listen(PORT);

console.log(`Server running on port ${PORT}`);