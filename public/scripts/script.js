function removeClass(element,time,nameclass){
    setTimeout(
        function(){
            element.removeClass(nameclass)
        },time
)

}
$(document).ready(function(){
    console.log("documento carregado")
    /* MENU SCRIPT */
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
    /* FAVORITE OPTION SCRIPT */
    $(document).on("click",".unfavorite",function(){
        removeClass($(this).parent().prev("#speech-bubble"),3000,'show')
        $(this).prev("#speech-bubble").addClass("show")
        $(this).next(".favorited").show()
        $(this).hide()
    })
    $(document).on("click",".favorited",function(){
        $(this).prev(".unfavorite").show()
        $(this).hide()
    })
    
})
