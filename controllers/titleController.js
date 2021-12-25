const titleControl = (req,res,next) =>{
    if(typeof(res.locals.baslik) ===undefined){
        res.locals.baslik = 'XfxMail';
    }
    return next();
}

module.exports = titleControl;