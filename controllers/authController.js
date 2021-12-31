const User = require('../models/user')
const request = require('request')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWTSECRET
const login_get = (req,res)=>{
    res.render('login')
}
const createToken = (id)=>{
  const user = {userid:id}
  User.find({_id:id}).then((result=>{
    return jwt.sign(user,jwtSecret+result[0].password,{expiresIn:'2h'})
  }))

}
const login_post = (req,res)=>{
  const gelen = {
    username: req.body.username,
    password:req.body.password
  }
  console.log(gelen)

  
  
  User.find({username:gelen.username}).then((result=>{
    console.log(result)
    try{
      if(result[0] != undefined){
        const user = {userid:result[0]._id}

        if(gelen.password == result[0].password){
          const token1 = jwt.sign(user,jwtSecret+result[0].password,{expiresIn:'2h'})
          console.log(token1)
          
          res.cookie('jwt',token1,{httpOnly:true,maxAge:60*60*24*1000})
          res.redirect('/inbox')
          console.log('true')
        }
        else{
          res.end('false')
          console.log('error1')
        }
      }
      else{
        res.end('false')
        console.log('error2')
      }
    }
      catch(e){
        console.log(e)
      }
   }
 ))
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
  
const logout_get = (req, res) => {
  res.cookie('jwt','')
  res.redirect('/login')
}  

module.exports={
    login_get,
    login_post,
    register_get,
    register_post,
    finduser_post,
    logout_get,
}