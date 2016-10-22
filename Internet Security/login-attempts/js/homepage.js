//Post a new comment
$("#post-comment").bind("click", function(){
 
    var body = $("#comment-body").val();
    var author = this.name;
    console.log(author);
    console.log(body);
    
    if(body == "" || author == "") {
        return;
    }
    
    $.ajax({
        type: "POST",
        url: "php/postcomment.php",
        data: { body : body,
                author: author
              },
        success: function(result) {
            console.log(result);
            location.href = "home.php";
        }
    });
});

//Delete Comment
$("button.mdl-button.mdl-js-button.mdl-button--icon.mdl-button--colored.delete-comment").bind("click", function(){
 
    var id = this.name.split("-")[1];
    console.log(id);
    
    $.ajax({
        type: "POST",
        url: "php/deletecomment.php",
        data: { id : id },
        success: function(result) {
            console.log(result);
            var div = $("#commentCard-"+id);
            div.remove();
        }
    });
});




