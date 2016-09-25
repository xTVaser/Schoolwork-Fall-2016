<?php
    session_start();
	
	//echo var_dump($_SESSION);
	//echo isset($_SESSION['email']);
    
    //Redirect back to login if user isnt logged in
    if(!isset($_SESSION['email'])) {
        
        header('Location: form.php');
    }
?>

<!doctype = HTML>
<html>
    <head>
        <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="https://code.getmdl.io/1.2.1/material.purple-yellow.min.css" /> 
        <link rel="stylesheet" href="styles.css">
        <script defer src="https://code.getmdl.io/1.2.1/material.min.js"></script>
        <meta charset="UTF-8">
        <title>Secure Login - Tyler Wilding</title>
    </head>
    <body>
        <div class="mdl-layout">
            Logged In
        </div>
        <script src="js/scripts.js"></script>
    </body>
</html>
