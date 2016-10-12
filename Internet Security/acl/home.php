<?php
    session_start();
	
	//echo var_dump($_SESSION);
	//echo isset($_SESSION['email']);
    
    //Redirect back to login if user isnt logged in
    if(!isset($_SESSION['email'])) {
        
        header('Location: form.php');
    }
    
    //Only display admin dashboard link if the account logged in is an admin
    //Likewise, only display the deletion buttons and such if the acconut logged in is a moderator/admin
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
        <!-- Always shows a header, even in smaller screens. -->
        <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
          <div class="mdl-layout__drawer">
            <span class="mdl-layout-title">ACL Website</span>
            <nav class="mdl-navigation">
              <a class="mdl-navigation__link" href="dashboard.php">Admin Dashboard</a>
              <a class="mdl-navigation__link is-active" href="home.php">Comments</a>
              <a class="mdl-navigation__link" href="php/logout.php">Logout</a>
            </nav>
          </div>
          <main class="mdl-layout__content">
            <div class="page-content">Lorem Ipsum Dolar</div>
          </main>
        </div>
    </body>
</html>
