const express = require('express');
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const Posts = require('./Posts.js')


app.engine('html', require('ejs').renderFile);
app.set('view engine','html')
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}))
app.set("views" , path.join(__dirname , '/pages'))


mongoose.connect('mongodb+srv://root:246578901@cluster0.s7jdi.mongodb.net/PortalNoticias?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true}).then(function(){
    console.log("conectado com sucesso")
}).catch(function(err){
    console.log(err.message)
})

app.get('/',(req,res) =>{
    if(req.query.search == null){
        Posts.find({}).sort({"_id":-1}).exec(function(err,posts){
            posts = posts.map(function(val){
                return{
                    title:val.title,
                    category:val.category,
                    content:val.content,
                    shortContent: val.content.substr(0,100),
                    imagem:val.imagem,
                    slug:val.slug,
                }

            })
            res.render('home',{posts:posts})

        })
        
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

