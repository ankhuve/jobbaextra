<?php
	include_once("config.php");
	include_once("functions.php");

	$validateTokenQuery = "SELECT count(*) numNotVerified
	FROM je_verified
	WHERE verifyToken = '".$_GET["token"]."';";

	$numUnverified = queryDb($conn, $validateTokenQuery)->fetch_object()->numNotVerified;
	if($numUnverified == 1){ // One unverified user found
		$verifyUserQuery = "UPDATE je_verified SET verified = true WHERE verifyToken = '".$_GET["token"]."';";
		queryDb($conn, $verifyUserQuery);
		Header("Location: ../#/login");
	} else{
		echo "FAIL!";
	}

?>