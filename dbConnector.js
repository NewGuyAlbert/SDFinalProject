require('dotenv').config()

const mongoose = require('mongoose')

// connect to cloud database
const credentials = process.env.MONGODB_URI
mongoose.connect(
    credentials,
    () => {
        console.log("connected to db")
    },
    e => console.error(e)   
)

module.exports = mongoose;