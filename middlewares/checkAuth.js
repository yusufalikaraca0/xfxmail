const jwt = require('jsonwebtoken');
const User = require('../models/user')
const checkAuth = (req,res,next) => {
    console.log('çalıştı')
    const token = req.cookies.jwt
    if(token) {
        jwt.verify(token,process.env.JWTSECRET,decodedToken=>{
            if(err){console.log(err); res.redirect('/login')}
            else{
                console.log(decodedToken);
                console.log('alıştı')
                next()
            }
        })
    }
    else{
        res.redirect('/login')
    }
}

module.exports = {
    checkAuth
}