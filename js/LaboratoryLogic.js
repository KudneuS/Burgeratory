const IngredientPattern = $("#ingredientsFloat").html();
const PatternPattern = $("#mainContent").html();
const NothingHereTextBlock = $("#nothingHere").html();
const maxIngredientsLimit = 10;
$("#mainContent").html("");
$("#ingredientsFloat").html("");

var ingredients = $("#ingredientsFloat").children();
var ingredientImages = ["BottomBun", "TopBun", "meat", "salad", "cheese", "tomato", "cucumber", "pickles", "ketchup", "onion", "bacon", "mayo", "mustard", "pepper", "jalapeno", "egg", "rukola", "basilik", "mushrooms", "tuna", "salami", "chicken"];
var ingredientTitles = ["котлета", "салат", "сыр", "помидоры", "огурцы", "корнишоны", "кетчуп", "лук", "бекон", "майонез", "горчица", "перец", "халапеньо", "яйцо", "рукола", "шпинат", "грибы", "рыбный стейк", "салями", "куриный стейк"];
var ingredientPrices = [15, 4, 7, 2, 1, 2, 2, 1, 20, 2, 2, 4, 2, 5, 4, 4, 4, 62, 4, 31];
var ingredientWeight = [187, 9, 8, 16, 9, 11, 5, 8, 23, 5, 5, 10, 6, 21, 4, 4, 12, 167, 8, 182];
var isIngredientTabOpen = false;
var AnimationDuration = 300;
var isAnimating = false;

var deletionItem;
const deletePatternModal = new bootstrap.Modal(document.getElementById('deleteModal'), {
    keyboard: true
});

$(document).ready(function() {
    UpdateBurgerVisualisation();

    if(GetItemFromStorage("editPatternBurg")){
        var ingredientsHash = GetItemFromStorage("lastSelectedBurg").split(".");
        let i = 0;

        $("#ingredientsFloat").html("");
        $("#mainBurgVisualisation").html("");
        for(i; i < ingredientsHash.length; i++){
            $("#ingredientsFloat").append(IngredientPattern);
            let currentObj = $("#ingredientPattern").removeAttr("id").attr("ingredientID", ingredientsHash[i]);

            $("#mainBurgVisualisation").prepend('<img class="ingredientImage" id="image">');
            $("#image").attr("src", "../images/" + ingredientImages[parseInt(ingredientsHash[i])] + ".png").removeAttr("id", "image");

            currentObj.find(".ingredientTitle").html(ingredientTitles[parseInt(ingredientsHash[i]) - 2]);
            currentObj.find(".ingredientPricing").html(ingredientPrices[parseInt(ingredientsHash[i]) - 2] + "MDL");
        }

        UpdateBurgerVisualisation();

        AddItemToStorage("editPatternBurg", false);
    }

    //RemoveItemFromStorage("patternsBurg");
    $("#mainContent").html(GetItemFromStorage("patternsBurg"));
    if($(".pattern").length == 0){
        $("#mainContent").html($(NothingHereTextBlock).attr("id", "nothingHereBlock").attr("style", "height: 14em"));
    }
});

$(".ingredientItem").on("click", function(){
    if($("#ingredientsFloat").children().length >= maxIngredientsLimit || isAnimating){
        return;
    }

    let objTitle = $(this).find(".ingredientItemTitle").text();
    let objPricing = $(this).find(".ingredientItemPricing").text();
    let ingredientID = $(this).attr("ingredientID");

    $("#ingredientsFloat").prepend(IngredientPattern);
    let currentObj = $("#ingredientPattern").removeAttr("id", "ingredientPattern").attr("ingredientID", ingredientID);

    $("#mainBurgVisualisation").append('<img class="ingredientImage" id="image">');
    $("#image").attr("src", "../images/" + ingredientImages[parseInt(ingredientID)] + ".png").removeAttr("id", "image");
    
    currentObj.find(".ingredientTitle").html(objTitle);
    currentObj.find(".ingredientPricing").html(objPricing);

    UpdateBurgerVisualisation();
});

$(".ingredientItemLarge").on("click", function(){
    if($("#ingredientsFloat").children().length >= maxIngredientsLimit || isAnimating){
        return;
    }

    let objTitle = $(this).find(".ingredientItemTitle").text();
    let objPricing = $(this).find(".ingredientItemPricing").text();
    let ingredientID = $(this).attr("ingredientID");

    $("#ingredientsFloat").prepend(IngredientPattern);
    let currentObj = $("#ingredientPattern").removeAttr("id", "ingredientPattern").attr("ingredientID", ingredientID);
    
    $("#mainBurgVisualisation").append('<img class="ingredientImage" id="image">');
    $("#image").attr("src", "../images/" + ingredientImages[parseInt(ingredientID)] + ".png").removeAttr("id", "image");
    
    currentObj.find(".ingredientTitle").html(objTitle);
    currentObj.find(".ingredientPricing").html(objPricing);

    UpdateBurgerVisualisation();
});


$(".addIngredients").on("click", function(){
    if(isAnimating){
        return;
    }

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
    if(isAnimating){
        return;
    }

    isAnimating = true;
    ingredients = $("#ingredientsFloat").children();
    var images = $("#mainBurgVisualisation").children();
    let currentObj = $(this).parent().parent().attr("id", "cur");

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

    let curImage = $(images[images.length - i - 1]);
    
    let imageAbove = curImage;

    if(i > 0){
        objAbove = $(ingredients[i - 1]);
        imageAbove = $(images[images.length - i]);
    }
    else{
        return;
    }

    let curImageBottom = curImage.attr("style");
    let imageAboveBottom = imageAbove.attr("style");
    
    currentObj.attr("style", "translate: 0 -110%; transition: translate ease-in-out " + AnimationDuration.toString() + "ms");
    objAbove.attr("style", "translate: 0 110%; transition: translate ease-in-out " + AnimationDuration.toString() + "ms");
    curImage.attr("style", curImageBottom + "translate: 0 " + (Math.round(-100 + (images.length / (images.length + 1)) * 80)).toString() + "%; transition: translate ease-in " + (AnimationDuration / 2).toString() + "ms");
    imageAbove.attr("style", imageAboveBottom + "translate: 0 " + (Math.round(100 - (images.length / (images.length + 1)) * 80)).toString() + "%; transition: translate ease-in " + (AnimationDuration / 2).toString() + "ms");

    var interval1 = setInterval(function(){
        let srcBuffer = curImage.attr("src");
        curImage.attr("src", imageAbove.attr("src"));
        imageAbove.attr("src", srcBuffer);

        curImage.attr("style", curImageBottom + "translate: 0 0; transition: translate ease-out " + (AnimationDuration / 2).toString() + "ms");
        imageAbove.attr("style", imageAboveBottom + "translate: 0 0; transition: translate ease-out " + (AnimationDuration / 2).toString() + "ms");

        clearInterval(interval1);
    }, AnimationDuration / 2);

    var interval2 = setInterval(function(){
        curImage.attr("style", curImageBottom);
        imageAbove.attr("style", imageAboveBottom);
        currentObj.removeAttr("style");
        objAbove.removeAttr("style");
    
        let objAboveTitle = objAbove.find(".ingredientTitle").text();
        let objAbovePricing = objAbove.find(".ingredientPricing").text();
        let objAboveIngID = objAbove.attr("ingredientID");

        let curTitle = currentObj.find(".ingredientTitle").text();
        let curPricing = currentObj.find(".ingredientPricing").text();
        let curIngID = currentObj.attr("ingredientID");
    
        currentObj.find(".ingredientTitle").html(objAboveTitle);
        currentObj.find(".ingredientPricing").html(objAbovePricing);
        currentObj.attr("ingredientID", objAboveIngID);
    
        objAbove.find(".ingredientTitle").html(curTitle);
        objAbove.find(".ingredientPricing").html(curPricing);
        objAbove.attr("ingredientID", curIngID);
        isAnimating = false;

        clearInterval(interval2);
    }, AnimationDuration);
});



$("#ingredientsFloat").on("click", ".ingredientButtonDown", function(){
    if(isAnimating){
        return;
    }

    isAnimating = true;
    ingredients = $("#ingredientsFloat").children();
    var images = $("#mainBurgVisualisation").children();
    let currentObj = $(this).parent().parent().attr("id", "cur");

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

    let curImage = $(images[images.length - i - 1]);
    
    let imageAbove = curImage;

    if(i < ingredients.length - 1){
        objAbove = $(ingredients[i + 1]);
        imageAbove = $(images[images.length - i - 2]);
    }
    else{
        return;
    }

    let curImageBottom = curImage.attr("style");
    let imageAboveBottom = imageAbove.attr("style");

    currentObj.attr("style", "translate: 0 110%; transition: translate ease-in-out " + AnimationDuration.toString() + "ms");
    objAbove.attr("style", "translate: 0 -110%; transition: translate ease-in-out " + AnimationDuration.toString() + "ms");
    curImage.attr("style", curImageBottom + "translate: 0 " + (Math.round(100 - (images.length / (images.length + 1)) * 80)).toString() + "%; transition: translate ease-in " + (AnimationDuration / 2).toString() + "ms");
    imageAbove.attr("style", imageAboveBottom + "translate: 0 " + (Math.round(-100 + (images.length / (images.length + 1)) * 80)).toString() + "%; transition: translate ease-in " + (AnimationDuration / 2).toString() + "ms");

    var interval1 = setInterval(function(){
        let srcBuffer = curImage.attr("src");
        curImage.attr("src", imageAbove.attr("src"));
        imageAbove.attr("src", srcBuffer);

        curImage.attr("style", curImageBottom + "translate: 0 0; transition: translate ease-out " + (AnimationDuration / 2).toString() + "ms");
        imageAbove.attr("style", imageAboveBottom + "translate: 0 0; transition: translate ease-out " + (AnimationDuration / 2).toString() + "ms");

        clearInterval(interval1);
    }, AnimationDuration / 2);

    var interval2 = setInterval(function(){
        curImage.attr("style", curImageBottom);
        imageAbove.attr("style", imageAboveBottom);
        currentObj.removeAttr("style");
        objAbove.removeAttr("style");

        let objAboveTitle = objAbove.find(".ingredientTitle").text();
        let objAbovePricing = objAbove.find(".ingredientPricing").text();
        let objAboveIngID = objAbove.attr("ingredientID");

        let curTitle = currentObj.find(".ingredientTitle").text();
        let curPricing = currentObj.find(".ingredientPricing").text();
        let curIngID = currentObj.attr("ingredientID");
    
        currentObj.find(".ingredientTitle").html(objAboveTitle);
        currentObj.find(".ingredientPricing").html(objAbovePricing);
        currentObj.attr("ingredientID", objAboveIngID);
    
        objAbove.find(".ingredientTitle").html(curTitle);
        objAbove.find(".ingredientPricing").html(curPricing);
        objAbove.attr("ingredientID", curIngID);
        
        isAnimating = false;
        clearInterval(interval2);
    }, AnimationDuration);
    
    
});

$("#ingredientsFloat").on("click", ".deleteIcon", function(){
    if(isAnimating){
        return;
    }

    ingredients = $("#ingredientsFloat").children();
    var images = $("#mainBurgVisualisation").children();
    var i = 0;
    $(this).parent().parent().attr("id", "cur");
    
    for(i; i < ingredients.length; i++){
        if($(ingredients[i]).attr("id")){
            break;
        }

        if(i == ingredients.length - 1){
            console.log("Did not find object below");
        }
    }
    $(images[images.length - i - 1]).remove();
    $(this).parent().parent().remove();

    UpdateBurgerVisualisation();
});

$("#resetButton").on("click", function(){
    $("#ingredientsFloat").html("");
    $("#mainBurgVisualisation").html("");

    UpdateBurgerVisualisation();
});

$("#saveButton").on("click", function(){
    if(isAnimating){
        return;
    }

    let ingredients = $("#ingredientsFloat").children();
    let ingredientsHash = "";
    let patternName = $("#namePattern").val();
    let patternWeight = $("#weightInfo").text();
    let patternPrice = $("#priceInfo").text();
    let i = 0;

    if(patternName.replace(/\s/g, "") == ""){
        $("#nameError").removeAttr("class").attr("class", "errorMessage");
        return;
    }
    else{
        $("#nameError").removeAttr("class").attr("class", "errorMessage hidden");
    }

    if(ingredients.length == 0){
        $("#ingredientError").removeAttr("class").attr("class", "errorMessage");
        return;
    }
    else{
        $("#ingredientError").removeAttr("class").attr("class", "errorMessage hidden");
    }

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

    if($("#mainContent").children().length == 2){
        $("#nothingHereBlock").remove();
    }

    AddItemToStorage("patternsBurg", $("#mainContent").html());
});

$("#labPatternsMenu").on("click", ".deleteButton", function(){
    deletionItem = $(this).parent().parent();
    deletePatternModal.show();
});

$("#deleteButton").on("click", function(){
    deletionItem.remove();
    AddItemToStorage("patternsBurg", $("#mainContent").html());

    if($("#mainContent").children().length == 0){
        $("#mainContent").html($(NothingHereTextBlock).attr("id", "nothingHereBlock").attr("style", "height: 14em"));
    }
});

$("#labPatternsMenu").on("click", ".loadPattern", function(){
    let curObj = $(this).parent().parent();
    var ingredientsHash = $(curObj).attr("ingredientHash").split(".");
    let i = 0;

    $("#ingredientsFloat").html("");
    $("#mainBurgVisualisation").html("");
    for(i; i < ingredientsHash.length; i++){
        $("#ingredientsFloat").append(IngredientPattern);
        let currentObj = $("#ingredientPattern").removeAttr("id").attr("ingredientID", ingredientsHash[i]);

        $("#mainBurgVisualisation").prepend('<img class="ingredientImage" id="image">');
        $("#image").attr("src", "../images/" + ingredientImages[parseInt(ingredientsHash[i])] + ".png").removeAttr("id", "image");

        currentObj.find(".ingredientTitle").html(ingredientTitles[parseInt(ingredientsHash[i]) - 2]);
        currentObj.find(".ingredientPricing").html(ingredientPrices[parseInt(ingredientsHash[i]) - 2] + "MDL");
    }

    UpdateBurgerVisualisation();
});

function UpdateBurgerVisualisation(){
    let mainBurgContainer = $("#mainBurgVisualisation").children();
    let ingredients = $("#ingredientsFloat").children();
    let i = 0;
    let burgWeight = 20;
    let burgPrice = 20;

    for(i; i < mainBurgContainer.length; i++){
        $(mainBurgContainer[i]).attr("style", "bottom:" + ((i + 1) / (ingredients.length + 1) * 80).toString() + "%;");
        burgWeight += ingredientWeight[parseInt($(ingredients[i]).attr("ingredientID")) - 2];
        burgPrice += ingredientPrices[parseInt($(ingredients[i]).attr("ingredientID")) - 2];
    }
    $("#weightInfo").text(burgWeight + "g");
    $("#priceInfo").text(burgPrice + "MDL");
    $("#mainIngredientsTitle").html("<div class='d-inline trn'>ингредиенты:</div> (" + ingredients.length.toString() + "/" + maxIngredientsLimit.toString() + ")");
    RefreshLang();
}