$(document).ready(function(){
    console.log("documento carregado")
    $("nav > i.fa-bars").on("click",function(){
        console.log("click")
        $(this).toggleClass("selected")
        $(this).next("i").toggleClass("selected")
        $(this).parent().find("ul").addClass("show")
    })
    $("nav > i.fa-times").on("click",function(){
        console.log("click")
        $(this).removeClass("selected")
        $(this).prev("i").removeClass("selected")
        $(this).parent().find("ul").removeClass("show")
    })
})
