<?php

    session_start();

    //echo var_dump($_SESSION);
    //echo isset($_SESSION['email']);

    //Redirect back to login if user isnt logged in
    if (!isset($_SESSION['email'])) {
        header('Location: form.php');
    }

    $server = 'localhost';
    $user = 'tyler';
    $password = 'MR83ggJu';
    $db = 'tyler';

    try {
        $conn = new PDO("mysql:host=$server;dbname=$db;charset=utf8", $user, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo $select.'Error: '.$e->getMessage();
    }

    $aclQuery = $conn->prepare('SELECT acl FROM users WHERE email=:email');
    $aclQuery->bindParam(':email', $_SESSION['email']);
    $aclQuery->execute();
    $acl = $aclQuery->fetch(PDO::FETCH_ASSOC);

    $permFlag = $acl['acl'];

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
        <title>ACL Permissions - Tyler Wilding</title>
    </head>
    <body>
    <!-- Always shows a header, even in smaller screens. -->
        <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <header class="mdl-layout__header">
                <div class="mdl-layout__header-row">
                  <!-- Title -->
                  <span class="mdl-layout-title">ACL Website</span>
                  <!-- Add spacer, to align navigation to the right -->
                  <div class="mdl-layout-spacer"></div>
                  <!-- Navigation. We hide it in small screens. -->
                  <nav class="mdl-navigation mdl-layout--large-screen-only">
                    <?php
                        if ($permFlag == 3) {
                            printf('<a class="mdl-navigation__link" href="dashboard.php">Admin Dashboard</a>');
                        }
                    ?>
              <a class="mdl-navigation__link is-active" href="home.php">Comments</a>
              <a class="mdl-navigation__link" href="logout.php">Logout</a>
                  </nav>
                </div>
              </header>
          <div class="mdl-layout mdl" style="overflow:auto;">
                <div class="mdl-grid">
                    <div class="mdl-cell mdl-cell--12-col">
                        <h5>Post Comment...</h5>
                        <hr>
                        <form id="commentform" class="mdl-layout" method="POST">
                            <div class="mdl-textfield mdl-js-textfield">
                                <textarea class="mdl-textfield__input" maxlength="80" type="text" rows= "3" id="comment-body" ></textarea>
                                <label class="mdl-textfield__label" for="commentbody">Body...</label>
                              </div>
                            <div>
                                <button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" id="post-comment" name="<?php printf('%s', $_SESSION['email']); ?>">
                                    Post Comment
                                </button>
                            </div>
                        </form>
                    </div>
                  <?php

                    $commentsQuery = $conn->prepare('SELECT * FROM comments ORDER BY id DESC');
                    $commentsQuery->execute();
                    $comments = $commentsQuery->fetchAll();

                    foreach ($comments as $comment) {

                        //Comment body
                        printf('<div class="mdl-cell mdl-cell--4-col" id="commentCard-%s">', $comment['id']);
                        printf('<div class="demo-card-event mdl-card mdl-shadow--2dp">');
                        printf('<div class="mdl-card__title mdl-card--expand">');
                        printf('<h4>%s</h4></div>', htmlspecialchars($comment['comment_body']));

                        //Author
                        printf('<div class="mdl-card__actions mdl-card--border">');
                        printf('%s<div class="mdl-layout-spacer"></div>', htmlspecialchars($comment['author_name']));

                        //Delete Button
                        if ($permFlag == 2 || $permFlag == 3) {
                            printf('<button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored delete-comment" name="comment-%s">', $comment['id']);
                            printf('<i class="material-icons">delete_forever</i>');
                        }

                        printf('</button></div></div></div>');
                    }

                  ?>
                </div>
        </div>
    </body>
    <script src="js/homepage.js"></script>
</html>
