const jwt = require('jsonwebtoken');
const User = require('../models/user')
const dotenv = require('dotenv');
dotenv.config();
const jwtsecret = process.env.JWT_SECRET
console.log(jwtsecret)
const checkAuth = (req,res,next) => {
    console.log('çalıştı')
    
    const token = req.cookies.jwt
    if(token) {
        jwt.verify(token,jwtsecret,(err,decoded) => {
            if(err){console.log(err); res.redirect('/login')}
            else{console.log(decoded) ;next()}
        })
    }
    else{
        res.redirect('/login')
    }
    
}

module.exports = {
    checkAuth
}