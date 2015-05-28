jobbaExtraApp.controller('RegisterCtrl', function ($scope,$location,Jobb) {
	$scope.loading = false;
	$scope.hasError = false;

	$scope.userTypes = [
		{displayName:"Privatperson", value:"user"},
		{displayName:"Företag", value:"company", companyName:''}
	]

	if(Jobb.getRequestedUserType() === "company"){
		var requestedUserType = $scope.userTypes[1];
	} else {
		var requestedUserType = $scope.userTypes[0];
	}

	$scope.credentials = {
		email: '',
		password: '',
		retypedPassword: '',
		userType: requestedUserType
	};

	$scope.loggedInUser = Jobb.getLoggedInUser();

	$scope.passwordMatch = function(){
		if($scope.credentials.password === $scope.credentials.retypedPassword){
			return true;
		} else {
			return false;
		}
	}

	$scope.sufficientPassword = function(){
		if($scope.credentials.password === undefined){
			return false;
		} else {
			if($scope.credentials.password.length > 3){
				return true;
			} else {
				return false;
			}
		}
	}

	$scope.retypedValid = function(){
		if($scope.sufficientPassword() && $scope.passwordMatch()){
			return true;
		} else {
			return false;
		}
	}

	$scope.validEmail = function(){
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		return re.test($scope.credentials.email);
	}

	$scope.companyType = function(){
		if($scope.credentials.userType.value === "company"){
			return true;
		} else {
			return false;
		}
	}

	$scope.userTypeDataCheck = function(){
		if($scope.credentials.userType.value === "company"){
			if($scope.credentials.userType.companyName === undefined){
				return false;
			} else {
				if($scope.credentials.userType.companyName.length < 1){
					return false;
				} else {
					return true;
				}
			}
		} else {
			return true;
		}
	}

	$scope.loggedIn = function(){
		return Jobb.isLoggedIn();
	}

	$scope.logout = function(){
		Jobb.setLoggedIn(false);
		Jobb.setRole("guest");
		Jobb.setLoggedInUser("");
		Jobb.terminateSession.get({},function(data){});
		Jobb.killSession();
	}

	$scope.message = function(){
		return Jobb.getLoginMessage();
	}

	$scope.register = function(credentials){
		$scope.loading = true;
		$scope.hasError = false;
		$.ajax({
			url: 'php/newUser.php',
			type: 'POST',
			data: {credentials:credentials},
			dataType: 'JSON',
			success: function(data){
				console.log(data);
				if(data["Kool beans"]){
					Jobb.login.get({email:$scope.credentials['email'],password:$scope.credentials['password']},function(loginData){
						console.log(loginData);
	      				if(loginData['valid']){
	        				Jobb.setLoginMessage("");
	        				Jobb.setLoggedIn(true);
	        				Jobb.setLoggedInUser(loginData["username"]);
	        				Jobb.setRole(loginData["role"]);
	        				Jobb.createSession(loginData['sessionID'],loginData['userID'],loginData['role'],loginData['username'],loginData["token"]);
	        				if($scope.credentials.userType.value === "company"){
	        					$location.path("/company");
	        				} else {
	        					$location.path("/profile");
	        				}
	  					} else {
	  						$scope.loading = false;
	        				console.log("Failed to log in after registration, registration most likely failed.");
	      				}
	    			});
				}else{
					if(data["userExists"]){
						$scope.loginErrorMessage = "Det finns redan en användare registrerad med den angivna mailen!";
						$scope.loginFailed = true; 
					}
					$scope.loading = false;
					$scope.hasError = true;
					$scope.$apply();
					
				} 
			},
			error: function(data){
				console.log(data);
			}
		})
	}

});