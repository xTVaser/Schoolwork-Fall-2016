<?php

$server = 'localhost';
$user = 'tyler';
$password = 'MR83ggJu';
$db = 'tyler';

try {
    $conn = new PDO("mysql:host=$server;dbname=$db;charset=utf8", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $commentID = $_POST['id'];

    $update = $conn->prepare("DELETE FROM comments WHERE id='$commentID'");
    $update->execute();
} catch (PDOException $e) {
    echo 'fail';
}

$conn = null;
