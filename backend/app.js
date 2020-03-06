require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const app = express();

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const apiRouter = require('./routes/api');
const indexRouter = require('./routes');

const User = require('./models/User');



app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  cookie: {
    maxAge: 10 * 60 * 1000,
    httpOnly: false,
  }
}));

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Set-Cookie, Access-Control-Allow-Origin, Content-Type, Accept, X-Requested-With');
  next();
});

app.use('/api', apiRouter);
app.use('/', indexRouter);

passport.use(new LocalStrategy(User.authenticate()));
passport.use(new VKontakteStrategy({
      clientID:     '7276593', // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
      clientSecret: 'TkRiql6bhkpF4SEgggUY',
      callbackURL: process.env.REACT_APP_API_URL + '/api/auth/vkontakte/callback'
    },
    (accessToken, refreshToken, params, profile, done) => {
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);
      console.log('params', params);
      console.log('profile', profile)
      User.findOne({
        'ensureIndex': profile.username
      }, function(err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          user = new User({
            username: profile.displayName,
            ensureIndex: profile.username,
            avatarUrl: profile.photos[0].value
          });
          user.save(function(err) {
            if (err) console.log(err);
            return done(err, user);
          });
        } else {
          return done(err, user);
        }
      });
    }
));
passport.use(new googleStrategy({
      clientID: '198994791507-718stsvad6bmmm4n5i9i8cl4s3h9tc6o.apps.googleusercontent.com',
      clientSecret: 'ALPFqwjPF-FasDLrEAYAmQms',
      callbackURL: process.env.REACT_APP_API_URL + '/api/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('profile', profile)
    User.findOne({
      'ensureIndex': profile.id
    }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        user = new User({
          username: profile.displayName,
          ensureIndex: profile.id,
          avatarUrl: profile.photos[0].value,
        });
        user.save(function(err) {
          if (err) console.log('Some unknown shit happened: ' + err);
          return done(err, user);
        });
      } else {
        return done(err, user);
      }
    });
  }
));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
  res.send(err.message);
});

module.exports = app;
