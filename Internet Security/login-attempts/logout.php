<?php

    session_start();

    unset($_SESSION['email']);

    header('Location: form.php');
