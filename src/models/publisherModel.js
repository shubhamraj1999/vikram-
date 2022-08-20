
const mongoose = require("mongoose")

const publisher = new mongoose.schema({
    name: String,
    headquarter: string
},
    { timestamps: true })


module.exports = mongoose.model("myPublisher", publisher)

