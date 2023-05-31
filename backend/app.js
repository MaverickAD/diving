let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
const mysql = require("mysql");
const cors = require("cors");

let app = express();

let indexRouter = require('./routes/index');
let apiUsersRouter = require('./routes/api/users');
let apiDiversRouter = require('./routes/api/divers');

const db = mysql.createConnection({
  host: "93.104.215.68",
  user: "databae",
  password: "datadiving",
  database: "sdms",
});

db.connect((err) => {
  console.log("Connected to MySQL server");
  if (err) throw err;
});

app.set('view engine', 'ejs');

app.use(session({
  secret: 'Plong3eS0usMar1ne',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 1000 * 60 * 60 * 24 } // 24 heures
}));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Middleware de vérification d'authentification et d'autorisation
const requireAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    next();
  }else{
    res.redirect('/');
  }
};

app.use('/', indexRouter);
app.use('/api/users', apiUsersRouter(db));
app.use('/api/divers', apiDiversRouter(db));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
