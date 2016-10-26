$("#resetform").submit(function(event) {

    var string1 = $("#password").val();
    var string2 = $("#passwordconf").val();

    if (string1 != string2)
        printError("Passwords are not the same");
    else {
        $.ajax({
            type: "POST",
            url: "php/reset.php",
            data: $("#resetform").serialize(),
            success: function(result) {
                console.log(result);
                if (result === "success")
                    location.href = "form.php#loginform-panel";
                else if (result === "pin") {
                    printError("Incorrect PIN, try again");
                } else
                    printError("An Error Occured");
            }
        });
    }

    event.preventDefault();
});

function printError(msg) {

    'use strict';
    var snackbarContainer = document.querySelector('#toast-error');
    var data = {
        message: msg
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);

}
