<?php
	include_once("config.php");
	include_once("functions.php");
	// session_start();

	$userID =  $_GET["userID"];
	// $sessionID = $_GET('sessionID');
	// if(tokenCheck()){
	$getSavedQuery = "SELECT * FROM je_savedJob WHERE userID = ".$userID.";";
	$result = queryDb($conn, $getSavedQuery);
	$return["numRows"] = mysqli_num_rows($result);
	$savedJobs = array();

	while($line = $result->fetch_object()){
		$jobHeader = $line->jobHeader;
		$jobID = $line->jobID;
		$savedJob["jobHeader"]=utf8_decode($jobHeader);
		$savedJob["jobID"]=$jobID;
		array_push($savedJobs,$savedJob);
	}
	$return["savedJobs"] = $savedJobs;
	$return["userID"] = $userID;
		// $return["query"] = $getSavedQuery;
	// $return["valid"] = true;
	// } else {
		// $return["valid"] = false;
	// }

	echo json_encode($return);

?>