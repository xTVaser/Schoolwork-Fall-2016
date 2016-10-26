<?php

$server = 'localhost';
$user = 'tyler';
$password = 'MR83ggJu';
$db = 'tyler';

try {
    $conn = new PDO("mysql:host=$server;dbname=$db;charset=utf8", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $userID = $_POST['userID'];

    $update = $conn->prepare("DELETE FROM users WHERE id='$userID', acl!=3");
    $update->execute();
} catch (PDOException $e) {
    echo 'fail';
}

$conn = null;
