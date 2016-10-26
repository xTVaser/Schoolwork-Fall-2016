//Radio Buttons, if update to a user.
$("input[type='radio'].mdl-radio__button.acl_user").bind("click", function() {

    var id = this.name.split("-")[1];
    console.log(id);

    $.ajax({
        type: "POST",
        url: "php/updateacl.php",
        data: {
            userID: id,
            acl: 1
        },
        success: function(result) {
            console.log(result);
            //Nothing to do
        }
    });
});

//Radio Buttons, if update to a mod.
$("input[type='radio'].mdl-radio__button.acl_mod").bind("click", function() {

    var id = this.name.split("-")[1];
    console.log(id);

    $.ajax({
        type: "POST",
        url: "php/updateacl.php",
        data: {
            userID: id,
            acl: 2
        },
        success: function(result) {
            console.log(result);
            //Nothing to do
        }
    });
});

//Radio Buttons, if update to a mod.
$("input[type='radio'].mdl-radio__button.acl_admin").bind("click", function() {

    var id = this.name.split("-")[1];
    console.log(id);

    $.ajax({
        type: "POST",
        url: "php/updateacl.php",
        data: {
            userID: id,
            acl: 3
        },
        success: function(result) {
            console.log(result);
            //Nothing to do
        }
    });
});

//Radio Buttons, if update to an admin.
$("button.mdl-button.mdl-js-button.mdl-button--icon.mdl-button--colored.del-account").bind("click", function() {

    var id = this.name.split("-")[1];
    //console.log(id);

    $.ajax({
        type: "POST",
        url: "php/deleteaccount.php",
        data: {
            userID: id
        },
        success: function(result) {
            console.log(result);
            $(this).closest('tr').remove(); //Delete the table entry to seem interactive
        }
    });
});
