const cartPattern = $("#cartItems").html();
const NothingHereBlock = $("#nothingHere").html();
$("#cartItems").html("");
const toastLiveExample = document.getElementById('cartAnnouncement');
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

$(document).ready(function(){
    $("#cartItems").html(GetItemFromStorage("cartBurg"));

    RefreshLang();
    UpdateTotalPrice();
});

$("#cartItems").on("change", ".burgerNumber", function(){
    let value = $(this).val();

    if(value != ""){
        value = parseInt(value);
        if(value > 99){
            $(this).val(99);
        }
        else if(value < 1){
            $(this).val(1);
        }
    }
    else{
        $(this).val(1);
    }

    value = parseInt($(this).val());
    $(this).removeAttr("value").attr("value", value);
    let perPrice = $(this).parent().parent().find(".priceIndividual").text();
    $(this).parent().parent().find(".priceTotal").text((parseInt(perPrice.slice(0, perPrice.length - 3)) * value).toString() + "MDL");

    UpdateTotalPrice();
});

$("#cartItems").on("click", ".addCartButton", function(){
    let value = $(this).parent().find(".burgerNumber").val();
    if(value != ""){
        value = parseInt(value);
        if(value + 1 < 100){
            $(this).parent().find(".burgerNumber").val(parseInt(value) + 1);
        }
    }
    else{
        $(this).parent().find(".burgerNumber").val(2);
    }

    value = parseInt($(this).parent().find(".burgerNumber").val());
    $(this).parent().find(".burgerNumber").removeAttr("value").attr("value", value);
    let perPrice = $(this).parent().find(".priceIndividual").text();
    $(this).parent().find(".priceTotal").text((parseInt(perPrice.slice(0, perPrice.length - 3)) * value).toString() + "MDL");

    UpdateTotalPrice();
});

$("#cartItems").on("click", ".removeCartButton", function(){
    let value = $(this).parent().find(".burgerNumber").val();
    if(value != ""){
        value = parseInt(value);
        if(value - 1 > 0){
            $(this).parent().find(".burgerNumber").val(parseInt(value) - 1);
        }
    }
    else{
        $(this).parent().find(".burgerNumber").val(1);
    }

    value = parseInt($(this).parent().find(".burgerNumber").val());
    $(this).parent().find(".burgerNumber").removeAttr("value").attr("value", value);
    let perPrice = $(this).parent().find(".priceIndividual").text();
    $(this).parent().find(".priceTotal").text((parseInt(perPrice.slice(0, perPrice.length - 3)) * value).toString() + "MDL");
    UpdateTotalPrice();
});

$("#cartItems").on("click", ".deleteItem", function(){
    $(this).parent().remove();

    UpdateTotalPrice();
    RefreshLang();
});

$("#patternsMenu").on("click", ".addToCart", function(){
    let curObj = $(this).parent().parent();
    let burgTitle = $(curObj).find(".burgTitle").text();
    let burgPrice = $(curObj).find(".burgPrice").text();
    let burgImage = $(curObj).find(".patternIcon").html();
    let burgHash = $(curObj).attr("ingredientHash").toString();
    let burgExistance = CheckIfHashExists(burgHash);

    if(burgExistance == -1){
        $("#cartItems").append(cartPattern);
        let curPattern = $("#cur").removeAttr("id").attr("ingredientHash", burgHash);
    
        $(curPattern).find(".cartName").removeAttr("class").removeAttr("data-trn-key").attr("class", "cartName").text(burgTitle);
        $(curPattern).find(".priceIndividual").text(burgPrice);
        $(curPattern).find(".priceTotal").text(burgPrice);
        $(curPattern).find(".cartPreview").replaceWith("<div class='cartPreviewCustom'>" + burgImage + "</div>");
        $(curPattern).find(".burgIcon").removeAttr("style").attr("style", "height: 71px !important; width: 100% !important;");
    }
    else{
        var num = $(".cartItem");

        let value = $(num[burgExistance]).find(".burgerNumber").val();

        if(value != ""){
            value = parseInt(value);
            if(value + 1 > 99){
                $(num[burgExistance]).find(".burgerNumber").val(99);
            }
            else{
                $(num[burgExistance]).find(".burgerNumber").val(value + 1);
            }
        }
        else if(value == ""){   
            $(num[burgExistance]).find(".burgerNumber").val(2);
        }

        value = parseInt($(num[burgExistance]).find(".burgerNumber").val());
        $(num[burgExistance]).find(".burgerNumber").removeAttr("value").attr("value", value);
        let perPrice = $(num[burgExistance]).find(".priceIndividual").text();
        $(num[burgExistance]).find(".priceTotal").text((parseInt(perPrice.slice(0, perPrice.length - 3)) * value).toString() + "MDL");
    }
    toastBootstrap.show();
    setTimeout(function(){toastBootstrap.hide();}, 1000);
    UpdateTotalPrice();
});

$("#mainBurgContent").on("click", ".addToCart", function(){
    let lang = GetItemFromStorage("langBurg");
    ChangeLang("Ru");
    let curObj = $(this).parent().parent().parent().parent();
    let burgTitle = $(curObj).find("#mainTitleBurg").text();
    let burgPrice = $(curObj).find("#mainPricing").text();
    let customBurg = true;
    let burgImage;
    let burgImageBuffer = $(curObj).find("#mainBurgImageContainer").attr("style");
    if(burgImageBuffer == null)
        burgImage = $(curObj).find("#mainBurgImageContainer").html();
    else{
        burgImageBuffer = burgImageBuffer.split(":")[1];
        burgImage = burgImageBuffer.slice(6, burgImageBuffer.length - 3);
        customBurg = false;
    }
    ChangeLang(lang);
    
    let burgHash = GetItemFromStorage("lastSelectedBurg");
    let burgExistance = CheckIfHashExists(burgHash);

    if(burgExistance == -1){
        $("#cartItems").append(cartPattern);
        let curPattern = $("#cur").removeAttr("id").attr("ingredientHash", burgHash);
    
        $(curPattern).find(".cartName").text(burgTitle).attr("data-trn-key", burgTitle);
        $(curPattern).find(".priceIndividual").text(burgPrice);
        $(curPattern).find(".priceTotal").text(burgPrice);
        if(!customBurg)
            $(curPattern).find(".cartPreview").removeAttr("src").attr("src", burgImage);
        else{
            $(curPattern).find(".cartPreview").replaceWith("<div class='cartPreviewCustom'>" + burgImage + "</div>");
            $(curPattern).find(".burgIcon").removeAttr("style").attr("style", "height: 71px !important; width: 100% !important;");
        }
    }
    else{
        var num = $(".cartItem");

        let value = $(num[burgExistance]).find(".burgerNumber").val();

        if(value != ""){
            value = parseInt(value);
            if(value + 1 > 99){
                $(num[burgExistance]).find(".burgerNumber").val(99);
            }
            else{
                $(num[burgExistance]).find(".burgerNumber").val(value + 1);
            }
        }
        else if(value == ""){   
            $(num[burgExistance]).find(".burgerNumber").val(2);
        }

        value = parseInt($(num[burgExistance]).find(".burgerNumber").val());
        $(num[burgExistance]).find(".burgerNumber").removeAttr("value").attr("value", value);
        let perPrice = $(num[burgExistance]).find(".priceIndividual").text();
        $(num[burgExistance]).find(".priceTotal").text((parseInt(perPrice.slice(0, perPrice.length - 3)) * value).toString() + "MDL");
    }
    toastBootstrap.show();
    setTimeout(function(){toastBootstrap.hide();}, 1000);
    UpdateTotalPrice();
    RefreshLang();
});

$("#paymentButton").on("click", function(){
    if($(".cartName").length == 0){
        $("#paymentButton").attr("dis", true);
        return;
    }

    let names = $(".cartName");
    let counts = $(".burgerNumber");
    let prices = $(".priceTotal");
    let cartItems = $(".cartItem");
    let i = 0;
    var items = [];
    $("#paymentButton").removeAttr("dis");

    for(i; i < names.length; i++){
        if($(counts[i]).val() != ""){
            items.push($(names[i]).text() + "." + $(counts[i]).val() + "." + $(prices[i]).text().slice(0, $(prices[i]).text().length - 3) + ";" + $(cartItems[i]).attr("ingredientHash"));
        }
        else{
            items.push($(names[i]).text() + ".1." + $(prices[i]).text().slice(0, $(prices[i]).text().length - 3) + ";" + $(cartItems[i]).attr("ingredientHash"));
        }
    }
    
    AddItemToStorage("checkoutList", items);
});

function CheckIfHashExists(hash){
    var items = $(".cartItem");
    let i = 0;

    for(i; i < items.length; i++){
        if($(items[i]).attr("ingredientHash").toString() == hash){
            return i;
        }
    }

    return -1;
}

function UpdateTotalPrice(){
    var prices = $(".priceTotal");
    let i = 0;
    let totalPrice = 0;

    for(i; i < prices.length; i++){
        totalPrice += parseInt($(prices[i]).text().slice(0, $(prices[i]).text().length - 3));
    }

    $("#totalPrice").text(totalPrice + "MDL");
    if(totalPrice != 0){
        $("#nothingHereBlock").remove();
    }
    else{
        $("#cartItems").html($(NothingHereBlock).attr("id", "nothingHereBlock"));
    }

    $("#cartCount").text(prices.length);
    AddItemToStorage("cartBurg", $("#cartItems").html());
    RefreshLang();
}