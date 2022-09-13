const mongoose = require("mongoose")
const Schema = mongoose.Schema

const exerciseSchema = new Schema({
    _id: mongoose.ObjectId,
    name: String,
    equipment: String,
    instructions: String,
    duration: String,
    date: Date
})

const Exercises = mongoose.model("Exercises", exerciseSchema)

module.exports = { Exercises }