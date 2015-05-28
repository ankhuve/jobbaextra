<?php
	include_once("config.php");
	include_once("functions.php");

	$credentials = $_POST["credentials"];

	$email = $credentials["email"];
	$password = $credentials["password"];
	$userType = $credentials["userType"];


	$checkUser = "SELECT count(*) numUsers FROM je_user WHERE email = '".$email."';";
	if(queryDb($conn, $checkUser)->fetch_object()->numUsers < 1){
		// No user with the selected email
		$return["userExists"] = false;
	} else {
		// User already exists
		$return["userExists"] = true;
	}

	// Check the user type
	if($userType["value"] == "company"){
		// $createUserQuery = "INSERT INTO je_user(email,username,password,role) VALUES ()";
		$companyName = $userType["companyName"];
		$checkCompany = "SELECT count(*) numCompanies FROM je_company WHERE name = '".$companyName."';";
		if(queryDb($conn, $checkCompany)->fetch_object()->numCompanies < 1){
			// No company by that name registered
			$return["companyExists"] = false;
		} else {
			// There is already a company by that name registered
			$return["companyExists"] = true;
		}
	}

	$hashedPassword = passwordHash($password);
	if($userType["value"] == "company" && !$return["companyExists"] && !$return["userExists"]){
		$createCompanyUserQuery = "INSERT INTO je_user(email,username,password,role) VALUES ('".$email."','".$email."','".$hashedPassword."','company');";
		$createCompanyQuery = "INSERT INTO je_company(name) VALUES('".$companyName."')";

		$getUserIDQuery = "SELECT id FROM je_user WHERE email = '".$email."' AND password = '".$hashedPassword."';";
		$getCompanyIDQuery = "SELECT id FROM je_company WHERE name = '".$companyName."';";

		queryDb($conn, $createCompanyUserQuery);
		queryDb($conn, $createCompanyQuery);
		$userID = queryDb($conn, $getUserIDQuery)->fetch_object()->id;
		$companyID = queryDb($conn, $getCompanyIDQuery)->fetch_object()->id;

		$bindCompanyToUserQuery = "INSERT INTO je_companyUsers VALUES (".$companyID.",".$userID.")";
		queryDb($conn, $bindCompanyToUserQuery);

		$validationToken = generateValidateToken($email);
		$createValidation = "INSERT INTO je_verified(userID,verifyToken) VALUES (".$userID.",'".$validationToken."');";
		queryDb($conn, $createValidation);

		// EMAIL VERIFY TOKEN
		$emailSubject = "Välkommen till JobbaExtra.com!";
		$emailMessage = "
		<h1>Hej och välkommen till JobbaExtra.com!</h1><br/>
		För att verifiera ditt konto, klicka på <a href='http://xml.csc.kth.se/~rbergel/iprog/app/php/validateUser.php?token=".$validationToken."'>denna länk.</a> <br/>
		
		Om du inte kan klicka på länken så får du kopiera nedanstående länk och klistra in i din webbläsare. <br/>
		http://xml.csc.kth.se/~rbergel/iprog/app/php/validateUser.php?token=".$validationToken."
		
		Varma hälsningar, <br/>

		Vi på JobbaExtra.com";
		$headers = "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=utf-8";
		mail($email,$emailSubject,$emailMessage,$headers);

		$return["Kool beans"] = true;
	} else if ($userType["value"] == "user" && !$return["userExists"]){
		$createPrivateUserQuery = "INSERT INTO je_user(email,username,password,role) VALUES ('".$email."','".$email."','".$hashedPassword."','user');";
		queryDb($conn, $createPrivateUserQuery);

		$getUserIDQuery = "SELECT id FROM je_user WHERE email = '".$email."' AND password = '".$hashedPassword."';";
		$userID = queryDb($conn, $getUserIDQuery)->fetch_object()->id;

		$validationToken = generateValidateToken($email);

		$createValidation = "INSERT INTO je_verified(userID,verifyToken) VALUES (".$userID.",'".$validationToken."');";
		queryDb($conn, $createValidation);

		// EMAIL VERIFY TOKEN

		$return["Kool beans"] = true;
	} else {
		$return["Kool beans"] = false;
	}

	echo json_encode($return);
?>