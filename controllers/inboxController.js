var Imap = require("imap");
var MailParser = require("mailparser").MailParser;
var Promise = require("bluebird");
Promise.longStackTraces();

const inbox_get = (req,res) => {

    res.locals.deneme = "deneme"
    res.render('inbox')
}
const inbox_post = (req,res) => {
    
}

module.exports = {
    inbox_get
}