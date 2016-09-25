$("#loginform").submit(function(event) {
    $.ajax({
        type: "POST",
        url: "php/login.php",
        data: $("#loginform").serialize(),
        success: function(result) {
            //console.log(result);
            if(result === "success")
                location.href = "home.php";
            else if(result === "fail") {
                printError("Login Failed, Invalid Credentials!");
                $("#email").val('');
                $("#password").val('');
            }
            else if(result === "verify") {
                printError("That account is not verified, please check" + $("#email").val());
            }
        }
    });

    event.preventDefault();
});

$("#registerform").submit(function(event) {

    var string1 = $("#passwordReg").val();
    var string2 = $("#passwordRegConf").val();

    if(string1 != string2)
        printError("Passwords are not the same");
    else {
        $.ajax({
            type: "POST",
            url: "php/register.php",
            data: $("#registerform").serialize(),
            success: function(result) {
                //console.log(result);
                if(result === "success") {
                    printError("Account Created, Verify Email: " + $("#emailReg").val());
                }
                else if(result === "duplicate") {
                    printError("A user with that email already exists, try again");
                    $("#emailReg").val('');
                }
            }
        });
    }
    
    event.preventDefault();
});

$("#forgotform").submit(function(event) {

    $.ajax({
        type: "POST",
        url: "php/forgot.php",
        data: $("#forgotform").serialize(),
        success: function(result) {
            //console.log(result);
            if(result === "success") {
                printError("Reset link sent to: " + $("#emailforgot").val());
            }
            else if(result === "fail") {
                printError("No user with that email exists!");
                $("#emailReg").val('');
            }
            else 
                printError("An error occured");
        }
    });
    
    event.preventDefault();
});

function printError(msg) {

    'use strict';
    var snackbarContainer = document.querySelector('#toast-error');
    var data = {message: msg};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
    
}

