jobbaExtraApp.controller('CompanyCtrl',function ($scope, Jobb) {
	$scope.username = Jobb.getLoggedInUser();
})