// dependencies
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
require("dotenv").config();

// connect to database
mongoose.connect(process.env.MONGO_CONNECTION,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// Create Model
const Schema = mongoose.Schema;

const User = new Schema({
  // username: String,
  email: String,
  password: String,
  image: String,
  fname: String,
  lname: String
});
// Export Model
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('userData', User, 'userData');