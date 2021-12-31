const User = require('../models/user')
const request = require('request')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWTSECRET
const login_get = (req,res)=>{
    res.render('login')
}

const login_post = (req,res)=>{
   
}

const register_get = (req,res)=>{
    res.render('register')
}

const register_post = (req,res)=>{
    var gelen = {
        username:req.body.username,
        password:req.body.password,
        forgotmail:req.body.forgotmail
    }
    console.log(gelen.username)
    User.find({'username': gelen.username})
    .then((result => {
      console.log(result[0]);
      if(result[0] != undefined){
       res.end("Error:Kullanıcı Adı Alınmış")
      }
      else{
        var parola = Math.random().toString(36).substring(2,12);
        console.log(parola);
        
        var requestOptions = {
          url:'https://xfxpositions.xyz:10000/virtual-server/remote.cgi?program=create-user&domain=xfxpositions.xyz&user='+gelen.username+'&pass='+parola+'&quota=1024&real='+gelen.username,
          auth:{
              user:process.env.VIRTUALMIN_USER,
              password:process.env.VIRTUALMIN_PASSWORD
          }
        }
        request.post(
          requestOptions,
          (error,response, body) => {
            if (error) {
              console.error(error)
              console.log(body.data)
              return;
            }
            else{
              console.log(body)
              var gonderim = new User({
                username:gelen.username,
                password:gelen.password,
                email_password:parola,
                forgot_mail:gelen.forgotmail
              })
              gonderim.save()
                .then((result => {
                    console.log(result);
                    res.status = 200;
                    res.end("created");
                }))
            }
          })
    }
    })) 
}
const finduser_post = (req,res)=>{
    const gelen = {
        username:req.body.username,
        password:req.body.password
    }
    User.find({username:gelen.username}).then(result=>{
      console.log(typeof(result[0]))
        if((result[0]!=undefined)){
            res.end('no')
        }
        else{
            res.end('yes')
        }
    })
}
  const createToken = (id)=>{
    const user = {username:id}
    User.find({username:id}.then((err,result)=>{
      const token = jwt.sign(user,jwtSecret+result[0].password,{expiresIn:'2h'})
      console.log(token)
    }))
    
  }
  

module.exports={
    login_get,
    login_post,
    register_get,
    register_post,
    finduser_post
}