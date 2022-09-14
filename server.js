const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const app = express();
var port = process.env.PORT || 8000;
const bodyParser = require("body-parser"); // parser middleware
const session = require("express-session"); // session middleware
const passport = require("passport"); // authentication
const connectEnsureLogin = require("connect-ensure-login"); //authorization
const User = require("./models/user.js"); // User Model
const {Exercises} = require("./models/exercises")
const {Goals} = require("./models/goals")
const url = process.env.MONGO_CONNECTION;
const fetch = require('node-fetch')
const ObjectId = require('mongodb').ObjectId

const passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", (_) => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
});

db.on("error", (err) => {
  //   console.error("connection error:", url);
});

app.set('view engine', 'ejs')

// Passport.js Authentication ===================================================

// Configure Sessions Middleware
app.use(
  session({
    secret: "r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  })
);

// Configure More Middleware
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(User.createStrategy());

// To use with sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Route to Login
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

//   Route to Registration Page
app.get("/registration", (req, res) => {
  res.sendFile(__dirname + "/views/registration.html");
});

// Route to Register
app.post("/register", (req, res) => {
  User.register(
    {
      username: req.body.userName,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      active: false,
    },
    req.body.password
  );
  res.sendFile(__dirname + "/views/login.html");
});

//   Route to authenticate with login
app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  function (req, res) {
    // console.log(req.user);
    res.redirect("/dashboard");
  }
);

// Route to Dashboard after authentication
app.get("/dashboard", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  // res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID}
  // and your session expires in ${req.session.cookie.maxAge}
  // milliseconds.<br><br>
  // <a href="/logout">Log Out</a><br><br><a href="/secret">Members Only</a>`);
  res.sendFile(__dirname + "/views/index.html");
});

// Route to login
app.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// end of passport.js == 

// Routes for Workout ===============
app.get("/workouts", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render('workout.ejs', { muscles: undefined });
});

app.get("/selection", async (req, res) => {

  try {
    let muscle = req.query.muscle
    // Exercise DB API
    let response = await fetch('https://exercisedb.p.rapidapi.com/exercises/target/'+ muscle, {
      headers: {
        'X-RapidAPI-Key': process.env.EXERCISE_API_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      },
      contentType: 'application/json'
    })
    let results = await response.json();
    res.render('workout.ejs', { muscles: results })
  }
  catch (error) {
    console.error(error)
  }

})

app.post("/selection", async (req,res) => {

  let objectId = ObjectId(req.body._id)

  const newExercises = new Exercises({
      _id: objectId,
      name: req.body.name,
      equipment: req.body.equipment,
      instructions: req.body.instructions,
      duration: req.body.duration,
      date: req.body.date
  })

  await newExercises.save()

  console.log("exercise saved")

  res.redirect("/workouts")
})


// Routes for Profile ===============
app.get("/profile", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render("profile.ejs", req);
  // console.log(req.user)
});

// app.put()

app.delete("/profile", async (req,res) => {
  let objectId = new ObjectId(req.body._id)

  await Exercises.deleteOne(
    {_id: objectId}
  )

  res.json("deleted")
})




