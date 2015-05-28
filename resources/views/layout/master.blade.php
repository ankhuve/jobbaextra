<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="sv" ng-app="jobbaExtra">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="description" content="Utvecklingssite för Jobbaextra.com" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0" minimal-ui>
    <meta name="keywords" content="extrajobb, sommarjobb, jobb, extra" />
    <title>Under utveckling</title>
    <link rel="stylesheet" type="text/css" href="../bower_components/bootstrap.css/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/style.css" media="screen"/>
    <link href='http://fonts.googleapis.com/css?family=Roboto:100,300,700|Raleway:400' rel='stylesheet' type='text/css'>
    <script src="https://code.jquery.com/jquery.js"></script>

    <script src="../bower_components/angular/angular.js"></script>
    <script src="../bower_components/angular-route/angular-route.js"></script>
    <script src="../bower_components/angular-resource/angular-resource.js"></script>
    <script src="../bower_components/angular-cookies/angular-cookies.js"></script>

    <script src="js/menuController.js"></script>

    <script src="js/app.js"></script>

    <script src="js/jobService.js"></script>

    <script src="js/searchCtrl.js"></script>
    <script src="js/homeCtrl.js"></script>
    <script src="js/loginCtrl.js"></script>
    <script src="js/appCtrl.js"></script>
    <script src="js/profileCtrl.js"></script>
    <script src="js/companyCtrl.js"></script>
    <script src="js/jobCtrl.js"></script>
    <script src="js/registerCtrl.js"></script>
    <script src="js/aboutCtrl.js"></script>

</head>
<body ng-controller="AppCtrl">

<nav id="header">
    <a class="headerLogo" ng-click="closeMenu()" ng-href="#/home"><img src="img/jobbaextra_logo.png"></a>
    <div class="loggedInHeader" ng-show="loggedIn()">
        Du &auml;r inloggad som <strong>username</strong>, du har <strong>antal</strong> sparade annonser!
        <button class="logoutButton" ng-click="logout()">Logga ut</button>
    </div>
    <img id="hamburgerIcon" src="img/thin_burger.png" ng-click="toggleMenu()">
    <div id="linksRow">
        <div class="navLinks">
            <div class="linkBox">
                <h4><a class="navLink" ng-click="closeMenu()" ng-href="#/home">Start</a></h4>
            </div>
            <div class="linkBox">
                <h4><a class="navLink" ng-click="closeMenu()" ng-href="#/search">Leta jobb</a></h4>
            </div>
            <div class="linkBox" ng-show="showSearchEmployee()">
                <h4><a class="navLink" ng-click="closeMenu()" ng-href="#/company">Leta arbetskraft</a></h4>
            </div>
            <div class="linkBox" ng-show="loggedIn()">
                <h4><a class="navLink" ng-click="closeMenu()" ng-href="#/profile">Mina sidor</a></h4>
            </div>
            <div class="linkBox" ng-hide="loggedIn()">
                <h4><a class="navLink" ng-click="closeMenu();clearLoginMessage()" ng-href="#/login">Logga in</a></h4>
            </div>
            <div class="linkBox">
                <h4><a class="navLink" ng-click="closeMenu()" ng-href="#/about">Om oss</a></h4><button class="logoutButton mediumSizeNav" ng-click="logout()" ng-show="loggedIn()">Logga ut</button>
            </div>
        </div>
    </div>

</nav>

<div class="view" ng-click="closeMenu()" ng-view>
</div>

<footer>
    <center>
        <img id="footerLogo" src="img/jobbaextra_logo.png">
        <div id="footerLinks">
            <a ng-href="#/search"><h4 class="footerLink">Leta jobb</h4></a>
            <a ng-href="#/company"><h4 class="footerLink">Leta arbetskraft</h4></a>
            <a ng-href="#/about"><h4 class="footerLink">Om oss</h4></a>
        </div>
    </center>
</footer>
</body>
</html>