// Import development environment if app is not deployed for production
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Import necessary libraries
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Import router modules
const indexRouter = require('./routes/index');

// Configure view engine, viewws, and layouts
app.set('view engine', 'ejs'); // sets view engine to ejs
app.set('views', __dirname + '/views'); // location of views
app.set('layout', 'layouts/layout'); // location of page layout
app.use(expressLayouts); // allows use of layout file
app.use(methodOverride('_method')); // append query ...?_method=[ METHOD ] to use PUT, PATCH, and DELETE requests
app.use(express.static('public')); // static elements operate from directory "public"
// enables program to easily read HTTP request bodies, limits body size to 10 megabytes
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

// Connect to MongoDB database
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose!'));

// Routing
app.use('/', indexRouter);

// Server launch
app.listen(process.env.PORT || 3000);