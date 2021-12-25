const mongoose = require('mongoose');
const Userschema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email_password:{
        type:String,
    },
    phone_number:{
        type:Number
    },
    forgot_mail:{
        type:String,
        required:true
    }
})
const User = mongoose.model('User',Userschema)
module.exports = User;

