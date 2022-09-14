const mongoose = require("mongoose")
const Schema = mongoose.Schema

const goalsSchema = new Schema({
    goalName: String,
    currentWeight: Number,
    goalWeight: Number,
    startDate: Date,
    endDate: Date
})

const Goals = mongoose.model("Goals", goalsSchema)

module.exports = {Goals}