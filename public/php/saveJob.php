<?php
	include_once("config.php");
	include_once("functions.php");

	$annonsID = $_POST["annonsID"];
	$annonsrubrik = utf8_encode($_POST["annonsrubrik"]);

	if(tokenCheck()){
		$saveJobQuery = "INSERT INTO je_savedJob VALUES(".$_SESSION['userID'].",'".$annonsID."','".$annonsrubrik."') ON DUPLICATE KEY UPDATE userID = ".$_SESSION['userID'].";";
		queryDb($conn, $saveJobQuery);
		$return["valid"] = true;
		$return["query"] = $saveJobQuery;
	} else {
		$return["valid"] = false;
	}
	echo json_encode($return);
?>