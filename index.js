const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const checkAuth = require('./middlewares/checkAuth')
require('dotenv').config();


const app = express();
app.use(bodyparser.json())
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')
app.use(cookieParser())
//const titleControl = require('./controllers/titleController')
const routes = require('./routes/routes')
const authRoutes = require('./routes/authRoutes')
const inboxRoutes = require('./routes/inboxRoutes')

app.use(routes)
app.use(authRoutes)
app.use('/inbox',checkAuth.checkAuth,inboxRoutes)





app.use((req, res, next) => {
    res.status(404).render('404')
})
const connectionuri = process.env.CONNURI
mongoose.connect(connectionuri,{ useNewUrlParser: true, useUnifiedTopology:true},function(err,succ){
    if(err){console.log("error connecting =>"+err)}
    else{app.listen(80,(console.log("Listening")))}
})




