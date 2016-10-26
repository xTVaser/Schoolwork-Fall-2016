<?php

session_start();

$server = 'localhost';
$user = 'tyler';
$password = 'MR83ggJu';
$db = 'tyler';

$conn = new PDO("mysql:host=$server;dbname=$db;charset=utf8", $user, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    $email = strtolower($_POST['email']);
    $password = $_POST['password'];
    $datetime = date('Y-m-d H:i:s');
    $result = 0;

    $select = $conn->prepare("SELECT * FROM users WHERE (email = '$email')");
    $select->execute();

    $rowCount = $select->rowCount();
    $row = $select->fetch(PDO::FETCH_ASSOC);

    if ($rowCount == 1 && password_verify($password, $row['password'])) {
        if ($row['verified'] == 0) {
            echo 'verify';
        } else {
            echo 'success';
            $result = 1;
            $_SESSION['email'] = $email;

            $update = $conn->prepare("UPDATE users SET last_login='$datetime' WHERE (email = '$email')");
            $update->execute();
        }
    } else {
        echo 'fail';
        $result = -1;
    }
} catch (PDOException $e) {
    echo $select.'Error: '.$e->getMessage();
}

try {
    $ip = $_SERVER['REMOTE_ADDR'];
    $ipFwd = $_SERVER['HTTP_X_FORWARDED_FOR'];

    $insert = $conn->prepare("INSERT INTO login_attempts (email, ipaddr, ipaddr_fwd, timestamp, result) VALUES ('$email', '$ip', '$ipFwd', '$datetime', $result)");
    $insert->execute();
} catch (PDOException $e) {
    echo $select.'Error: '.$e->getMessage();
}

$conn = null;
