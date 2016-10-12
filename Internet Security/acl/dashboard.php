<?php
    session_start();
	
	//echo var_dump($_SESSION);
	//echo isset($_SESSION['email']);
    
    //Redirect back to login if user isnt logged in
    if(!isset($_SESSION['email'])) {
        
        header('Location: form.php');
    }
    
    //Add check here to see if the account has the proper ACL
    //Modify ACL Levels, small radio buttons for Admin, Mod and User, on submit php file will parse and do updates, do not display self.
    //Also another form can delete accounts, other than admins, so we just wont display the admins.
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
              <a class="mdl-navigation__link" href="php/logout.php">Logout</a>
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
                    <tr>
                      <td class="mdl-data-table__cell--non-numeric">test@test.com</td>
                      <td class="mdl-data-table__cell--non-numeric">
                        <input type="radio" class="mdl-radio__button" name="user1" value="" checked />
                      </td>
                      <td class="mdl-data-table__cell--non-numeric">
                        <input type="radio" class="mdl-radio__button" name="user1" value="" />
                      </td>
                      <td class="mdl-data-table__cell--non-numeric">
                        <input type="radio" class="mdl-radio__button" name="user1" value="" />
                      </td>
                    </tr>
                    <tr>
                      <td class="mdl-data-table__cell--non-numeric">ye@test.com</td>
                      <td class="mdl-data-table__cell--non-numeric">
                        <input type="radio" class="mdl-radio__button" name="user2" value="" />
                      </td>
                      <td class="mdl-data-table__cell--non-numeric">
                        <input type="radio" class="mdl-radio__button" name="user2" value="" checked/>
                      </td>
                      <td class="mdl-data-table__cell--non-numeric">
                        <input type="radio" class="mdl-radio__button" name="user2" value="" />
                      </td>
                    </tr>
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
                    <tr>
                      <td class="mdl-data-table__cell--non-numeric">test@test.com</td>
                      <td class="mdl-data-table__cell--non-numeric">
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">
                          <i class="material-icons">delete_forever</i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="mdl-data-table__cell--non-numeric">ye@test.com</td>
                      <td class="mdl-data-table__cell--non-numeric">
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="callthedeleteajaxcall(withtheID)">
                          <i class="material-icons">delete_forever</i>
                        </button>
                      </td>
                    </tr>
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
                      <th>Total Attempts</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="mdl-data-table__cell--non-numeric">TIME</td>
                      <td class="mdl-data-table__cell--non-numeric">192.168.0.101</td>
                      <td class="mdl-data-table__cell--non-numeric">test@notturing.com</td>
                      <td class="mdl-data-table__cell--non-numeric">Bruteforce, Dictionary, Prior-Knowledge, XSS/SQLI</td>
                      <td class="mdl-data-table__cell--non-numeric">25</td>                      
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
                    <tr>
                      <td class="mdl-data-table__cell--non-numeric">TIME</td>
                      <td class="mdl-data-table__cell--non-numeric">192.168.0.101</td>
                      <td class="mdl-data-table__cell--non-numeric">test@notturing.com</td>
                      <td class="mdl-data-table__cell--non-numeric">Success, Failure</td>                   
                    </tr>
                  </tbody>
                </table>
                </div>
          </div>
        </div>
    </body>
</html>
