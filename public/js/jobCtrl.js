jobbaExtraApp.controller('JobCtrl', function ($scope, $location, $http, Jobb) {
	$scope.annonsID = Jobb.getPendingID();

	$scope.loading = true;
	if($scope.annonsID != undefined){
		Jobb.getJob.get({id:$scope.annonsID},function(data){
			$scope.jobMatch = data.platsannons;
			$scope.jobDescription = $scope.jobMatch.annons.annonstext;
			var d = new Date($scope.jobMatch.annons.publiceraddatum);
			$scope.jobPublished = d.toLocaleDateString();
			// var today = new Date();
			// today = today.toLocaleDateString();
			$scope.daysSincePublish = Jobb.dateDifference(d).toFixed(0);
			console.log(data.platsannons);
			$scope.loading = false;
		})
	} else {
		$location.path("/search");
	}

	$scope.loggedIn = function(){
		return Jobb.isLoggedIn();
	}

	$scope.getSavedJobs = function(){
		return Jobb.getSavedJobs();
	}

	$scope.jobSaved = function(jobID){
		$scope.savedJobs = $scope.getSavedJobs();
		for(var job in $scope.savedJobs){
			if($scope.savedJobs[job].jobID == jobID){
				return true;
			}
		}
		return false;
	}

	$scope.saveJob = function(annonsID, annonsrubrik){
		$.ajax({
			url: 'php/saveJob.php',
			type: 'POST',
			data: {annonsID:annonsID,annonsrubrik:annonsrubrik},
			dataType: 'json',
			success: function(data){
				if(data["valid"]){
					Jobb.addSavedJob({"jobID":$scope.jobMatch.annons.annonsid,"jobHeader":$scope.jobMatch.annons.annonsrubrik});
					$scope.$apply();
				} else {
					alert("Din session har tagit slut, du kommer nu loggas ut.");
					$scope.$parent.logout();				
				}
			}
		})
	}

	$scope.removeSaved = function(jobID){
		$.ajax({
			url: 'php/deleteSavedJob.php',
			type: 'POST',
			data: {id:jobID},
			dataType: 'JSON',
			success: function(data){
				if(data["valid"]){
					Jobb.removeSavedJob(jobID);
					$scope.$apply();
				} else {
					alert("Din session har tagit slut, du kommer nu loggas ut.");
					$scope.$parent.logout();				
				}
			}
		})
	}
});