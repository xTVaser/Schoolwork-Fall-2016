<?php

    $server = 'localhost';
    $user = 'tyler';
    $password = 'MR83ggJu';
    $db = 'tyler';

    try {
        $conn = new PDO("mysql:host=$server;dbname=$db;charset=utf8", $user, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo 'fail';
    }
