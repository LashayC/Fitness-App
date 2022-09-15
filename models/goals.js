const mongoose = require("mongoose")
const Schema = mongoose.Schema

const goalsSchema = new Schema({
    userId: mongoose.ObjectId,
    goalName: String,
    currentWeight: Number,
    goalWeight: Number,
    startDate: String,
    endDate: String,
    favorite: Boolean
})

const Goals = mongoose.model("Goals", goalsSchema)

module.exports = {Goals}