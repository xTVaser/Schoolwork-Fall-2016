<?php
    session_start();

	//echo var_dump($_SESSION);
	//echo isset($_SESSION['email'])
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
        <title>Access Control Levels - Tyler Wilding</title>
    </head>
    <body>
        <div class="mdl-layout" id="container">
            <div class="mdl-cell mdl-cell--4-col">
                <div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
                    <div class="mdl-tabs__tab-bar">
                        <a href="#loginform-panel" class="mdl-tabs__tab is-active">Login</a>
                        <a href="#registerform-panel" class="mdl-tabs__tab">Register</a>
                        <a href="#forgot-panel" class="mdl-tabs__tab">Forgot Password</a>
                    </div>

                    <div class="mdl-tabs__panel is-active mdl-layout" id="loginform-panel">
                        <form id="loginform" class="mdl-layout" method="POST">
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input class="mdl-textfield__input" type="text" id="email" name="email" required>
                                <label class="mdl-textfield__label" for="email">Email...</label>
                            </div>
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input class="mdl-textfield__input" type="password" id="password" name="password" required>
                                <label class="mdl-textfield__label" for="password">Password...</label>
                            </div>
                            <div>
                                <button type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="mdl-tabs__panel mdl-layout" id="registerform-panel">
                        <form id="registerform" class="mdl-layout" action="php/register.php" method="POST">
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input class="mdl-textfield__input" type="text" id="emailReg" name="emailReg" pattern="[\S]+[@][\S]+[.][\S]+" required>
                                <label class="mdl-textfield__label" for="emailReg">Email...</label>
                                <span class="mdl-textfield__error">Not a Valid Email!</span>
                            </div>
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input class="mdl-textfield__input" type="password" id="passwordReg" name="passwordReg" pattern="^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9]{8,}$" required>
                                <label class="mdl-textfield__label" for="passwordReg">Password...</label>
                                <span class="mdl-textfield__error">Atleast 8 Characters with 1 Digit and 1 Uppercase!</span>
                            </div>
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" id="passwordRegDiv">
                                <input class="mdl-textfield__input" type="password" id="passwordRegConf" required>
                                <label class="mdl-textfield__label" for="passwordRegConf">Re-Enter Password...</label>
                            </div>
                            <div>
                                <button type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="mdl-tabs__panel" id="forgot-panel">
                        <form id="forgotform" class="mdl-layout" action="php/forgot.php" method="POST">
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input class="mdl-textfield__input" type="text" id="emailforgot" name="emailforgot" pattern="[\S]+[@][\S]+[.][\S]+" required>
                                <label class="mdl-textfield__label" for="emailforgot">Email...</label>
                                <span class="mdl-textfield__error">Not a Valid Email!</span>
                            </div>
                            <div style="padding-top:15px;">
                                <button type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
                                    Send Reset PIN
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    <div id="toast-error" class="mdl-js-snackbar mdl-snackbar">
                        <div class="mdl-snackbar__text"></div>
                        <button class="mdl-snackbar__action" type="button"></button>
                    </div>
                </div>
            </div>  
        </div>
        <script src="js/scripts.js"></script>
    </body>
</html>

