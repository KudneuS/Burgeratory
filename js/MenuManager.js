const SelectingMenu = $("#mainBurgContent").html();
const BigShowcaseMenu = $("#descriptionTab").html();
const NothingHereText = $("#nothingHere").html();
$("#descriptionTab").remove();
var timeout = 300;

$(document).ready(function(){
    //AnimateMainMenuEnabled();
    AddItemToStorage("editPatternBurg", false);

    $("#privatePatterns").html(GetItemFromStorage("patternsBurg"));
    $(".deleteButton").text('добавить в корзину').removeAttr("class", "deleteButton").removeAttr("data-trn-key").attr("class", "patternButton addToCart trn");
    
    if($("#privatePatterns").children().length == 0){
        $("#privatePatterns").html($(NothingHereText).attr("style", "height: 12em;"));
    }

    RefreshLang();
});

$("#mainBurgContent").on("click", ".mainPreviewPattern", function(){
    let lang = GetItemFromStorage("langBurg");
    ChangeLang("Ru");
    let burgImage = $(this).find(".mainImagePattern").attr("src");
    let burgTitle = $(this).find(".burgTitle").text();
    let burgWeight = $(this).find(".burgWeight").text();
    let burgPrice = $(this).find(".burgPrice").text();
    let patternHash = $(this).attr("ingredientHash");
    AddItemToStorage("lastSelectedBurg", patternHash);
    ChangeLang(lang);

    AnimateMainMenuDisabled();
    
    setTimeout(function(){
        $("#mainBurgContent").removeAttr("style", "flex-direction").html(BigShowcaseMenu);

        $("#mainTitleBurg").html(burgTitle);
        let desc = burgWeight + "<br />" + ParsePatternHash(patternHash);
        $("#description").html(desc);
        $("#mainPricing").html(burgPrice);
    
        $("#mainBurgImageContainer").attr("style", "background-image: url('" + burgImage + "');");
        RefreshLang();

        AnimateMainMenuEnabled();
    }, timeout + 10);
});

$("#mainBurgContent").on("click", "#closeWindowMenu", function(){
    AnimateMainMenuDisabled();

    setTimeout(function(){
        $("#mainBurgContent").attr("style", "background: none; padding-top: 0 !important; padding-bottom: 0 !important; flex-direction: row !important;").html(SelectingMenu);
        
        RefreshLang();
        AnimateMainMenuEnabled();
    }, timeout + 10);
});

$("#patternsMenu").on("click", ".loadPattern", function(){
    let burgImage = $(this).parent().parent().find(".patternIcon").attr("src");
    let burgTitle = $(this).parent().parent().find(".burgTitle").text();
    let burgWeight = $(this).parent().parent().find(".burgWeight").text();
    let burgPrice = $(this).parent().parent().find(".burgPrice").text();
    let patternHash = $(this).parent().parent().attr("ingredientHash");
    AddItemToStorage("lastSelectedBurg", patternHash);

    AnimateMainMenuDisabled();
    
    setTimeout(function(){
        $("#mainBurgContent").removeAttr("style").html(BigShowcaseMenu);

        $("#mainTitleBurg").html(burgTitle);
        let desc = burgWeight + "<br />" + ParsePatternHash(patternHash);
        $("#description").html(desc);
        $("#mainPricing").html(burgPrice);
    
        $("#mainBurgImageContainer").attr("style", "background-image: url('" + burgImage + "');");

        RefreshLang();
        AnimateMainMenuEnabled();
    }, timeout + 10);
});

$("#mainBurgContent").on("click", "#editPattern", function(){
    AddItemToStorage("editPatternBurg", true);
});

function ParsePatternHash(patternHash){
    console.log(patternHash);
    let ingredients = "<div class='trn d-inline'>булочка Бриошь</div>, ";
    let prevIngredients = "";
    let i = 0;
    var ingredientsList = patternHash.split(".");

    for(i; i < ingredientsList.length; i++){
        switch(parseInt(ingredientsList[i])){
            case 2:
                if(!ingredients.includes("<div class='trn d-inline'>котлета из выдержанной говядины</div>")){
                    ingredients += "<div class='trn d-inline'>котлета из выдержанной говядины</div>";
                }
                break;
            case 3:
                if(!ingredients.includes("<div class='trn d-inline'>салат айсберг</div>")){
                    ingredients += "<div class='trn d-inline'>салат айсберг</div>";
                }
                break;
            case 4:
                if(!ingredients.includes("<div class='trn d-inline'>американский Чеддер</div>")){
                    ingredients += "<div class='trn d-inline'>американский Чеддер</div>";
                }
                break;
            case 5:
                if(!ingredients.includes("<div class='trn d-inline'>помидоры</div>")){
                    ingredients += "<div class='trn d-inline'>помидоры</div>";
                }
                break;
            case 6:
                if(!ingredients.includes("<div class='trn d-inline'>корнишоны</div>")){
                    ingredients += "<div class='trn d-inline'>солёные огурцы</div>";
                }
                break;
            case 7:
                if(!ingredients.includes("<div class='trn d-inline'>свежие огурцы</div>")){
                    ingredients += "<div class='trn d-inline'>свежие огурцы</div>";
                }
                break;
            case 8:
                if(!ingredients.includes("<div class='trn d-inline'>кетчуп</div>")){
                    ingredients += "<div class='trn d-inline'>кетчуп</div>";
                }
                break;
            case 9:
                if(!ingredients.includes("<div class='trn d-inline'>лук</div>")){
                    ingredients += "<div class='trn d-inline'>лук</div>";
                }
                break;
            case 10:
                if(!ingredients.includes("<div class='trn d-inline'>бекон</div>")){
                    ingredients += "<div class='trn d-inline'>бекон</div>";
                }
                break;
            case 11:
                if(!ingredients.includes("<div class='trn d-inline'>майонез</div>")){
                    ingredients += "<div class='trn d-inline'>майонез</div>";
                }
                break;
            case 12:
                if(!ingredients.includes("<div class='trn d-inline'>горчица</div>")){
                    ingredients += "<div class='trn d-inline'>горчица</div>";
                }
                break;
            case 13:
                if(!ingredients.includes("<div class='trn d-inline'>перец</div>")){
                    ingredients += "<div class='trn d-inline'>перец</div>";
                }
                break;
            case 14:
                if(!ingredients.includes("<div class='trn d-inline'>халапеньо</div>")){
                    ingredients += "<div class='trn d-inline'>халапеньо</div>";
                }
                break;
            case 15:
                if(!ingredients.includes("<div class='trn d-inline'>яйцо</div>")){
                    ingredients += "<div class='trn d-inline'>яйцо</div>";
                }
                break;
            case 16:
                if(!ingredients.includes("<div class='trn d-inline'>рукола</div>")){
                    ingredients += "<div class='trn d-inline'>рукола</div>";
                }
                break;
            case 17:
                if(!ingredients.includes("<div class='trn d-inline'>шпинат</div>")){
                    ingredients += "<div class='trn d-inline'>шпинат</div>";
                }
                break;
            case 18:
                if(!ingredients.includes("<div class='trn d-inline'>грибы</div>")){
                    ingredients += "<div class='trn d-inline'>грибы</div>";
                }
                break;
            case 19:
                if(!ingredients.includes("<div class='trn d-inline'>рыбный стейк</div>")){
                    ingredients += "<div class='trn d-inline'>рыбный стейк</div>";
                }
                break;
            case 20:
                if(!ingredients.includes("<div class='trn d-inline'>салями</div>")){
                    ingredients += "<div class='trn d-inline'>салями</div>";
                }
                break;
            case 21:
                if(!ingredients.includes("<div class='trn d-inline'>куриный стейк</div>")){
                    ingredients += "<div class='trn d-inline'>куриный стейк</div>";
                }
                break;
        }

        if(i != ingredientsList.length - 1  & prevIngredients != ingredients){
            ingredients += ", ";
        }
        else if(i == ingredientsList.length - 1){
            if(ingredients.includes(",", ingredients.length - 2)){
                ingredients = ingredients.slice(0, ingredients.length - 2);
            }
            ingredients += ".";
        }

        prevIngredients = ingredients;
    }
    return ingredients;
}

//animation

function AnimateMainMenuEnabled(){
    //$("#mainBurgContent").slideUp(0).slideDown(timeout);
    $("#mainBurgContent").animate({
        opacity: "toggle",
    }, 0);
    
    $("#mainBurgContent").animate({
        opacity: "toggle",
    }, timeout);
    
}

function AnimateMainMenuDisabled(){
    //$("#mainBurgContent").slideDown(0).slideUp(timeout);
    $("#mainBurgContent").animate({
        opacity: "toggle",
    }, timeout);
}