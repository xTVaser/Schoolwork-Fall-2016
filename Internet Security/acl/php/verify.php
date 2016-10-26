<?php

$server = 'localhost';
$user = 'tyler';
$password = 'MR83ggJu';
$db = 'tyler';

try {
    $conn = new PDO("mysql:host=$server;dbname=$db;charset=utf8", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $email = strtolower($_POST['email']);
    $password = $_POST['password'];
    $pin = $_POST['pin'];

    $select = $conn->prepare("SELECT * FROM users WHERE (email = '$email')");
    $select->execute();

    $rowCount = $select->rowCount();
    $row = $select->fetch(PDO::FETCH_ASSOC);

    if ($rowCount == 1 && password_verify($password, $row['password'])) {
        if ($row['verified'] == 1) {
            echo 'alreadyverified';
        } elseif ($row['verify_pin'] == $pin) {
            echo 'success';

            $update = $conn->prepare("UPDATE users SET verified=1, verify_pin=0 WHERE (email = '$email')");
            $update->execute();
        } else {
            echo 'pin';
        }
    }
} catch (PDOException $e) {
    echo 'fail';
}

$conn = null;
