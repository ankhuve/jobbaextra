jobbaExtraApp.factory('Jobb',function ($resource, $cookieStore, $http) {
  var savedJobs = [];
  var searchResults = [];
  var loginMessage = "";
  var pendingQuery;
  var requestedUserType = "user";
  var numHits = 0;
  var numPages;
  var currentPage = 1;
  // var searchParams = {};
  var municipalities = [];
  var professions = [];
  var counties = [];
  var linesOfWork = [];
  var appliedSearchParams = {};
  var currentInputSearchParams = {};


  if($cookieStore.get("pendingID")!=undefined){
    var pendingID = $cookieStore.get("pendingID");
  }

  if($cookieStore.get("token") != undefined){
    var loggedIn = true;
    var role = $cookieStore.get("role");
    var loggedInUser = $cookieStore.get("username");
    var req = {
      url: "php/getSavedJobs.php",
      method: "GET",
      params: {userID:$cookieStore.get("userID")}
    }
    $http(req).success(function(data){
      savedJobs = data["savedJobs"];
    })
 //    {
 //    url: user.details_path, 
 //    method: "GET",
 //    params: {user_id: user.id}
 // }
 //    $http.get({"url":'php/getSavedJobs.php',"dataParams").success(function(data){
 //      // if(data["valid"]){
 //      savedJobs = data["savedJobs"];
      // } else {
        // console.log("Invalid token!");
      // }
    // })
  } else {
    var loggedIn = false;
    var role = "guest";
    var loggedInUser = "";
  }

  this.getSavedJobsFromDb = $resource('php/getSavedJobs.php');

  this.getJobs = $resource('php/getJobs.php');
  this.getJob = $resource('php/getJob.php');

  // this.getLan = $resource('php/getLan.php');
  this.getCategory = $resource('php/getCategory.php');
  this.getYrkesgrupper = $resource('php/getYrkesgrupper.php');
  this.getKommun = $resource('php/getKommun.php');

  this.removeSaved = $resource('php/deleteSavedJob.php');
  this.login = $resource('php/login.php');
  this.checkLogin = $resource('php/checkLogin.php');
  this.terminateSession = $resource('php/terminateSession.php');

  this.getLoginMessage = function(){
    return loginMessage;
  }

  this.setLoginMessage = function(message){
    loginMessage = message;
  }

  this.addPendingID = function(annonsID){
    $cookieStore.put("pendingID",annonsID);
    pendingID = annonsID;
  }

  this.removePendingID =function(){
    $cookieStore.remove("pendingID");
    pendingID = "";
  }

  this.getPendingID = function(){
    return pendingID;
  }

  this.setRole = function(inputRole){
    role = inputRole;
  }

  this.getRole = function(){
    return role;
  }

  this.setLoggedIn = function(value){
    loggedIn = value;
  }

  this.isLoggedIn = function(){
    return loggedIn;
  }

  this.setLoggedInUser = function(username){
    loggedInUser = username;
  }

  this.getLoggedInUser = function(){
    return loggedInUser;
  }

  this.addPendingQuery = function(query){
    pendingQuery = query;
  }

  this.getPendingQuery = function(){
    return pendingQuery;
  }

  this.removePendingQuery = function(){
    pendingQuery = null;
  }

  this.addSearchResults = function(results){
    searchResults = results;
  }

  this.applySearchParams = function(){
    appliedSearchParams = $.extend(true,{},currentInputSearchParams);
  }

  this.addSearchParam = function(param, val){
    currentInputSearchParams[param] = val;
  }

  this.addAppliedSearchParam = function(param, val){
    appliedSearchParams[param] = val;
  }

  this.removeSearchParam = function(param){
    delete currentInputSearchParams[param];
  }

  this.resetSearchParams = function(){
    currentInputSearchParams = {};
  }

  this.getSearchParams = function(){
    return appliedSearchParams;
  }

  this.getSearchParamsNotApplied = function(){
    return currentInputSearchParams;
  }
  
  this.addCounties = function(data){
    var defaultOption = {namn:"Välj län...", id:null};
    counties.push(defaultOption);
    for(county in data){
      counties.push(data[county]);
    }
  }

  this.getCounties = function(){
    return counties;
  }

  this.addLinesOfWork = function(data){
    var defaultOption = {namn: "Välj yrkesområde...", id:null};
    linesOfWork.push(defaultOption);
    for(line in data){
      linesOfWork.push(data[line]);
    }
  }

  this.getLinesOfWork = function(){
    return linesOfWork;
  }

  this.addMunicipalities = function(data){
    municipalities = [];
    var defaultOption = {namn: "Välj kommun...", id:null};
    municipalities.push(defaultOption);
    for(line in data){
      municipalities.push(data[line]);
    }
    // municipalities = data;
  }

  this.getMunicipalities = function(){
    return municipalities;
  }

  this.addProfessions = function(data){
    professions = [];
    var defaultOption = {namn: "Välj yrkesgrupp...", id:null};
    professions.push(defaultOption);
    for(line in data){
      professions.push(data[line]);
    }
  }

  this.getProfessions = function(){
    return professions;
  }

  this.getSearchResults = function(){
    return searchResults;
  }

  this.setNumHits = function(hits){
    numHits = hits;
  }

  this.getNumHits = function(){
    return numHits;
  }

  this.setNumPages = function(pages){
    numPages = pages;
  }

  this.getNumPages = function(){
    return numPages;
  }

  this.setCurrentPage = function(page){
    currentPage = page;
  }

  this.getCurrentPage = function(){
    return currentPage;
  }

  this.addSavedJob = function(job){
    savedJobs.push(job);
  }

  this.removeSavedJob = function(id){
    for(var job in savedJobs){
      if(savedJobs[job].jobID === id){
        savedJobs.splice(job,1);
      }
    }
  }

  this.getSavedJobs = function(){
    return savedJobs;
  }

  this.clearSavedJobs = function(){
    savedJobs = [];
  }

  this.getRequestedUserType = function(){
    return requestedUserType;
  }

  this.setRequestedUserType = function(userType){
    requestedUserType = userType;
  }

  this.createSession = function(sessionID, userID, userRole, username, token){
    $cookieStore.put("sessionID", sessionID);
    $cookieStore.put("userID", userID);
    $cookieStore.put("token", token);
    $cookieStore.put("role", userRole);
    $cookieStore.put("username",username);
  }

  this.killSession = function(){
    $cookieStore.remove("sessionID");
    $cookieStore.remove("userID");
    $cookieStore.remove("token");
    $cookieStore.remove("role");
    $cookieStore.remove("username");
    if($cookieStore.get("pendingID")!=undefined){
      this.removePendingID();
    };
  }

  this.dateDifference = function(datePublished){
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var firstDate = datePublished;
    var secondDate = new Date();
    var diffDays = Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay));
    return diffDays;
  }

  return this;
});