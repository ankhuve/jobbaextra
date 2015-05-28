<?php
	function queryDb($conn, $query){
		if (($result = mysqli_query($conn, $query)) === false) {
	       printf("Query failed: %s<br />\n%s", $query, mysqli_error($conn));
	       exit();
	    }
	    return $result;		
	}

	function passwordHash($password){
		$hashedPassword = hash('sha256', 'CockNBalls'.$password);
		return $hashedPassword;
	}

	function checkLogin($conn, $email, $password){
		$hashedPassword = passwordHash($password);
		$checkIfExistsQuery = "SELECT count(*) numUsers FROM je_user WHERE email='".$email."' AND password = '".$hashedPassword."';";
		$numUsers = queryDb($conn, $checkIfExistsQuery)->fetch_object()->numUsers;
		if($numUsers == 1){
			$loggedInQuery = "SELECT id, username, role FROM je_user WHERE email='".$email."' AND password = '".$hashedPassword."';";
			$resultObj = queryDb($conn, $loggedInQuery);
			$result = $resultObj->fetch_object();
			return $userInfo = array("id"=>$result->id, "username"=>$result->username, "role"=>$result->role, "valid"=>true);
		} else {
			return $userInfo = array("valid"=>false);
		}
	}

	function generateToken($sid,$username){
		return hash('sha256','PillurEndStunes'.time().$sid.$username);
	}

	function generateValidateToken($email){
		return hash('sha256',$email.'youKnowNothing');
	}

	function tokenCheck(){
		session_start();
		$serverToken = str_replace('\"',"",$_SESSION["token"]);
		$clientToken = str_replace('\"',"",$_COOKIE["token"]);
		$serverSession = str_replace('\"',"",session_id());
		$clientSession = str_replace('\"',"",$_COOKIE["sessionID"]);

		if(($serverToken == $clientToken) && ($serverSession == $clientSession)){
			return true;
		} else {
			return false;
		}
	}
?>