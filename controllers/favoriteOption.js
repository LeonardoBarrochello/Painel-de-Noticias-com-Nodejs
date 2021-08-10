const Posts = require('../Posts.js')
module.exports = {
        favorite(req,res){
            Posts.updateOne({$and:[{_id:req.params.slug},{favorite:false}]},{$set:{favorite:true}},function(err,resposta){
                console.log("favoritado")
                res.redirect("/")
            })
        },
        unfavorite(req,res){
            Posts.updateOne({$and:[{_id:req.params.slug},{favorite:true}]},{$set:{favorite:false}},function(err,resposta){
                console.log("desfavoritado")
                res.redirect("/")
            })
            
        }

}

