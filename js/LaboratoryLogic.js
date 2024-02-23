const IngredientPattern = '<div id="ingredientPattern" class="ingredient my-1"><div class="buttonBlock"><button class="ingredientButtonUp ingredientButton"><img src="../images/arrow.png" class="arrowIcon"></button><button class="ingredientButtonDown ingredientButton"><img src="../images/arrow.png" class="arrowIcon"></button><img src="../images/trash.png" class="deleteIcon"></div><div class="ingredientTitle fs-5">Котлета</div><div class="ingredientPricing fs-5">15MDL</div></div>';
const PatternPattern = '<div id="cur" class="pattern py-1"><img src="../images/patternPreviewImg.png" class="patternIcon"><div class="patternInfo"><p class="burgTitle">мой шаблон 2</p><p class="burgWeight">300г</p><p class="burgPrice">70MDL</p></div><div class="me-2"><button class="patternButton deleteButton">удалить шаблон</button><button class="patternButton loadPattern">Выбрать шаблон</button></div></div>'

var ingredients = $("#ingredientsFloat").children();
var ingredientImages = ["BottomBun", "TopBun", "meat", "salad", "cheese", "tomato", "cucumber", "pickles", "ketchup", "onion", "bacon", "mayo", "mustard", "pepper", "jalapeno", "egg", "rukola", "basilik", "mushrooms", "tuna", "salami", "chicken"];
var ingredientTitles = ["котлета", "салат", "сыр", "помидоры", "огурцы", "корнишоны", "кетчуп", "лук", "бекон", "майонез", "горчица", "перец", "халапеньо", "яйцо", "рукола", "шпинат", "грибы", "рыбный стейк", "салями", "куриный стейк"];
var ingredientPrices = [15, 4, 7, 2, 1, 2, 2, 1, 20, 2, 2, 4, 2, 5, 4, 4, 4, 62, 4, 31];
var ingredientWeight = [187, 9, 8, 16, 9, 11, 5, 8, 23, 5, 5, 10, 6, 21, 4, 4, 12, 167, 8, 182];
var isIngredientTabOpen = false;

$(document).ready(function() {
    UpdateBurgerVisualisation();
    if(GetItemFromStorage("editPatternBurg")){
        var ingredientsHash = GetItemFromStorage("lastSelectedBurg").split(".");
        let i = 0;

        $("#ingredientsFloat").html("");
        for(i; i < ingredientsHash.length; i++){
            $("#ingredientsFloat").append(IngredientPattern);
            let currentObj = $("#ingredientPattern").removeAttr("id").attr("ingredientID", ingredientsHash[i]);

            currentObj.find(".ingredientTitle").html(ingredientTitles[parseInt(ingredientsHash[i]) - 2]);
            currentObj.find(".ingredientPricing").html(ingredientPrices[parseInt(ingredientsHash[i]) - 2] + "MDL");
        }

        UpdateBurgerVisualisation();

        AddItemToStorage("editPatternBurg", false);
    }

    //RemoveItemFromStorage("patternsBurg");
    $("#mainContent").html(GetItemFromStorage("patternsBurg"));
});

$(".ingredientItem").on("click", function(){
    let objTitle = $(this).find(".ingredientItemTitle").text();
    let objPricing = $(this).find(".ingredientItemPricing").text();

    $("#ingredientsFloat").prepend(IngredientPattern);
    let currentObj = $("#ingredientPattern").removeAttr("id", "ingredientPattern").attr("ingredientID", $(this).attr("ingredientID"));
    
    currentObj.find(".ingredientTitle").html(objTitle);
    currentObj.find(".ingredientPricing").html(objPricing);

    UpdateBurgerVisualisation();
});

$(".ingredientItemLarge").on("click", function(){
    let objTitle = $(this).find(".ingredientItemTitle").text();
    let objPricing = $(this).find(".ingredientItemPricing").text();

    $("#ingredientsFloat").prepend(IngredientPattern);
    let currentObj = $("#ingredientPattern").removeAttr("id", "ingredientPattern").attr("ingredientID", $(this).attr("ingredientID"));
    
    currentObj.find(".ingredientTitle").html(objTitle);
    currentObj.find(".ingredientPricing").html(objPricing);

    UpdateBurgerVisualisation();
});


$(".addIngredients").on("click", function(){
    if(!isIngredientTabOpen){
        $("#ingredientsMenu").removeAttr("style").attr("style", "translate: 0 0; opacity: 1;");
    }
    else{
        $("#ingredientsMenu").removeAttr("style").attr("style", "translate: -100% 0; opacity: 0;");
    }

    isIngredientTabOpen = !isIngredientTabOpen;
});

$("#closeWindow").on("click", function(){
    $("#ingredientsMenu").removeAttr("style").attr("style", "translate: -100% 0; opacity: 0;");

    isIngredientTabOpen = false;
});

//doesn't work for some reason xd
//Update: works now ^^
$("#ingredientsFloat").on("click", ".ingredientButtonUp", function(){
    ingredients = $("#ingredientsFloat").children();
    let currentObj = $(this).parent().parent().attr("id", "cur");

    let curTitle = currentObj.find(".ingredientTitle").text();
    let curPricing = currentObj.find(".ingredientPricing").text();
    let curIngID = currentObj.attr("ingredientID");

    let objAbove = currentObj;
    var i = 0;

    for(i; i < ingredients.length; i++){
        if($(ingredients[i]).attr("id")){
            break;
        }

        if(i == ingredients.length - 1){
            console.log("Did not find object above");
        }
    }

    $("#cur").removeAttr("id", "cur");

    if(i > 0){
        objAbove = $(ingredients[i - 1]);
    }
    else{
        objAbove = $(ingredients[ingredients.length - 1]);
    }

    let objAboveTitle = objAbove.find(".ingredientTitle").text();
    let objAbovePricing = objAbove.find(".ingredientPricing").text();
    let objAboveIngID = objAbove.attr("ingredientID");

    currentObj.find(".ingredientTitle").html(objAboveTitle);
    currentObj.find(".ingredientPricing").html(objAbovePricing);
    currentObj.attr("ingredientID", objAboveIngID);

    objAbove.find(".ingredientTitle").html(curTitle);
    objAbove.find(".ingredientPricing").html(curPricing);
    objAbove.attr("ingredientID", curIngID);

    UpdateBurgerVisualisation();
});



$("#ingredientsFloat").on("click", ".ingredientButtonDown", function(){
    ingredients = $("#ingredientsFloat").children();
    let currentObj = $(this).parent().parent().attr("id", "cur");

    let curTitle = currentObj.find(".ingredientTitle").text();
    let curPricing = currentObj.find(".ingredientPricing").text();
    let curIngID = currentObj.attr("ingredientID");

    let objAbove = currentObj;
    var i = 0;

    for(i; i < ingredients.length; i++){
        if($(ingredients[i]).attr("id")){
            break;
        }

        if(i == ingredients.length - 1){
            console.log("Did not find object below");
        }
    }

    $("#cur").removeAttr("id", "cur");

    if(i < ingredients.length - 1){
        objAbove = $(ingredients[i + 1]);
    }
    else{
        objAbove = $(ingredients[0]);
    }

    let objAboveTitle = objAbove.find(".ingredientTitle").text();
    let objAbovePricing = objAbove.find(".ingredientPricing").text();
    let objAboveIngID = objAbove.attr("ingredientID");

    currentObj.find(".ingredientTitle").html(objAboveTitle);
    currentObj.find(".ingredientPricing").html(objAbovePricing);
    currentObj.attr("ingredientID", objAboveIngID);

    objAbove.find(".ingredientTitle").html(curTitle);
    objAbove.find(".ingredientPricing").html(curPricing);
    objAbove.attr("ingredientID", curIngID);

    UpdateBurgerVisualisation();
});

$("#ingredientsFloat").on("click", ".deleteIcon", function(){
    $(this).parent().parent().remove();

    UpdateBurgerVisualisation();
});

$("#resetButton").on("click", function(){
    $("#ingredientsFloat").html("");

    UpdateBurgerVisualisation();
});

$("#saveButton").on("click", function(){
    let ingredients = $("#ingredientsFloat").children();
    let ingredientsHash = "";
    let patternName = $("#namePattern").val();
    let patternWeight = $("#weightInfo").text();
    let patternPrice = $("#priceInfo").text();
    let i = 0;

    for(i; i < ingredients.length; i++){
        ingredientsHash = ingredientsHash + $(ingredients[i]).attr("ingredientID");
        if(i != ingredients.length - 1){
            ingredientsHash += ".";
        }
    }

    $("#mainContent").append(PatternPattern);

    let curObj = $("#cur").removeAttr("id").attr("ingredientHash", ingredientsHash);
    curObj.find(".burgTitle").html(patternName);
    curObj.find(".burgWeight").html(patternWeight.toString());
    curObj.find(".burgPrice").html(patternPrice.toString());

    AddItemToStorage("patternsBurg", $("#mainContent").html());
});

$("#labPatternsMenu").on("click", ".deleteButton", function(){
    $(this).parent().parent().remove();
    AddItemToStorage("patternsBurg", $("#mainContent").html());
});

$("#labPatternsMenu").on("click", ".loadPattern", function(){
    let curObj = $(this).parent().parent();
    var ingredientsHash = $(curObj).attr("ingredientHash").split(".");
    let i = 0;

    $("#ingredientsFloat").html("");
    for(i; i < ingredientsHash.length; i++){
        $("#ingredientsFloat").append(IngredientPattern);
        let currentObj = $("#ingredientPattern").removeAttr("id").attr("ingredientID", ingredientsHash[i]);

        currentObj.find(".ingredientTitle").html(ingredientTitles[parseInt(ingredientsHash[i]) - 2]);
        currentObj.find(".ingredientPricing").html(ingredientPrices[parseInt(ingredientsHash[i]) - 2] + "MDL");
    }

    UpdateBurgerVisualisation();
});

function UpdateBurgerVisualisation(){
    let mainBurgContainer = $("#burgVisualisation").html("");
    ingredients = $("#ingredientsFloat").children();
    let i = ingredients.length - 1;
    let burgWeight = 20;
    let burgPrice = 20;

    mainBurgContainer.append('<img class="ingredientImage" id="image">');
    $("#image").attr("src", "../images/" + ingredientImages[0] + ".png").removeAttr("id", "image").attr("style", "bottom:" + 0 + "%;");
    for(i; i >= 0; i--){
        mainBurgContainer.append('<img class="ingredientImage" id="image">');
        $("#image").attr("src", "../images/" + ingredientImages[parseInt($(ingredients[i]).attr("ingredientID"))] + ".png").removeAttr("id", "image").attr("style", "top:" + ((i + 1) / (ingredients.length + 1) * 80).toString() + "%;");
        burgWeight += ingredientWeight[parseInt($(ingredients[i]).attr("ingredientID")) - 2];
        burgPrice += ingredientPrices[parseInt($(ingredients[i]).attr("ingredientID")) - 2];
    }
    mainBurgContainer.append('<img class="ingredientImage" id="image">');
    $("#image").attr("src", "../images/" + ingredientImages[1] + ".png").removeAttr("id", "image").attr("style", "top:" + 0 + "%;");
    $("#weightInfo").text(burgWeight + "г");
    $("#priceInfo").text(burgPrice + "MDL");
}