const express = require('express');
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const Posts = require('./Posts.js')
const favoriteOption = require('./controllers/favoriteOption')

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
                    id:val.id,
                    title:val.title,
                    category:val.category,
                    content:val.content,
                    shortContent: val.content.substr(0,100),
                    imagem:val.imagem,
                    slug:val.slug,
                    author:val.author,
                    favorite:val.favorite
                }

            })
            Posts.find({}).sort({'views': -1}).limit(3).exec(function(err,postsTop){

                // console.log(posts[0]);

                 postsTop = postsTop.map(function(val){

                         return {

                             title: val.title,

                             content: val.content,

                             shortContent: val.content.substr(0,100),

                             imagem: val.imagem,

                             slug: val.slug,

                             category: val.category,

                             views: val.views,
                             
                             favorite:val.favorite

                             

                         }

                 })
                
                 Posts.find({favorite:true}).exec(function(err,favoritesNews){
                    res.render('home', {posts:posts,PostsTop:postsTop,favorites:favoritesNews})
                })
             })
            })
        
        
    }else{
        Posts.find({$or:[{title:{$regex:req.query.search,$options:"i"}},{content:{$regex:req.query.search,$options:"i"}},{category:{$regex:req.query.search,$options:"i"}}]}).exec(function(err,resposta){
            resposta = resposta.map(function(val){
                return{ 
                    title:val.title,
                    category:val.category,
                    content:val.content,
                    shortContent: val.content.substr(0,100),
                    imagem:val.imagem,
                    slug:val.slug,
                }

            })
            res.render("busca",{busca:req.query.search,noticias:resposta})
        })
      
      
    }
})

app.get('/create-notice',(req,res) =>{
    res.render('create-notice')
})
app.post('/createNotice',(req,res) =>{
    Posts.insertMany({
        title: req.body.title,
        category:req.body.category,
        content:req.body.content,
        imagem:req.body.imagem,
        slug:req.body.slug,
        author:req.body.author,
        views:0,
        favorite:false  
    })
    res.redirect('/')
})


app.get('/:slug', (req,res) => {
    if(req.params.slug != 'favicon.ico' && req.params.slug!='favorite'){
        Posts.findOneAndUpdate({slug:req.params.slug},{$inc:{views:1}},{new:true},function(err,resposta){
            if(resposta!=null){
                Posts.find({}).sort({'views': -1}).limit(3).exec(function(err,postsTop){

                    // console.log(posts[0]);
    
                     postsTop = postsTop.map(function(val){
    
                             return {
    
                                title: val.title,

                                content: val.content,

                                shortContent: val.content.substr(0,100),

                                imagem: val.imagem,

                                slug: val.slug,

                                category: val.category,

                                views: val.views,

                                favorite: val.favorite
    
                                 
    
                             }
    
                     })
                     res.render('single', {noticias:resposta,PostsTop:postsTop})
                    
    
                 })


            }


        }  )
    }
    
})

app.get("/favorite/:slug", favoriteOption.favorite)
app.get("/unfavorite/:slug",favoriteOption.unfavorite)

app.listen(3000, (req,res)=>{
    console.log('Rodando')
})

