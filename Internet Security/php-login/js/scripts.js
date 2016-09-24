$("#loginform").submit(function(event) {
    $.ajax({
        type: "POST",
        url: "../php/login.php",
        data: $("#loginform").serialize(),
        success: function(result) {
            console.log(result);
            if(result === "")
                location.href = "../home.html";
        }
    });

    event.preventDefault();
});

$("#registerform").submit(function(event) {

    var string1 = $("#passwordReg").val();
    var string2 = $("#passwordRegConf").val();

    if(string1 != string2)
        alert("Passwords are not the same");
    else {
        $.ajax({
            type: "POST",
            url: "php/register.php",
            data: $("#registerform").serialize(),
            success: function(result) {
                console.log(result);
                //if(result === "")
                    //Print out a message saying account created
            }
        });
    }
    
    event.preventDefault();
});

