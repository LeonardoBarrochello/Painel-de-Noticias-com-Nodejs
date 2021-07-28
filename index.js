const express = require('express');
const app = express()
const path = require('path')
app.engine('html', require('ejs').renderFile);
app.set('view engine','html')
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}))
app.set("views" , path.join(__dirname , '/pages'))




app.get('/',(req,res) =>{
    if(req.query.search == null){
        res.render('home',{})
    }else{
        res.render("busca",{busca:req.query.search})
    }
})
app.get('/:slug',(req,res) =>{
    res.render('single', {})
})


app.listen(3000, (req,res)=>{
    console.log('Rodando')
})

