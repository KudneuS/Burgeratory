<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $family = $_POST['family'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    $house = $_POST['house'];
    $apartment = $_POST['apartment'];

    $to = "burgercraft2@gmail.com";
    $subject = "New Order";
    $message = "Name: $name\n";
    $message .= "Family: $family\n";
    $message .= "Phone: $phone\n";
    $message .= "Address: $address\n";
    $message .= "House: $house\n";
    $message .= "Apartment: $apartment\n";

    $headers = "From: burgercraft2@gmail.com"; 
    if (mail($to, $subject, $message, $headers)) {
        echo "Your order has been received successfully.";
    } else {
        echo "Failed to send the order. Please try again later.";
    }
} else {
    echo "Invalid request";
}

?>
