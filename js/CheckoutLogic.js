const billPattern = '<div class="billItem" id="cur"><div><p class="billItemTitle">машрум</p><p class="billItemCount">x1</p></div><p class="billItemPrice">60</p></div>';
var items;
var totalPrice = 0;

$(document).ready(function(){
    items = GetItemFromStorage("checkoutList");
    let i = 0;
    $("#billInfo").html("");

    for(i; i < items.length; i++){
        $("#billInfo").append(billPattern);

        let curObj = $("#cur").removeAttr("id");
        let properties = items[i].split(".");
        totalPrice += parseInt(properties[2]);

        $(curObj).find(".billItemTitle").text(properties[0]);
        $(curObj).find(".billItemCount").text("x"+properties[1]);
        $(curObj).find(".billItemPrice").text(properties[2] + "MDL");
    }

    $("#totalPrice").text(totalPrice + "MDL");
});

$("#submitButton").on("click", function(){
    RemoveItemFromStorage("checkoutList");
    RemoveItemFromStorage("cartBurg");
});