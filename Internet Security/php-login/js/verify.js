$("#verifyform").submit(function(event) {
    $.ajax({
        type: "POST",
        url: "php/verify.php",
        data: $("#verifyform").serialize(),
        success: function(result) {
            console.log(result);
            if(result === "success")
                location.href = "form.php#loginform-panel";
            else if(result === "alreadyverified") {
                printError("That Account has Already been Verified!");
            }
            else if(result === "pin") {
                printError("Incorrect PIN, try again");
            }
            else
                printError("An Error Occured");
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
