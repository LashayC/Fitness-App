const mongoose = require("mongoose")
const Schema = mongoose.Schema

const exerciseSchema = new Schema({
    userId: mongoose.ObjectId,
    date: String,
    image: String,
    name: String,
    equipment: String,
    bodypart: String,
    duration: String,
    liftWeight: String,
    reps: String,
})

const Exercises = mongoose.model("Exercises", exerciseSchema)

module.exports = { Exercises }