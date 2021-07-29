const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const postSchema =  new Schema({
    title:String,
    category:String,
    content:String,
    imagem:String,
    slug:String,

},{collection:'post'})


var Posts = mongoose.model('Posts',postSchema)


module.exports = Posts;
