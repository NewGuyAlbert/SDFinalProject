const mongoose = require('mongoose')

// connect to cloud database
const credentials = require("./config/dbCredentials.js")
mongoose.connect(
    credentials.uri,
    () => {
        console.log("connected to db")
    },
    e => console.error(e)   
)

module.exports = mongoose;