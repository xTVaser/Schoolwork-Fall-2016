<?php
    session_start();
	
	//echo var_dump($_SESSION);
	//echo isset($_SESSION['email']);
    
    //Redirect back to login if user isnt logged in
    if(!isset($_SESSION['email'])) {
        
        header('Location: form.php');
    }
    
    $server = "localhost";
    $user = "tyler";
    $password = "MR83ggJu";
    $db = "tyler";
    
    try {
        $conn = new PDO("mysql:host=$server;dbname=$db;charset=utf8", $user, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $e) {
    
        echo $select . "Error: " . $e->getMessage();
    }
    
    $aclQuery = $conn->prepare("SELECT acl FROM users WHERE email=:email");
    $aclQuery->bindParam(":email", $_SESSION['email']);
    $aclQuery->execute();
    $acl = $aclQuery->fetch(PDO::FETCH_ASSOC);
    
    $permFlag = $acl['acl'];
    
    if($permFlag != 3) {
        header('Location: home.php');
    }
    
    //Getting all the users to use later on.
    $userQuery = $conn->prepare("SELECT * FROM users WHERE email!=:email ORDER BY email ASC");
    $userQuery->bindParam(":email", $_SESSION['email']);
    $userQuery->execute();
    $users = $userQuery->fetchAll();
    
    //Getting all the users to use later on.
    $attemptQuery = $conn->prepare("SELECT * FROM login_attempts ORDER BY timestamp DESC LIMIT 25");
    $attemptQuery->execute();
    $attempts = $attemptQuery->fetchAll();
    
    //TODO
    //Lastly, can view the information on past logins.
?>

<!doctype = HTML>
<html>
    <head>
        <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="https://code.getmdl.io/1.2.1/material.purple-yellow.min.css" /> 
        <script defer src="https://code.getmdl.io/1.2.1/material.min.js"></script>
        <link rel="stylesheet" href="styles.css">
        <meta charset="UTF-8">
        <title>Secure Login - Tyler Wilding</title>
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
                    <a class="mdl-navigation__link is-active" href="dashboard.php">Admin Dashboard</a>
              <a class="mdl-navigation__link" href="home.php">Comments</a>
              <a class="mdl-navigation__link" href="logout.php">Logout</a>
                  </nav>
                </div>
              </header>
          <div class="mdl-layout" style="overflow:auto;">
                <div>
                <h3>Modify ACL Permissions</h3>
                <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                  <thead>
                    <tr>
                      <th class="mdl-data-table__header--sorted-descending">E-Mail</th>
                      <th>User</th>
                      <th>Moderator</th>
                      <th>Admin</th>
                    </tr>
                  </thead>
                  <tbody>
                    <?php
                        foreach($users as $user) {
                            
                            printf("<tr><td class=\"mdl-data-table__cell--non-numeric\">");
                            printf("%s</td><td class=\"mdl-data-table__cell--non-numeric\">",$user['email']);
                            printf("<input type=\"radio\" class=\"mdl-radio__button acl_user\" name=\"user-%d\" value=\"\"", $user['id']);
                            if($user['acl'] == 1) {
                                printf(" checked");
                            }
                            printf(" /></td><td class=\"mdl-data-table__cell--non-numeric\">");
                            printf("<input type=\"radio\" class=\"mdl-radio__button acl_mod\" name=\"user-%d\" value=\"\"", $user['id']);
                            if($user['acl'] == 2) {
                                printf(" checked");
                            }
                            printf(" /></td><td class=\"mdl-data-table__cell--non-numeric\">");
                            printf("<input type=\"radio\" class=\"mdl-radio__button acl_admin\" name=\"user-%d\" value=\"\"", $user['id']);
                            if($user['acl'] == 3) {
                                printf(" checked");
                            }
                            printf(" /></td><td class=\"mdl-data-table__cell--non-numeric\">");
                            printf("</tr>");
                        
                        }
                    ?>
                  </tbody>
                </table>
                </div>
            <div>
                <h3>Delete Accounts</h3>
                <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                  <thead>
                    <tr>
                      <th class="mdl-data-table__header--sorted-descending">E-Mail</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <?php
                        foreach($users as $user) {
                            
                            if($user['acl'] == 3) { // Dont delete the admins
                                
                                continue;
                            }
                            
                            printf("<tr><td class=\"mdl-data-table__cell--non-numeric\">%s</td>", htmlspecialchars($user['email']));
                            printf("<td class=\"mdl-data-table__cell--non-numeric\">");
                            printf("<button class=\"mdl-button mdl-js-button mdl-button--icon mdl-button--colored del-account\" name=\"user-%d\">", $user['id']); //Button to delete user, probably needs an id
                            printf("<i class=\"material-icons\">delete_forever</i></button></td></tr>");
                        
                        }
                    ?>
                  </tbody>
                </table>
            </div>
            <div>
                <h3>Suspicious Login Attempts</h3>
                <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                  <thead>
                    <tr>
                      <th class="mdl-data-table__header--sorted-descending">Latest Timestamp</th>
                      <th>IP Address</th>
                      <th>Target E-Mail</th>
                      <th>Suspected Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="mdl-data-table__cell--non-numeric">TIME</td>
                      <td class="mdl-data-table__cell--non-numeric">192.168.0.101</td>
                      <td class="mdl-data-table__cell--non-numeric">test@notturing.com</td>
                      <td class="mdl-data-table__cell--non-numeric">Bruteforce, Dictionary, Prior-Knowledge, XSS/SQLI</td>                 
                    </tr>
                  </tbody>
                </table>
            </div>
            <div style="margin-bottom:50px">
                <h3>Past 25 Login Attempts</h3>
                <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                  <thead>
                    <tr>
                      <th class="mdl-data-table__header--sorted-descending">Timestamp</th>
                      <th>IP Address</th>
                      <th>E-Mail</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <?php
                        
                        foreach($attempts as $attempt) {
                        
                            printf("<tr><td class=\"mdl-data-table__cell--non-numeric\">%s</td>",$attempt['timestamp']);
                            printf("<td class=\"mdl-data-table__cell--non-numeric\">%s</td>",$attempt['ipaddr']);
                            printf("<td class=\"mdl-data-table__cell--non-numeric\">%s</td>",$attempt['email']);
                            printf("<td class=\"mdl-data-table__cell--non-numeric\">");
                            if($attempt['result'] == -1)
                                printf("Fail");
                            else if($attempt['result'] == 1)
                                printf("Success");
                            else
                                printf("Not Verfied");
                                
                            printf("</td></tr>");
                            
                        }
                        
                        //check if spamming un-verified account
                    ?>
                  </tbody>
                </table>
                </div>
          </div>
        </div>
    </body>
    <script src="js/dashboard.js"></script>
</html>
