<?php

$server = "localhost";
$user = "tyler";
$password = "MR83ggJu";
$db = "tyler";

try {

    $conn = new PDO("mysql:host=$server;dbname=$db",$user,$password);
    $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

    $email = $_POST['emailReg'];
    $password = password_hash($_POST['passwordReg'], PASSWORD_DEFAULT);
    $datetime = date("Y-m-d H:i:s");

    $insert = "INSERT INTO users (email, password, acl, last_login) VALUES ('$email', '$password', 1, '$datetime')";

    $conn->exec($insert);

    echo "Ye";
}
catch(PDOException $e) {

    echo $insert . $e->getMessage();
}

$conn = null;

?>
