<?php

$server = "localhost";
$user = "tyler";
$password = "MR83ggJu";
$db = "tyler";

try {

    $conn = new PDO("mysql:host=$server;dbname=$db;charset=utf8", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $body = $_POST['body'];
    $author = $_POST['author'];
            
    $insert = $conn->prepare("INSERT INTO comments (comment_body, author_name) VALUES ('$body', '$author')");
    $insert->execute();
    
    echo "ye";
    
}
catch(PDOException $e) {
    
    echo "fail";
}

$conn = null;

?>
