<?php

    //Over 10 Incorrect login attempts in a day.
        //Targetted Attack
    //Over 5 attempts to login to an un-verified account.
        //Spam account creation
    //Over 5 failed logins per minute
        //Brute-force or dictionary attack
    //Successful logins from one IP, and then a different IP suddenly.
        //Suspicious Location
    //Email contains tags
        //XSS attempt
    //Email contains SQL statements
        //SQLi attempt
    //Detect Proxy Connection if ip_fwd isnt empty.

    //Array must return a list of all: Latest Timestamp | IP Addr of Suspect | Target E-Mail | Suspected Method
