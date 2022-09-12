const mongoose = require('mongoose');
require("dotenv").config();
const express = require("express");
const app = express();
var port = process.env.PORT || 8000;
const bodyParser = require('body-parser'); // parser middleware
const session = require('express-session');  // session middleware
const passport = require('passport');  // authentication
const connectEnsureLogin = require('connect-ensure-login'); //authorization
const User = require('./user.js'); // User Model 

const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect(process.env.MONGO_CONNECTION,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
db.once("open", (_) => {
  console.log("Database connected:", url);
  app.listen(port, () => console.log(`Server running on port ${port}`));
});

db.on("error", (err) => {
  console.error("connection error:", url);
});

// Configure Sessions Middleware
app.use(session({
    secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
  }));
  
  // Configure More Middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Passport Local Strategy
  passport.use(User.createStrategy());
  
  // To use with sessions
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  // Route to Homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
  });
  
  // Route to Login Page
  app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/static/login.html');
  });
  
  // Route to Dashboard
  app.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
    and your session expires in ${req.session.cookie.maxAge} 
    milliseconds.<br><br>
    <a href="/logout">Log Out</a><br><br><a href="/secret">Members Only</a>`);
  });
  
  // Route to Secret Page
  app.get('/secret', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.sendFile(__dirname + '/static/secret-page.html');
  });
  
  // Route to Log out
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });
  
  // Post Route: /login
  app.post('/login', passport.authenticate('local', { failureRedirect: '/' }),  function(req, res) {
      console.log(req.user)
      res.redirect('/dashboard');
  });