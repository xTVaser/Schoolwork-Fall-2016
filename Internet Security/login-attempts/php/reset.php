<?php

$server = "localhost";
$user = "tyler";
$password = "MR83ggJu";
$db = "tyler";

try {

    $conn = new PDO("mysql:host=$server;dbname=$db;charset=utf8", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $email = strtolower($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $pin = $_POST['pin'];
    
    $select = $conn->prepare("SELECT * FROM users WHERE (email = '$email')");
    $select->execute();
    
    $rowCount = $select->rowCount();
    $row = $select->fetch(PDO::FETCH_ASSOC);
    
    
    if($rowCount == 1) {
        
        if($row['reset_pin'] != $pin)
            echo "pin";
            
        else if($row['reset_pin'] == null || $row['reset_pin'] == 0)
            echo "fail";
            
        else {
            echo "success";
            
            $update = $conn->prepare("UPDATE users SET password='$password', reset_pin=0 WHERE (email = '$email')");
            $update->execute();
        }
    }
}
catch(PDOException $e) {
    
    echo "fail";
}

$conn = null;

?>
