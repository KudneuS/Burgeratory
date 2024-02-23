const cartPattern = '<div class="cartItem" id="cur"><button class="deleteItem"></button><img src="../images/mushroomBurg.png" class="cartPreview"><div class="cartDescription"><p class="cartName">машрум</p><div class="cartNumber">кол: <input type="number" class="burgerNumber" placeholder="1" ></div><div class="cartPrice">цена: <p class="priceIndividual">70MDL</p></div><div class="totalCartPrice">итого: <p class="priceTotal">70MDL</p></div></div><button class="addCartButton">+</button><button class="removeCartButton">-</button></div>';
const toastLiveExample = document.getElementById('cartAnnouncement');
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

$(document).ready(function(){
    $("#cartItems").html(GetItemFromStorage("cartBurg"));

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
    let perPrice = $(this).parent().find(".priceIndividual").text();
    $(this).parent().find(".priceTotal").text((parseInt(perPrice.slice(0, perPrice.length - 3)) * value).toString() + "MDL");
    UpdateTotalPrice();
});

$("#cartItems").on("click", ".deleteItem", function(){
    $(this).parent().remove();

    UpdateTotalPrice();
});

$("#patternsMenu").on("click", ".addToCart", function(){
    let curObj = $(this).parent().parent();
    let burgTitle = $(curObj).find(".burgTitle").text();
    let burgPrice = $(curObj).find(".burgPrice").text();
    let burgImage = $(curObj).find(".patternIcon").attr("src");
    let burgHash = $(curObj).attr("ingredientHash").toString();
    let burgExistance = CheckIfHashExists(burgHash);

    if(burgExistance == -1){
        $("#cartItems").append(cartPattern);
        let curPattern = $("#cur").removeAttr("id").attr("ingredientHash", burgHash);
    
        $(curPattern).find(".cartName").text(burgTitle);
        $(curPattern).find(".priceIndividual").text(burgPrice);
        $(curPattern).find(".priceTotal").text(burgPrice);
        $(curPattern).find(".cartPreview").removeAttr("src").attr("src", burgImage);
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
        let perPrice = $(num[burgExistance]).find(".priceIndividual").text();
        $(num[burgExistance]).find(".priceTotal").text((parseInt(perPrice.slice(0, perPrice.length - 3)) * value).toString() + "MDL");
    }
    toastBootstrap.show();
    UpdateTotalPrice();
});

$("#mainBurgContent").on("click", ".addToCart", function(){
    let curObj = $(this).parent().parent().parent().parent();
    let burgTitle = $(curObj).find("#mainTitleBurg").text();
    let burgPrice = $(curObj).find("#mainPricing").text();
    let burgImageBuffer = $(curObj).find("#mainBurgImageContainer").attr("style");
    
    burgImageBuffer = burgImageBuffer.split(":")[1];
    burgImage = burgImageBuffer.slice(6, burgImageBuffer.length - 3);
    let burgHash = GetItemFromStorage("lastSelectedBurg");
    let burgExistance = CheckIfHashExists(burgHash);

    if(burgExistance == -1){
        $("#cartItems").append(cartPattern);
        let curPattern = $("#cur").removeAttr("id").attr("ingredientHash", burgHash);
    
        $(curPattern).find(".cartName").text(burgTitle);
        $(curPattern).find(".priceIndividual").text(burgPrice);
        $(curPattern).find(".priceTotal").text(burgPrice);
        $(curPattern).find(".cartPreview").removeAttr("src").attr("src", burgImage);
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
        let perPrice = $(num[burgExistance]).find(".priceIndividual").text();
        $(num[burgExistance]).find(".priceTotal").text((parseInt(perPrice.slice(0, perPrice.length - 3)) * value).toString() + "MDL");
    }
    toastBootstrap.show();
    UpdateTotalPrice();
});

$("#paymentButton").on("click", function(){
    let names = $(".cartName");
    let counts = $(".burgerNumber");
    let prices = $(".priceTotal");
    let i = 0;
    var items = [];

    for(i; i < names.length; i++){
        if($(counts[i]).val() != ""){
            items.push($(names[i]).text() + "." + $(counts[i]).val() + "." + $(prices[i]).text().slice(0, $(prices[i]).text().length - 3));
        }
        else{
            items.push($(names[i]).text() + ".1." + $(prices[i]).text().slice(0, $(prices[i]).text().length - 3));
        }
    }

    AddItemToStorage("checkoutList", items);
    $(location).attr("href","../pages/checkout.html");
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

    AddItemToStorage("cartBurg", $("#cartItems").html());
}