jobbaExtraApp.controller('AppCtrl', function ($scope,$location,Jobb) {
	$scope.loggedIn = function(){
		return Jobb.isLoggedIn();
	}

	$scope.username = function(){
		return Jobb.getLoggedInUser();
	}

	$scope.showSearchEmployee = function(){
		if(Jobb.getRole()==="user"){
			return false;
		}else{
			return true;
		}
	}

	$scope.logout = function(){
	    Jobb.setLoggedIn(false);
    	Jobb.setRole("guest");
    	Jobb.setLoggedInUser("");
    	Jobb.clearSavedJobs();
    	Jobb.killSession();
    	Jobb.terminateSession.get({},function(data){
      	});
    	$location.path("/home");
	}
	
	$scope.clearLoginMessage = function(){
		Jobb.setLoginMessage("");
	}

	$scope.active = false;

	$scope.toggleMenu = function(){
		if(!$scope.active){
			$(".navLinks").addClass("navLinksAnimation");
			$(".navLink").addClass("navLinkAnimation");
			$scope.active = true;
		}else{
			$scope.closeMenu();
		}
	}

	$scope.closeMenu = function(){
		$(".navLinks").removeClass("navLinksAnimation");
		$(".navLink").removeClass("navLinkAnimation");
		$scope.active = false;
	}	

	$scope.numSavedJobs = function(){
		return Jobb.getSavedJobs().length;
	}	
})