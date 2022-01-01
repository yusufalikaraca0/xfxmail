
const index_get = (req,res) => {
    res.render('index',{'baslik':'Anasayfa'})
    res.locals.baslik = 'Anasayfa'
    console.log(res.locals.baslik)
}

module.exports = {
    index_get
} 