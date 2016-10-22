<?php

$server = "localhost";
$user = "tyler";
$password = "MR83ggJu";
$db = "tyler";

try {

    $conn = new PDO("mysql:host=$server;dbname=$db",$user,$password);
    $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

    $email = strtolower($_POST['emailReg']);
    $password = password_hash($_POST['passwordReg'], PASSWORD_DEFAULT);
    $datetime = date("Y-m-d H:i:s");
    $verifyPIN = rand(10000,50000);

    $insert = "INSERT INTO users (email, password, acl, last_login, verified, verify_pin) VALUES ('$email', '$password', 1, '$datetime', 0, $verifyPIN)";

    $conn->exec($insert);

    echo "success";
    $emailThem = true;
}
catch(PDOException $e) {

    echo "duplicate";
}

$conn = null;

if($emailThem) {
    $to = $email;
    $subject = "Account Creation @ notTuring.ddns.net";

    $message = "
        <html>
        <head>
        <title>Account Creation @ notTuring.ddns.net</title>
        </head>
        <body>
        <p>Here is your PIN: <b>".$verifyPIN."</b></p>
        <a href=\"https://notturing.ddns.net/tyler/IS_ASS2/verify.html\">Verify Your Account Here!</a>
        </body>
        </html>
        ";

    // Always set content-type when sending HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

    // More headers
    $headers .= 'From: <notTURING@example.com>' . "\r\n";

    mail($to,$subject,$message,$headers);
}

?>
