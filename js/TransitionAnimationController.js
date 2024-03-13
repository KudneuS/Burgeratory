var animationDur = 600;
var animationOn = true;

$(document).ready(function(){
    $("#rightSlideAnimFore").attr("style", "translate: 100% 0");
    $("#rightSlideAnimBack").attr("style", "translate: 100% 0");
    $("#leftSlideAnimFore").attr("style", "translate: -100% 0");
    $("#leftSlideAnimBack").attr("style", "translate: -100% 0");

    setTimeout(function(){
        animationOn = false;
    }, animationDur);
});

$("body").on("click", ".transitionButton", function(){
    if(!animationOn & !$(this).attr("dis")){
        animationOn = true;
        let filePath = $(this).attr("iptl");
        $("#rightSlideAnimFore").attr("style", "translate: 0 0");
        $("#rightSlideAnimBack").attr("style", "translate: 0 0");
        $("#leftSlideAnimFore").attr("style", "translate: 0 0");
        $("#leftSlideAnimBack").attr("style", "translate: 0 0");
    
        setTimeout(function(){
            $(location).attr("href", filePath);
        }, animationDur);
    }
});