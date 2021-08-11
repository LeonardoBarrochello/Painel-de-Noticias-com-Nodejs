const Posts = require('../Posts.js')
module.exports = {
        favorite(req,res){
            console.log("chegou aq")
            Posts.updateOne({$and:[{_id:req.params.id},{favorite:false}]},{$set:{favorite:true}},function(err,resposta){
                console.log("favoritado")
                res.redirect("/")
            })
        },
        unfavorite(req,res){
            Posts.updateOne({$and:[{_id:req.params.id},{favorite:true}]},{$set:{favorite:false}},function(err,resposta){
                console.log("desfavoritado")
                res.redirect("/")
            })
            
        }

}

