<?php

$server = 'localhost';
$user = 'tyler';
$password = 'MR83ggJu';
$db = 'tyler';

try {
    $conn = new PDO("mysql:host=$server;dbname=$db;charset=utf8", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $email = strtolower($_POST['emailforgot']);
    $pin = rand(10000, 50000);

    $select = $conn->prepare("SELECT * FROM users WHERE (email = '$email')");
    $select->execute();

    $rowCount = $select->rowCount();

    $row = $select->fetch(PDO::FETCH_ASSOC);

    if ($rowCount == 1) {
        echo 'success';

        $update = $conn->prepare("UPDATE users SET reset_pin='$pin' WHERE (email = '$email')");
        $update->execute();
        $emailThem = true;
    } else {
        echo 'fail';
    }
} catch (PDOException $e) {
    echo 'error';
}

$conn = null;

if ($emailThem) {
    $to = $email;
    $subject = 'Password Reset @ notTuring.ddns.net';

    $message = '
        <html>
        <head>
        <title>Password Reset @ notTuring.ddns.net</title>
        </head>
        <body>
        <p>Here is your PIN: <b>'.$pin.'</b></p>
        <a href="https://notturing.ddns.net/tyler/IS_ASS2/reset.html">Reset Your Password Here!</a>
        </body>
        </html>
        ';

    // Always set content-type when sending HTML email
    $headers = 'MIME-Version: 1.0'."\r\n";
    $headers .= 'Content-type:text/html;charset=UTF-8'."\r\n";

    // More headers
    $headers .= 'From: <notTURING@example.com>'."\r\n";

    mail($to, $subject, $message, $headers);
}
