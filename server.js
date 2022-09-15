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
const { Exercises } = require("./models/exercises")
const { Goals } = require("./models/goals")
const url = process.env.MONGO_CONNECTION;
const fetch = require('node-fetch')
const ObjectId = require('mongodb').ObjectId
const dayjs = require('dayjs')

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
  res.render("login.ejs")
});

//   Route to Registration Page
app.get("/registration", (req, res) => {
  res.render("registration.ejs")
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
  res.render("login.ejs");
});

//   Route to authenticate with login
app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/dashboard");
  }
);

// Route to Dashboard after authentication
app.get("/dashboard", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  // res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID}
  // and your session expires in ${req.session.cookie.maxAge}
  // milliseconds.<br><br>
  // <a href="/logout">Log Out</a><br><br><a href="/secret">Members Only</a>`);
  try {
    let data = {};
    let chart = {};
    let labels = [];
    let entries = [];
    let caloriesSum = 0;
    const exercises = await Exercises.find({ userId: req.user._id })
    let goals = await Goals.find({ userId: req.user._id });;
    let goal = await Goals.findOne({ userId: req.user._id }, {}, { sort: { 'created_at': -1 } });

    if (goals.length > 0 && exercises.length > 0) {

      for (let i = 0; i < goals.length; i++) {
        labels.push(goals[i].startDate);
        entries.push(goals[i].currentWeight);
      }
      // Sums Total Calories
      for (let i = 0; i < exercises.length; i++) {
        caloriesSum += exercises[i].calories;
      }
      data.currentWeight = goal.currentWeight;
      data.goalWeight = goal.goalWeight;
      data.totalEstimatedCalories = caloriesSum;
      data.completedExercises = exercises.length;
    }
    res.render("index.ejs", { req: req, goalsDB: data, labels, entries })
  } catch (error) {
    console.error(error)
  }
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

// ROUTES FOR WORKOUT ===========================================
app.get("/workouts", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render('workout.ejs', { muscles: undefined });
});

app.get("/selection", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {

  try {
    let muscle = req.query.muscle
    // Exercise DB API
    let response = await fetch('https://exercisedb.p.rapidapi.com/exercises/target/' + muscle, {
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

app.post("/selection", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  let objectId = ObjectId(req.user._id)
  let date = dayjs(req.body.date).format('MM-DD-YYYY')
  try{
      let calories = await calculateCalories(req);
      const newExercises = new Exercises({
          userId: objectId,
          date: date,
          image: req.body.image,
          name: req.body.name,
          equipment: req.body.equipment,
          bodypart: req.body.bodypart,
          duration: req.body.duration,
          liftWeight: req.body.liftWeight,
          reps: req.body.reps,
          intensity: req.body.intensity,
          calories: calories,
          completed: false
      })

    await newExercises.save()

    console.log("exercise saved")
    res.redirect("/workouts")
  } catch (error) {
    console.error(error)
  }
})


// ROUTES FOR PROFILE ================================================
app.get("/profile", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {

  const exercises = await Exercises.find({ userId: req.user._id })
  const goals = await Goals.find({ userId: req.user._id })
  res.render("profile.ejs", { req: req, exerciseDB: exercises, goalsDB: goals });

});

app.post("/profileGoals", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  let objectId = ObjectId(req.user._id)

  let startDate = dayjs(req.body.startDate).format('MM-DD-YYYY')
  let endDate = dayjs(req.body.startDate).format('MM-DD-YYYY')

  const newGoals = new Goals({
    userId: objectId,
    goalName: req.body.goalName,
    currentWeight: req.body.currentWeight,
    goalWeight: req.body.goalWeight,
    startDate: startDate,
    endDate: endDate,
    favorite: false
  })

  await newGoals.save()

  res.redirect("/profile")
})

app.put("/profileGoals", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    let objectId = ObjectId(req.body._id)

    console.log('The goal PUT', req.body)
    let startDate = dayjs(req.body.startDate).format('MM-DD-YYYY')
    let endDate = dayjs(req.body.endDate).format('MM-DD-YYYY')

    await Goals.findOneAndUpdate({ _id: objectId }, {
      goalName: req.body.goalName,
      currentWeight: req.body.currentWeight,
      goalWeight: req.body.goalWeight,
      startDate: startDate,
      endDate: endDate
    })
    res.json("Updated")
    res.redirect("/profile")
  } catch (error) {
    console.log('Error:', error)
  }
})


// delete profile exercises
app.delete("/profileExercises", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  let objectId = new ObjectId(req.body._id)
  await Exercises.deleteOne(
    { _id: objectId }
  )
  res.json("deleted")
})


// delete profile goals
app.delete("/profileGoals", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  let objectId = new ObjectId(req.body._id)

  await Goals.deleteOne(
    { _id: objectId }
  )

  res.json("deleted")
})

app.put("/profileExerciseIncomplete",connectEnsureLogin.ensureLoggedIn(), async (req,res) =>{
  try {
    let objectId = ObjectId(req.body._id)
  
    await Exercises.findOneAndUpdate({_id: objectId},{
      completed: req.body.completed
    })
    res.json("Updated")
    res.redirect("/profile")
    console.log("complete request" + req.body)
  } catch (error) {
   console.log('Error:', error)
  }
})

app.put("/profileExerciseComplete",connectEnsureLogin.ensureLoggedIn(), async (req,res) =>{
  try {
    let objectId = ObjectId(req.body._id)
  
    await Exercises.findOneAndUpdate({_id: objectId},{
      completed: req.body.completed
    })
    res.json("Updated")
    res.redirect("/profile")
    console.log("complete request" + req.body)
  } catch (error) {
   console.log('Error:', error)
  }
})

app.put("/profileAccountUpdate",connectEnsureLogin.ensureLoggedIn(), async (req,res) =>{
  try {
    let objectId = ObjectId(req.body._id)
  
    await User.findOneAndUpdate({_id: objectId},{
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    })
    res.json("Updated")
    res.redirect("/profile")
    console.log("complete request" + req.body)
  } catch (error) {
   console.log('Error:', error)
  }
})

// calculates Calories
async function calculateCalories(req) {
  const kg = 0.453592;
  let intensity = req.body.intensity;
  let duration = req.body.duration;
  let calories;
  try {
    let goal = await Goals.findOne({ userId: req.user._id }, {}, { sort: { 'created_at': -1 } });
    let currentWeight = goal.currentWeight;
    //METS X 3.5 X BW (KG) / 200 = KCAL/MIN
    if (intensity === 'light') {
      calories = (3.5 * 3.5 * (currentWeight * kg)) / 200;
    }
    if (intensity === 'moderate') {
      calories = (5 * 3.5 * (currentWeight * kg)) / 200;
    }
    if (intensity === 'vigorous') {
      calories = (6 * 3.5 * (currentWeight * kg)) / 200;
    }
  } catch (error) {
    calories = 0;
    console.error(error)
  } finally {
    return (calories * duration).toFixed(2);
  }

}
