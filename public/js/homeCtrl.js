jobbaExtraApp.controller('HomeCtrl', function ($scope,$location,Jobb) {
	$scope.query = "";

	$scope.registerUserTypes = ["user","company"];

	$scope.search = function(query){
		Jobb.addPendingQuery(query);
		$location.path("/search");	
	}

	$scope.setRegisterType = function(type){
		Jobb.setRequestedUserType(type);
	}

	$scope.registerRedirect = function(type){
		if(Jobb.isLoggedIn()){
			if(Jobb.getRole() === "user" && type === 0){
				return "#/profile";
			} else if(Jobb.getRole() === "company" && type===1){
				return "#/company";
			} else {
				return "#/register";
			}
		} else {
			return "#/register";
		}
	}
});