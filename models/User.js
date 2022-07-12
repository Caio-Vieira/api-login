const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type:String, minlength:3, maxlength:200, required:true},
    email:{type:String, maxlength:200, required:true},
    password:{type:String, minlength:6, maxlength:200, required:true},
    admin:{type:Boolean, default:false},
    CreatedAt:{type:Date, default:Date.now}
})

module.exports = mongoose.model("User", userSchema)