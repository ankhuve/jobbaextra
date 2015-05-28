jobbaExtraApp.controller('SearchCtrl', function ($scope,Jobb) {
	
	$scope.forceShowResults = false;
	$scope.toggledFilter = false;

	var initiateCounties = function(){
		if(Jobb.getCounties().length === 0){ // First page load, no counties selected
			Jobb.getCategory.get( // Get all the counties listed by arbetsförmedlingen
				{type:'lan'},
				function(data){
					Jobb.addCounties(data.soklista.sokdata);
					$scope.selectedCounty = $scope.counties()[0];
				}
			)
		} else { // Counties already added to model, no need for second call to API.
			if(Jobb.getSearchParams().lanid){ // User had selected a county before.
				var counties = Jobb.getCounties();
				var selectedCountyID = Jobb.getSearchParams().lanid;

				for(county in counties){
					if(counties[county].id === selectedCountyID){
						$scope.selectedCounty = counties[county];
					}
				}
				if(Jobb.getSearchParams().kommunid){
					var municipalities = Jobb.getMunicipalities();
					var selectedMunicipality = Jobb.getSearchParams().kommunid;

					for(m in municipalities){
						if(municipalities[m].id === selectedMunicipality){
							$scope.selectedMunicipality = municipalities[m];
						}
					}
				} else {
					$scope.selectedMunicipality = Jobb.getMunicipalities()[0];
				}
			} else {
				$scope.selectedCounty = Jobb.getCounties()[0];
			}
		}
	}

	initiateCounties();

	var initiateLinesOfWork = function(){
		if(Jobb.getLinesOfWork().length === 0){
			Jobb.getCategory.get( // Get all the lines of work listed by arbetsförmedlingen
				{type:'yrkesomraden'},
				function(data){
					Jobb.addLinesOfWork(data.soklista.sokdata);
					$scope.selectedLineOfWork = $scope.linesOfWork()[0];
				}
			);
		} else {
			if(Jobb.getSearchParams().yrkesomradeid){
				var linesOfWork = Jobb.getLinesOfWork();
				var selectedLineOfWork = Jobb.getSearchParams().yrkesomradeid;

				for(lineOfWork in linesOfWork){
					if(linesOfWork[lineOfWork].id === selectedLineOfWork){
						$scope.selectedLineOfWork = linesOfWork[lineOfWork];
					}
				}
				if(Jobb.getSearchParams().yrkesgruppid){
					var professions = Jobb.getProfessions();
					var selectedProfession = Jobb.getSearchParams().yrkesgruppid;
					for(p in professions){
						if(professions[p].id === selectedProfession){
							$scope.selectedProfession = professions[p];
						}
					}
				} else {
					$scope.selectedProfession = Jobb.getProfessions()[0];
				}
			} else {
				$scope.selectedLineOfWork = Jobb.getLinesOfWork()[0];
			}
		}
	}

	initiateLinesOfWork();

	$scope.showingResults = function(){
		if(Jobb.getSearchResults().length>0){
			$("#numSearchResults").animate({opacity: 1}, 300);
			return true;
		} else {
			return false;
		}
	};

	$scope.countySelected = function(){
		if(Jobb.getSearchParamsNotApplied().lanid === undefined){
			return false;
		} else {
			if(!Jobb.getSearchParamsNotApplied().lanid){
				return false;
			} else {
				return true;
			}
		}
	};

	$scope.lineOfWorkSelected = function(){
		if(Jobb.getSearchParamsNotApplied().yrkesomradeid === undefined){
			return false;
		} else {
			if(!Jobb.getSearchParamsNotApplied().yrkesomradeid){
				return false;
			} else {
				return true;
			}
		}
	};

	$scope.isAFilterUsed = function(){ // Currently only used for showing the reset filters button, hence the specific css
		if($scope.lineOfWorkSelected() || $scope.countySelected()){
			$(".searchButton.filterButton").css({"marginLeft": "23%"});
			return true
		} else{
			$(".searchButton.filterButton").css({"marginLeft": 0});
			return false
		}
	};

	$scope.getSelectedID = function(type){
		if(type==='county'){
			return($scope.selectedCounty['id']);
		} else if(type==='municipality'){
			return($scope.selectedMunicipality['id']);
		} else if(type==='lineOfWork'){
			return($scope.selectedLineOfWork['id']);
		} else if(type='profession'){
			return($scope.selectedProfession['id']);
		}else {
			console.log("Error when getting selected id!");
		}
	};

	$scope.jobs = function(){
		return Jobb.getSearchResults();
	};

	var resetFilters = function(type){
		if(type === "county"){
			if($scope.selectedCounty){
				$scope.selectedCounty = $scope.counties()[0];
			}
		} else if(type === "municipality"){
			if($scope.selectedMunicipality){
				$scope.selectedMunicipality = $scope.municipalities()[0];
			}
		} else if(type === "lineOfWork"){
			if($scope.selectedLineOfWork){
				$scope.selectedLineOfWork = $scope.linesOfWork()[0];
			}
		} else if (type === "profession"){
			if($scope.selectedProfession){
				$scope.selectedProfession = $scope.professions()[0];
			}
		}
	}


	$scope.resetFilters = function(){
		Jobb.resetSearchParams();
		Jobb.addSearchParam('nyckelord',"");
		Jobb.addSearchParam('antalrader',10);
		Jobb.addSearchParam('sida',Jobb.getCurrentPage());

		$scope.selectedCounty = $scope.counties()[0];
		$scope.selectedLineOfWork = $scope.linesOfWork()[0];
		Jobb.addMunicipalities([]);
		Jobb.addProfessions([]);
	};

	$scope.updateSearchOptions = function(param, val){
		if(param === 'lanid'){ // If the user chooses county, get all the municipalties in that county
			if($scope.getSelectedID('county')){ // Fail-safe for when the user has chosen the "Välj län..." option
				Jobb.getKommun.get(
					{lanid: $scope.getSelectedID('county')}, 
					function(data){
						Jobb.addMunicipalities(data.soklista.sokdata);
						$scope.selectedMunicipality = Jobb.getMunicipalities()[0];
					}
				);
			} else {
				Jobb.removeSearchParam("lanid");
				Jobb.removeSearchParam("kommunid");
			}
		}
		if(param === 'yrkesomradeid'){ // If the user chooses line of work, get all the professions within that line of work
			if($scope.getSelectedID('lineOfWork')){
				Jobb.getYrkesgrupper.get(
					{yrkesomradeid:$scope.getSelectedID('lineOfWork')},
					function(data){
						Jobb.addProfessions(data.soklista.sokdata);
						$scope.selectedProfession = Jobb.getProfessions()[0];
					}
				)
			} else {
				Jobb.removeSearchParam("yrkesomradeid");
				Jobb.removeSearchParam("yrkesgruppid");
			}
		}
		Jobb.addSearchParam(param,val);
	}

	$scope.municipalities = function(){
		return Jobb.getMunicipalities();
	}

	$scope.professions = function(){
		return Jobb.getProfessions();
	}

	$scope.counties = function(){
		return Jobb.getCounties();
	}

	$scope.linesOfWork = function(){
		return Jobb.getLinesOfWork();
	}

	$scope.addPending = function(annonsID){ // Add pending job id for single job view
		Jobb.addPendingID(annonsID);
	}

	$scope.antalAnnonser = function(){
		return Jobb.getNumHits();
	}

	$scope.numPages = function(){
		return Jobb.getNumPages();
	}

	$scope.sida = function(){
		return Jobb.getCurrentPage();
	}

	$scope.toggleFilter = function(){
		if($scope.toggledFilter){
			$(".searchFilter").removeClass("searchFilterAnimation");
			$(".filters").removeClass("filtersAnimation");
			$("#filterToggleArrow").removeClass("glyphicon-chevron-up");
			$("#filterToggleArrow").addClass("glyphicon-chevron-down");
			$scope.toggledFilter = false;
		} else {
			$(".searchFilter").addClass("searchFilterAnimation");
			$(".filters").addClass("filtersAnimation");
			$("#filterToggleArrow").removeClass("glyphicon-chevron-down");
			$("#filterToggleArrow").addClass("glyphicon-chevron-up");
			$scope.toggledFilter = true;
		}
	}

	$scope.search = function(keyword,pageChange){
		$scope.loading = true;
		if(!pageChange){ // NEW SEARCH
			Jobb.setCurrentPage(1);
			$scope.updateSearchOptions("sida",1);
			$scope.updateSearchOptions("nyckelord", keyword);
			Jobb.applySearchParams();

		} else { // PAGE CHANGE
			Jobb.addAppliedSearchParam("sida", Jobb.getCurrentPage());
		}
		console.log(Jobb.getSearchParams());
		Jobb.getJobs.get(Jobb.getSearchParams(), function(data){
			$scope.loading = false;
			Jobb.setNumPages(data.matchningslista.antal_sidor);
			Jobb.setNumHits(data.matchningslista.antal_platsannonser);
			
			if(Jobb.getNumHits() === 0){
				Jobb.addSearchResults([]);
			} else {
				Jobb.addSearchResults(data.matchningslista.matchningdata);
			}

			$scope.forceShowResults = true; // Show number of hits, even when there are 0 hits.
		});
	}

	$scope.isFirstPage = function(){
		if($scope.sida() === 1){
			return true;
		} else {
			return false;
		}
	}

	$scope.isLastPage = function(){
		if($scope.sida() === $scope.numPages()){
			return true;
		} else {
			return false;
		}
	}

	$scope.changePage = function(target){
		if(target === 'next'){
			Jobb.setCurrentPage(Jobb.getCurrentPage() + 1);
		} else if(target === 'previous'){
			Jobb.setCurrentPage(Jobb.getCurrentPage() - 1);
		} else if(target === 'first'){
			Jobb.setCurrentPage(1);
		} else { // Last page
			Jobb.setCurrentPage(Jobb.getNumPages());
		}
		// $scope.updateSearchOptions("sida",$scope.sida());
		$scope.search($scope.query,true);
	}

	$(window).resize(function(){ // Listen for window resize to decide size of navigation buttons
    	$scope.$apply(function(){
    		$scope.pageNavSizeTest();
    	});
	});

	$scope.pageNavSizeTest = function(){ // 
		if(window.innerWidth < 750){
			$scope.smallNavButtons = true;
		} else {
			$scope.smallNavButtons = false;
		}
	}

	$scope.pageNavButtonText = function(){
		if($scope.smallNavButtons){
			$scope.buttonMessages = {
				previous: "",
				first: "",
				next: "",
				last: "",
				infoText: $scope.sida()+" / "+$scope.numPages()
			}
		} else {
			$scope.buttonMessages = {
				previous: "Föregående",
				first: "Första",
				next: "Nästa",
				last: "Sista",
				infoText: "Visar sida "+$scope.sida()+" av "+$scope.numPages()
			}
		}
		return $scope.buttonMessages;
	}

	$scope.pageNavSizeTest(); // Determine the size of the navigation buttons of the bottom of the menu depending of the screen size. 

	// Check if the model contains any search params
	if(Object.keys(Jobb.getSearchParams()).length === 0){ // No search params in model
		Jobb.addSearchParam('nyckelord',"");
		Jobb.addSearchParam('antalrader',10);
		Jobb.addSearchParam('sida',1);
	} else {
		// var searchParams = Jobb.getSearchParams();
		// for(param in searchParams){
		// 	console.log(param);
		// 	console.log(searchParams[param]);
		// }
		if(Object.keys(Jobb.getSearchParams()).length > 3){
			$scope.toggleFilter();
		}
	}

	if(Jobb.getPendingQuery()!=undefined){ // If you search from the home page, run the query.
		Jobb.resetSearchParams();
		Jobb.addSearchParam("sida", 1);
		Jobb.addSearchParam("antalrader", 10);
		resetFilters("county");
		resetFilters("municipality");
		resetFilters("lineOfWork");
		resetFilters("profession");
		$scope.query = Jobb.getPendingQuery();
		$scope.search(Jobb.getPendingQuery(),false);
		Jobb.removePendingQuery();
	}
});