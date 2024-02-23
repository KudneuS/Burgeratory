const SelectingMenu = $("#mainBurgContent").html();
const BigShowcaseMenu = '<div class="row position-relative h-100"><div id="mainTitleBurg" class="fs-1 ms-3 w-100">Машрум</div><div class="col-6 col-lg-8"><div id="mainBurgImage"><p id="mainPricing" class="fs-5">74MDL</p><div id="mainBurgImageContainer"></div></div></div><div class="col-6 col-lg-4"><div id="mainBurgDescription"><div id="mainTitleDesc" class="fs-2">Описание:</div><p id="description">340 гр. <br />Булочка Бриошь, котлета из выдержаннойговядины, американский Чеддер, помидоры,корнишоны, грибы демиглас, салат айсберг,луковый мармелад, фирменный соус Торро.</p><div id="burgButtons"><button class="burgButton addToCart">добавить в корзину</button><button class="burgButton" id="editPattern">редактировать шаблон</button></div></div></div><div id="closeWindowMenu" class="fs-3">x</div></div>';
var timeout = 300;

$(document).ready(function(){
    AnimateMainMenuEnabled();
    AddItemToStorage("editPatternBurg", false);

    $("#privatePatterns").html(GetItemFromStorage("patternsBurg"));
    $(".deleteButton").html('добавить в корзину').removeAttr("class", "deleteButton").attr("class", "patternButton addToCart");
});

$("#mainBurgContent").on("click", ".mainPreviewPattern", function(){
    let burgImage = $(this).find(".mainImagePattern").attr("src");
    let burgTitle = $(this).find(".burgTitle").text();
    let burgWeight = $(this).find(".burgWeight").text();
    let burgPrice = $(this).find(".burgPrice").text();
    let patternHash = $(this).attr("ingredientHash");
    AddItemToStorage("lastSelectedBurg", patternHash);

    AnimateMainMenuDisabled();
    
    setTimeout(function(){
        $("#mainBurgContent").removeAttr("style", "flex-direction").html(BigShowcaseMenu);

        $("#mainTitleBurg").html(burgTitle);
        $("#description").html(burgWeight + "<br />" + ParsePatternHash(patternHash));
        $("#mainPricing").html(burgPrice);
    
        $("#mainBurgImageContainer").attr("style", "background-image: url('" + burgImage + "');");

        AnimateMainMenuEnabled();
    }, timeout);
});

$("#mainBurgContent").on("click", "#closeWindowMenu", function(){
    AnimateMainMenuDisabled();

    setTimeout(function(){
        $("#mainBurgContent").attr("style", "background: none; padding-top: 0 !important; padding-bottom: 0 !important; flex-direction: row !important;").html(SelectingMenu);
        AnimateMainMenuEnabled();
    }, timeout);
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
        $("#description").html(burgWeight + "<br />" + ParsePatternHash(patternHash));
        $("#mainPricing").html(burgPrice);
    
        $("#mainBurgImageContainer").attr("style", "background-image: url('" + burgImage + "');");

        AnimateMainMenuEnabled();
    }, timeout);
});

$("#mainBurgContent").on("click", "#editPattern", function(){
    AddItemToStorage("editPatternBurg", true);
    $(location).attr("href","../pages/lab.html");
});

function ParsePatternHash(patternHash){
    console.log(patternHash);
    let ingredients = "булочка Бриошь, ";
    let prevIngredients = "";
    let i = 0;
    var ingredientsList = patternHash.split(".");

    for(i; i < ingredientsList.length; i++){
        switch(parseInt(ingredientsList[i])){
            case 2:
                if(!ingredients.includes("котлета из выдержанной говядины")){
                    ingredients += "котлета из выдержанной говядины";
                }
                break;
            case 3:
                if(!ingredients.includes("салат айсберг")){
                    ingredients += "салат айсберг";
                }
                break;
            case 4:
                if(!ingredients.includes("американский Чеддер")){
                    ingredients += "американский Чеддер";
                }
                break;
            case 5:
                if(!ingredients.includes("помидоры")){
                    ingredients += "помидоры";
                }
                break;
            case 6:
                if(!ingredients.includes("корнишоны")){
                    ingredients += "корнишоны";
                }
                break;
            case 7:
                if(!ingredients.includes("свежие огурцы")){
                    ingredients += "свежие огурцы";
                }
                break;
            case 8:
                if(!ingredients.includes("кетчуп")){
                    ingredients += "кетчуп";
                }
                break;
            case 9:
                if(!ingredients.includes("лук")){
                    ingredients += "лук";
                }
                break;
            case 10:
                if(!ingredients.includes("бекон")){
                    ingredients += "бекон";
                }
                break;
            case 11:
                if(!ingredients.includes("майонез")){
                    ingredients += "майонез";
                }
                break;
            case 12:
                if(!ingredients.includes("горчица")){
                    ingredients += "горчица";
                }
                break;
            case 13:
                if(!ingredients.includes("перец")){
                    ingredients += "перец";
                }
                break;
            case 14:
                if(!ingredients.includes("халапеньо")){
                    ingredients += "халапеньо";
                }
                break;
            case 15:
                if(!ingredients.includes("яйцо")){
                    ingredients += "яйцо";
                }
                break;
            case 16:
                if(!ingredients.includes("рукола")){
                    ingredients += "рукола";
                }
                break;
            case 17:
                if(!ingredients.includes("шпинат")){
                    ingredients += "шпинат";
                }
                break;
            case 18:
                if(!ingredients.includes("грибы")){
                    ingredients += "грибы";
                }
                break;
            case 19:
                if(!ingredients.includes("рыбный стейк")){
                    ingredients += "рыбный стейк";
                }
                break;
            case 20:
                if(!ingredients.includes("салями")){
                    ingredients += "салями";
                }
                break;
            case 21:
                if(!ingredients.includes("куриный стейк")){
                    ingredients += "куриный стейк";
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
    $("#mainBurgContent").slideUp(0).slideDown(timeout);
}

function AnimateMainMenuDisabled(){
    $("#mainBurgContent").slideDown(0).slideUp(timeout);
}