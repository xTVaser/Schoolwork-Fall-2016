<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);    
    
include 'db.php';

//Over 5 attempts to login to an un-verified account.
    //Spam account creation
    //SELECT email, count(result) FROM tyler.login_attempts WHERE result = 0 GROUP BY email;
    
$spam = $conn->prepare("SELECT email, count(result) FROM login_attempts WHERE result = 0 GROUP BY email");
$spam->execute();
$spamAttempts = $spam->fetchAll();

foreach ($spamAttempts as $attempt) {

    if($attempt['count(result)'] >= 5) {
        $timestampQuery = $conn->prepare("SELECT email, timestamp FROM login_attempts WHERE email = :email AND result = 0 ORDER BY timestamp DESC LIMIT 1");
        $timestampQuery->bindParam(":email", $attempt['email']);
        $timestampQuery->execute();
        $timestamp = $timestampQuery->fetchAll();
        $attempt['timestamp']=$timestamp[0]['timestamp'];
        addSuspicious(1, $attempt);
    }
}

//Successful logins from one IP, and then a different IP suddenly.
    //Suspicious Location
    //SELECT email, ipaddr, count(*) FROM tyler.login_attempts WHERE result = 1 GROUP BY email, ipaddr ORDER BY email, count(*) DESC; //To determine suspicion
    //SELECT email, timestamp FROM tyler.login_attempts WHERE ipaddr = "174.5.181.193" AND email = "moderator@notturing.com" ORDER BY timestamp DESC LIMIT 1; //To get last timestamp

$location = $conn->prepare("SELECT email, ipaddr, count(*) FROM login_attempts WHERE result = 1 GROUP BY email, ipaddr ORDER BY email, count(*) DESC");
$location->execute();
$locAttempts = $location->fetchAll();

for ($i = 0; $i < count($locAttempts); $i++) {


    $loc = $locAttempts[$i];
    
    for($j = $i+1; $j < count($locAttempts); $j++) {
    
        $suspect = $locAttempts[$j];
        
        
        if($loc['email'] != $suspect['email']) {
            $i += $j;
            break;
        }
        
        if($loc['count(*)'] / 2 > $suspect['count(*)'] / 2) {
        
            $timestampQuery = $conn->prepare("SELECT email, timestamp FROM login_attempts WHERE ipaddr = :ip AND email = :email ORDER BY timestamp DESC LIMIT 1");
            $timestampQuery->bindParam(":ip", $suspect['ipaddr']);
            $timestampQuery->bindParam(":email", $suspect['email']);
            $timestampQuery->execute();
            $timestamp = $timestampQuery->fetchAll();
            $suspect['timestamp']=$timestamp[0]['timestamp'];
            addSuspicious(2, $suspect);
        }
    }
}

//Email contains tags
    //XSS attempt
    //if($string != strip_tags($string)) parse through all of them
    //SELECT * from tyler.login_attempts;

$xssQuery = $conn->prepare("SELECT * from login_attempts");
$xssQuery->execute();
$xssAttempts = $xssQuery->fetchAll();

foreach($xssAttempts as $xss) {

    if($xss['email'] != strip_tags($xss['email']))
        addSuspicious(3, $xss);
}

//Email contains SQL statements
    //SQLi attempt
    //See if it has quotations or semicolons
$sqliQuery = $conn->prepare("SELECT * from login_attempts");
$sqliQuery->execute();
$sqliAttempts = $sqliQuery->fetchAll();

foreach($sqliAttempts as $sqli) {

    if(strpos($sqli['email'], ';') !== false) //strpos($a, 'are') !== false
        addSuspicious(4, $sqli);
}

//Detect Proxy Connection if ip_fwd isnt empty.
    //SELECT * from tyler.login_attempts WHERE ipaddr_fwd != '';
$proxyQuery = $conn->prepare("SELECT * from login_attempts WHERE ipaddr_fwd != ''");
$proxyQuery->execute();
$proxyAttempts = $proxyQuery->fetchAll();

foreach($proxyAttempts as $proxy) {

    addSuspicious(5, $proxy);
}

//Over 10 Incorrect login attempts in a day.
    //Targetted Attack
    //SELECT email, ipaddr, count(*) AS `count`, DATE(timestamp) as `date` FROM tyler.login_attempts WHERE result = -1 GROUP BY DATE(login_attempts.timestamp), email, ipaddr HAVING count >= 10;
    
$incorrectQuery = $conn->prepare("SELECT email, ipaddr, count(*) AS `count`, DATE(timestamp) as `date` FROM login_attempts WHERE result = -1 GROUP BY DATE(login_attempts.timestamp), email, ipaddr HAVING count >= 10");
$incorrectQuery->execute();
$incorrectAttempts = $incorrectQuery->fetchAll();

foreach($incorrectAttempts as $incorrect) {

    addSuspicious(6, $incorrect);
}

//Over 30 failed logins per minute
    //Brute-force or dictionary attack
    //SELECT email, ipaddr, count(*) AS `count`, date_format(timestamp, '%Y-%m-%d %H:%i:00') as `date` FROM tyler.login_attempts WHERE result = -1 GROUP BY `date`, email, ipaddr HAVING count >= 10;

$bruteQuery = $conn->prepare("SELECT email, ipaddr, count(*) AS `count`, date_format(timestamp, '%Y-%m-%d %H:%i:00') as `date` FROM login_attempts WHERE result = -1 GROUP BY `date`, email, ipaddr HAVING count >= 10");
$bruteQuery->execute();
$bruteAttempts = $bruteQuery->fetchAll();

foreach($bruteAttempts as $brute) {

    addSuspicious(7, $brute);
}

//Inserts and Updates ---------------------------------------------------------------------------
//===============================================================================================

function addSuspicious($type, $row) { //$type: 1 = spam account

    include 'db.php';
    
    $id = checkDuplicate($type, $row);

    if($type == 1) {
    
        if($id == 0) { //New suspcious spam account
            $query = $conn->prepare("INSERT INTO flagged_logins (latest_timestamp, ipaddr, target_email, suspected_method, attempts) VALUES (:timestamp, null, :email, 'Spam Account', :attempts)");
            $query->bindParam(":email", $row['email']);
            $query->bindParam(":timestamp", $row['timestamp']);
            $query->bindParam(":attempts", $row['count(result)']);
            $query->execute();
        }
        else { //Not new, just update the attempts
            $query = $conn->prepare("UPDATE flagged_logins SET attempts=:attempts, latest_timestamp=:timestamp WHERE id=:id");
            $query->bindParam(":attempts", $row['count(result)']);
            $query->bindParam(":timestamp", $row['timestamp']);
            $query->bindParam(":id", $id);
            $query->execute();
        }
    }
    
    else if($type == 2) {
    
        if($id == 0) {
            $query = $conn->prepare("INSERT INTO flagged_logins (latest_timestamp, ipaddr, target_email, suspected_method, attempts) VALUES (:timestamp, :ipaddr, :email, 'Suspicious Location', :attempts)");
            $query->bindParam(":timestamp", $row['timestamp']);
            $query->bindParam(":ipaddr", $row['ipaddr']);
            $query->bindParam(":email", $row['email']);
            $query->bindParam(":attempts", $row['count(*)']);
            $query->execute();
        }
        else {
            $query = $conn->prepare("UPDATE flagged_logins SET attempts=:attempts, latest_timestamp=:timestamp WHERE id=:id");
            $query->bindParam(":attempts", $row['count(*)']);
            $query->bindParam(":timestamp", $row['timestamp']);
            $query->bindParam(":id", $id);
            $query->execute();
        }
    }
    
    else if($type == 3) {
        
        if($id == 0) {
            $query = $conn->prepare("INSERT INTO flagged_logins (latest_timestamp, ipaddr, target_email, suspected_method, attempts) VALUES (:timestamp, :ipaddr, :email, 'XSS Attack', null)");
            $query->bindParam(":timestamp", $row['timestamp']);
            $query->bindParam(":ipaddr", $row['ipaddr']);
            $query->bindParam(":email", $row['email']);
            $query->execute();
        }
    }
    
    else if($type == 4) {
        
        if($id == 0) {
            $query = $conn->prepare("INSERT INTO flagged_logins (latest_timestamp, ipaddr, target_email, suspected_method, attempts) VALUES (:timestamp, :ipaddr, :email, 'SQL Injection', null)");
            $query->bindParam(":timestamp", $row['timestamp']);
            $query->bindParam(":ipaddr", $row['ipaddr']);
            $query->bindParam(":email", $row['email']);
            $query->execute();
        }
    }
    
    else if($type == 5) {
        
        if($id == 0) {
            $query = $conn->prepare("INSERT INTO flagged_logins (latest_timestamp, ipaddr, target_email, suspected_method, attempts) VALUES (:timestamp, :ipaddr, :email, 'Proxy Connection', null)");
            $query->bindParam(":timestamp", $row['timestamp']);
            $query->bindParam(":ipaddr", $row['ipaddr']);
            $query->bindParam(":email", $row['email']);
            $query->execute();
        }
    }
    
    else if($type == 6) {
    
        if($id == 0) {
            $query = $conn->prepare("INSERT INTO flagged_logins (latest_timestamp, ipaddr, target_email, suspected_method, attempts) VALUES (:date, :ipaddr, :email, 'Targetted Attack', :attempts)");
            $query->bindParam(":date", $row['date']);
            $query->bindParam(":ipaddr", $row['ipaddr']);
            $query->bindParam(":email", $row['email']);
            $query->bindParam(":attempts", $row['count']);
            $query->execute();
        }
        else {
            $query = $conn->prepare("UPDATE flagged_logins SET attempts=:attempts WHERE id=:id");
            $query->bindParam(":attempts", $row['count']);
            $query->bindParam(":id", $id);
            $query->execute();
        }
    }
    
    else if($type == 7) {
    
        if($id == 0) {
            $query = $conn->prepare("INSERT INTO flagged_logins (latest_timestamp, ipaddr, target_email, suspected_method, attempts) VALUES (:date, :ipaddr, :email, 'Brute-force Attack', :attempts)");
            $query->bindParam(":date", $row['date']);
            $query->bindParam(":ipaddr", $row['ipaddr']);
            $query->bindParam(":email", $row['email']);
            $query->bindParam(":attempts", $row['count']);
            $query->execute();
        }
        else {
            $query = $conn->prepare("UPDATE flagged_logins SET attempts=:attempts WHERE id=:id");
            $query->bindParam(":attempts", $row['count']);
            $query->bindParam(":id", $id);
            $query->execute();
        }
    }
}

function checkDuplicate($type, $row) {

    include 'db.php';

    if($type == 1) {

        $query = $conn->prepare("SELECT * FROM flagged_logins WHERE target_email=:email AND suspected_method='Spam Account'");
        $query->bindParam(":email", $row['email']);
        $query->execute();
        $results = $query->fetch(PDO::FETCH_ASSOC);
        
        if($query->rowCount() > 0)
            return $results['id'];
    }
    
    else if($type == 2) {
    
        $query = $conn->prepare("SELECT * FROM flagged_logins WHERE target_email=:email AND ipaddr=:ipaddr AND suspected_method='Suspicious Location'");
        $query->bindParam(":email", $row['email']);
        $query->bindParam(":ipaddr", $row['ipaddr']);
        $query->execute();
        $results = $query->fetch(PDO::FETCH_ASSOC);
        
        if($query->rowCount() > 0)
            return $results['id'];
    }
    
    else if($type == 3) {
    
        $query = $conn->prepare("SELECT * FROM flagged_logins WHERE target_email=:email AND latest_timestamp=:timestamp AND ipaddr=:ipaddr AND suspected_method='XSS Attack'");
        $query->bindParam(":timestamp", $row['timestamp']);
        $query->bindParam(":email", $row['email']);
        $query->bindParam(":ipaddr", $row['ipaddr']);
        $query->execute();
        $results = $query->fetch(PDO::FETCH_ASSOC);
        
        if($query->rowCount() > 0)
            return $results['id'];
    }
    
    else if($type == 4) {
    
        $query = $conn->prepare("SELECT * FROM flagged_logins WHERE target_email=:email AND ipaddr=:ipaddr AND suspected_method='SQL Injection'");
        $query->bindParam(":email", $row['email']);
        $query->bindParam(":ipaddr", $row['ipaddr']);
        $query->execute();
        $results = $query->fetch(PDO::FETCH_ASSOC);
        
        if($query->rowCount() > 0)
            return $results['id'];
    }
    
    else if($type == 5) {
    
        $query = $conn->prepare("SELECT * FROM flagged_logins WHERE target_email=:email AND ipaddr=:ipaddr AND suspected_method='Proxy Connection'");
        $query->bindParam(":email", $row['email']);
        $query->bindParam(":ipaddr", $row['ipaddr']);
        $query->execute();
        $results = $query->fetch(PDO::FETCH_ASSOC);
        
        if($query->rowCount() > 0)
            return $results['id'];
    }
    
    else if($type == 6) {

        $query = $conn->prepare("SELECT * FROM flagged_logins WHERE target_email=:email AND ipaddr=:ipaddr AND latest_timestamp=:date AND suspected_method='Targetted Attack'");
        $query->bindParam(":email", $row['email']);
        $query->bindParam(":ipaddr", $row['ipaddr']);
        $query->bindParam(":date", $row['date']);
        $query->execute();
        $results = $query->fetch(PDO::FETCH_ASSOC);
        
        if($query->rowCount() > 0)
            return $results['id'];
    }
    
    else if($type == 7) {

        $query = $conn->prepare("SELECT * FROM flagged_logins WHERE target_email=:email AND ipaddr=:ipaddr AND latest_timestamp=:date AND suspected_method='Brute-force Attack'");
        $query->bindParam(":email", $row['email']);
        $query->bindParam(":ipaddr", $row['ipaddr']);
        $query->bindParam(":date", $row['date']);
        $query->execute();
        $results = $query->fetch(PDO::FETCH_ASSOC);
        
        if($query->rowCount() > 0)
            return $results['id'];
    }
    
    return 0;
}

?>
