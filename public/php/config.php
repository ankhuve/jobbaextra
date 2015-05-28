<?php
	$hostname = 'localhost';
	$username = 'rbergel';
	$password = 'rbergel-xmlpub13';
	$database = 'rbergel';

	$conn = mysqli_connect($hostname, $username, $password, $database);
	
    if (mysqli_connect_errno()) {
        printf("Connect failed: %s\n", mysqli_connect_error());
        exit();
    };
?>