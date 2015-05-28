jobbaExtraApp.controller('ProfileCtrl',function ($scope, $http, $location, Jobb) {
  	$scope.username = Jobb.getLoggedInUser();
  	
  	$scope.savedJobs = function(){
  		console.log(Jobb.getSavedJobs());
  		return Jobb.getSavedJobs();
  	}

	$scope.addPendingID = function(id){
		Jobb.addPendingID(id);
	}

	$scope.removeSaved = function(id){
		// console.log("To be removed: "+id);
		$.ajax({
			url: 'php/deleteSavedJob.php',
			type: 'POST',
			data: {id:id},
			dataType: 'JSON',
			success: function(data){
				if(data['valid']){
					Jobb.removeSavedJob(id);
					$scope.$apply();
				} else {
					alert("Din session har löpt ut och du kommer nu att loggas ut!");
					$scope.$parent.logout();
				}
			}
		})
	}
	
	$scope.hasSavedJobs = function(){
		if(Jobb.getSavedJobs().length === 0){
			return false;
		} else {
			return true;
		}
	}
})