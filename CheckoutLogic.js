const billPattern = $("#billInfo").html();
$("#billInfo").html("");
var ingredientTitles = ["patty", "salad", "cheese", "tomato", "cucumber", "pickles", "ketchup", "onion", "bacon", "mayo", "mustard", "peper", "jalapeno", "egg", "arugula", "spinach", "mushrooms", "fish steak", "salami", "chicken steak"];
var items;
var totalPrice = 0;
var isCardMenuActive = false;
var order = "";
var isSuccess = false;

const serviceID = "service_6bhyrtj";
var templateID = "template_ljpkp6m";
emailjs.init({
    publicKey: "qL3138aBOsiTMbp-V",
});

$(document).ready(function(){
    items = GetItemFromStorage("checkoutList");
    let i = 0;
    $("#cardForm").slideUp(0);
    $("#billInfo").html("");
    for(i; i < items.length; i++){
        $("#billInfo").append(billPattern);

        let curObj = $("#cur").removeAttr("id").attr("ingredientHash", items[i].split(";")[1]);
        let properties = items[i].split(";")[0].split(".");
        let hash = items[i].split(";")[1].split(".");
        let ingredients = "";
        let j = 0;
        totalPrice += parseInt(properties[2]);

        $(curObj).find(".billItemTitle").text(properties[0]);
        $(curObj).find(".billItemCount").text("x"+properties[1]);
        $(curObj).find(".billItemPrice").text(properties[2] + "MDL");
        for(j; hash.length > j; j++){
            let addition = "";
            if(j != hash.length)
                addition = ", ";

            ingredients += ingredientTitles[parseInt(hash[j]) - 2] + addition;
        }
        
        order += properties[0] + " x" + properties[1] + " - " + properties[2] + "MDL ("+ ingredients +") <br />";
    }

    $("#totalPrice").text(totalPrice + "MDL");
});

$("#submitButton").on("click", function(){
    //RemoveItemFromStorage("checkoutList");
    //RemoveItemFromStorage("cartBurg");

    if(CheckFormValidation(1)){
        $("#formError1").removeAttr("class").attr("class", "errorMessage text-center fs-5 hidden trn")
        document.getElementById("secondPhase").scrollIntoView({ behavior: "smooth", block: "start"});
        //document.getElementById("secondPhase").scrollIntoView(true);
        FreezeYMovement(1100);
    }
    else{
        $("#formError1").removeAttr("class").attr("class", "errorMessage text-center fs-5 trn")
    }
});

$("#backButton").on("click", function(){
    document.getElementById("firstPhase").scrollIntoView({ behavior: "smooth", block: "end"});
    //document.getElementById("firstPhase").scrollIntoView(false);
    FreezeYMovement(1100);
});

$("#cardRadio").on("click", function(){
    if(isCardMenuActive)
        return;

    //$(this).parent().removeAttr("class").attr("class", "paymentMethod transparent");
    $("#cardForm").slideUp(0);
    setTimeout(function(){
        $("#cardForm").slideDown(500);
    }, 10);

    isCardMenuActive = true;
});

$("#nalRadio").on("click", function(){
    if(isCardMenuActive){
        //$("#cardRadio").parent().removeAttr("class").attr("class", "paymentMethod");
        $("#cardForm").slideDown(0);
        setTimeout(function(){
            $("#cardForm").slideUp(500);
        }, 10);

        isCardMenuActive = false;
    }
});

$("#cardInput").on("change input", function(){
    let input = $(this).val();
    input = input.replace(/\D/g, "");

    let formattedInput = input.match(/.{1,4}/g);
    if (formattedInput !== null) {
        formattedInput = formattedInput.join(' ');
    }

    $(this).val(formattedInput);
});

$("#cardExpiration").on("change input", function(){
    let input = $(this).val();
    input = input.replace(/\D/g, "");

    if(input.length == 1){
        if(parseInt(input) > 1){
            $(this).val("");
            return;
        }
    }
    else if(input.length == 2){
        if(parseInt(input) > 12){
            $(this).val(input[0]);
            return;
        }
    }
    else if(input.length == 3){
        if(parseInt(input[2]) != 2){
            $(this).val(input.slice(0, 2));
            return;
        }
    }
    else if(input.length == 4){
        if(parseInt(input.slice(2, 4)) < 24){
            input = input.slice(0, 3);
        }
    }

    let formattedInput = input.match(/.{1,2}/g);
    if (formattedInput !== null) {
        formattedInput = formattedInput.join('/');
    }

    $(this).val(formattedInput);
});

$("#cardCVV").on("change input", function(){
    $(this).val($(this).val().replace(/\D/g, ""));
});

$("#payButton").on("click", function(){
    if(!isCardMenuActive){
        $("#cardForm").html("");
    }

    if(!CheckFormValidation(2)){
        return;
    }

    //User email
    var messageTitle = "";
    var messageBody = "";
    var messageGreeting = "";
    if(GetItemFromStorage("langBurg") == "Ru"){
        messageGreeting = "Здравствуйте";
        messageTitle = "Спасибо за заказ!";
        messageBody = "<h1><b>Благодарим за ваш заказ!</b></h1>" + "<br />" +
        "<i>Вот информация о вашем заказе:</i>" + "<br />" +
        "Адрес: " + $("#adressInput").val() + 
        "<br />" + "Дом: " + $("#houseInput").val() + 
        "<br />" + "Квартира: " + $("#appartamentInput").val() + 
        "<br />" + "<h2>Ваш заказ:</h2>" + "<br />" + order + 
        "<br />" + "Если вы нашли какие-либо ошибки в ванем заказе дайте нам знать!" + "<br /><br />" +
        "<h3>С уважением, <br /> Команда Burgeratory</h3>";
    }
    else if(GetItemFromStorage("langBurg") == "Ro"){
        messageGreeting = "Bună ziua";
        messageTitle = "Vă mulțumim pentru comandă!";
        messageBody = "<h1><b>Vă mulțumim pentru comanda dumneavoastră!</b></h1>" + "<br />" +
        "<i>Informație despre comandă dvs:</i>" + "<br />" +
        "Adresă: " + $("#adressInput").val() + 
        "<br />" + "Casa: " + $("#houseInput").val() + 
        "<br />" + "Apartament: " + $("#appartamentInput").val() + 
        "<br />" + "<h2>Comanda dumneavoastră:</h2>" + "<br />" + order + 
        "<br />" + "Dacă găsiți erori în comanda dumneavoastră, vă rugăm să ne contactați!" + "<br /><br />" +
        "<h3>Cu sinceritate, <br /> Comanda Burgeratory</h3>";
    }
    else{
        messageGreeting = "Hello";
        messageTitle = "Thanks for your order!";
        messageBody = "<h1><b>Thanks for your order!</b></h1>" + "<br />" +
        "<i>Here's information about your order:</i>" + "<br />" +
        "Address: " + $("#adressInput").val() + 
        "<br />" + "House: " + $("#houseInput").val() + 
        "<br />" + "Apartment: " + $("#appartamentInput").val() + 
        "<br />" + "<h2>Your order:</h2>" + "<br />" + order + 
        "<br />" + "If you found any mistakes in your order please contact us!" + "<br /><br />" +
        "<h3>Sincerely, <br /> Team Burgeratory</h3>";
    }
    
    let params = {
        greeting: messageGreeting,
        name: $("#nameInput").val(),
        title: messageTitle,
        email: $("#emailInput").val(),
        message: messageBody
    }

	emailjs.send(serviceID, templateID, params).then(message => {
        if(GetItemFromStorage("langBurg") == "Ru"){
            swal("Успех!", "Спасибо за заказ!", "success");
        }
        else if(GetItemFromStorage("langBurg") == "Ro"){
            swal("Succes!", "Vă mulțumim pentru comandă!", "success");
        }
        else{
            swal("Success!", "Thanks for your order!", "success");
        }
        isSuccess = true;
        setInterval(function(){
            setInterval(CheckIfWindowClosed(), 100);
        }, 100)
    }).catch((error) => {
        if(GetItemFromStorage("langBurg") == "Ru"){
            swal("Ошибка!", "Что-то пошло не так...", "error");
        }
        else if(GetItemFromStorage("langBurg") == "Ro"){
            swal("Eroare!", "S-a întâmplat ceva în neregulă...", "error");
        }
        else{
            swal("Error!", "Something wrong has happened...", "error");
        }
    });

    //Technical email
    messageTitle = "New order!";
    messageBody = "<h1><b>New order:</b></h1>" + 
    "<br />" + "Name: " + $("#nameInput").val() + 
    "<br />" + "Surname: " + $("#familyInput").val() + 
    "<br />" + "Phone: " + $("#phoneInput").val() + 
    "<br />" + "Email: " + $("#emailInput").val() + 
    "<br />" + "Adress: " + $("#adressInput").val() + 
    "<br />" + "House: " + $("#houseInput").val() + 
    "<br />" + "Apartment: " + $("#appartamentInput").val() + "<br />" + "<h2><b>Order:</b></h2><br />" + order;

    if(isCardMenuActive)
        messageBody += "Payment: with card (payment successful)";
    else
        messageBody += "Payment: with money at recieving";

    params = {
        title: messageTitle,
        email: "burgercraft2@gmail.com",
        message: messageBody
    }
    templateID = "template_nxxroe8";

    emailjs.send(serviceID, templateID, params)

    document.getElementById("firstPhase").scrollIntoView(false);
})

function CheckIfWindowClosed(){
    if(isSuccess && $(".swal-overlay").css("opacity") == 0){
        RemoveItemFromStorage("checkoutList");
        RemoveItemFromStorage("cartBurg");
        TransitionToPage("../index.html");
    }
}

function FreezeYMovement(time){
    let style = $("body").attr("style");
    $("body").removeAttr("style").attr("style", style + " overflow-y: hidden;");

    setTimeout(function(){
        $("body").removeAttr("style").attr("style", style);
    }, time);
}

function CheckFormValidation(phase){
    if(phase == 1){
        if(CheckIfStringIsEmpty($("#nameInput").val())){return false}
        else if(CheckIfStringIsEmpty($("#familyInput").val())){return false}
        else if(CheckIfStringIsEmpty($("#phoneInput").val())){return false}
        else if(CheckIfStringIsEmpty($("#adressInput").val())){return false}
        else if(CheckIfStringIsEmpty( $("#emailInput").val())){return false}
        else if(CheckIfStringIsEmpty($("#houseInput").val())){return false}
        else if(CheckIfStringIsEmpty($("#appartamentInput").val())){return false}

        return true;
    }
    if(phase == 2){
        if(!$("#cardRadio").val && !("#nalRadio").val){return false}

        return true;
    }
}

function CheckIfStringIsEmpty(string){
    if(string == "")
        return true;
    else
        return false;
}