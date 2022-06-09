require('dotenv').config()

// loads db
const mongoose = require("../dbConnector.js")

const Admin = require("../models/Admin")

const adminKey = process.env.ADMIN_LOGIN_KEY

let newAdmin = new Admin({
    key: adminKey
})

newAdmin.emails.push({ email: "danilaalbertthefirst@gmail.com" })
newAdmin.emails.push({ email: "yewonblairseo@gmail.com" })
newAdmin.emails.push({ email: "albe9220@stud.kea.dk" })
newAdmin.emails.push({ email: "superplams@gmail.com" })

try{
    Admin.find().distinct("_id").then(async previousList => {
        newAdmin.save().then(async () => {
            if(previousList[0]){
                await Admin.deleteOne({_id: previousList[0]})
            }
            console.log("seeded admin")
            mongoose.disconnect()
        })
    })
} catch(error){
    console.log(error.message)
    mongoose.disconnect()
}