<?php
	include_once("config.php");
	include_once("functions.php");

	if(tokenCheck()){
		$return["valid"] = true;
		$annonsID = $_POST['id'];
		$return['id'] = $annonsID;
		$removeQuery = "DELETE FROM je_savedJob WHERE userID = ".$_SESSION['userID']." AND jobID = '".$annonsID."';";
		queryDb($conn, $removeQuery);
	} else {
		$return["valid"] = false;
	}

	echo json_encode($return);
	

?>