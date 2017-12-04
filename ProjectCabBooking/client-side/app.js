var myangu = angular.module('buggyApp', [ 'ngRoute', '720kb.datepicker', 'ngCookies', 'ngStorage','google-maps']);

myangu.config(function($routeProvider, $locationProvider) {

$locationProvider.hashPrefix('');   // to remove extra # % ! from URL

  $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'mainController'
      //   ,
    // access: {restricted: false}
  })
  .when('/passenger', {
     templateUrl: 'views/passenger.html',
     controller: 'passengerController'
      //   ,
     // access: {restricted: false}
      })
  .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'loginController'
      // ,
      // access: {restricted: false}
    })
    .when('/logout', {
      templateUrl: 'views/logout.html',
      controller: 'logoutController'
      //   ,
      // access: {restricted: false}
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'registerController'
      //   ,
      // access: {restricted: false}
    })
  .when('/profile', {
    templateUrl: 'views/profile.html',
    controller: 'profileController'
    //   ,
    // access: {restricted: true}
  })
  .when('/rides', {
    templateUrl: 'views/rides.html',
    controller: 'ridesController'
    //   ,
    // access: {restricted: true}
  })
  .when('/drivercab', {
    templateUrl: 'views/drivercab.html',
    controller: 'drivercabController'
      //,
    //access: {restricted: true}
  })
  .when('/controlfare', {
    templateUrl: 'views/controlfare.html',
    controller: 'controlfareController'
      // ,
    // access: {restricted: true}
  })
  .when('/navbar', {
    templateUrl: 'views/navbar.html',
    controller: 'navbarController'
      //,
  //  access: {restricted: false}
  })
  .when('/main', {
    templateUrl: 'views/main.html',
    controller: 'mainController'
      //,
//    access: {restricted: false}
  })
  .otherwise({
    redirectTo: '/main'
  });
});

myangu.run(function($rootScope, $http, $location, $sessionStorage, $cookies, AuthenticationService)
{

    if ($sessionStorage.tokenDetails) {
         $http.defaults.headers.common.Authorization = $sessionStorage.tokenDetails.token;
    }

    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        var publicPages = ['/', '/login', '/register', '/main'];

        var authUser = $cookies.getObject('authUser');

        var adminPage = ['/', '/drivercab', '/controlfare', '/drivercab', '/passenger', '/login', '/logout', '/profile', '/register', '/rides', '/main'];
        var passengerPage = ['/', '/passenger', '/login', '/logout', '/profile', '/register', '/rides', '/main'];
        var driverPage = ['/', '/login', '/logout', '/profile', '/register', '/rides', '/main'];

        if (authUser != undefined)
        {
            var loggedInUser = authUser.currentUser.userInfo;
        }

        var restrictedPage = publicPages.indexOf($location.path()) === -1;

        if (restrictedPage && !$sessionStorage.tokenDetails && $location.path() != '')
        {
            alert("You need to Login first to access this Page!");
            $location.path('/login');
        }

        else {
            if (authUser != undefined) {
                if (authUser.currentUser.userInfo.myUserrole == 'admin') {
                    var IamnotAdmin = adminPage.indexOf($location.path()) === -1;
                    if (IamnotAdmin) {
                        $location.path('/login');
                    }
                }
                if (authUser.currentUser.userInfo.myUserrole == 'passenger') {
                    var IamnotPassenger = passengerPage.indexOf($location.path()) === -1;
                    if (IamnotPassenger) {
                        $location.path('/login');
                    }
                }
                if (authUser.currentUser.userInfo.myUserrole == 'driver') {
                    var IamnotDriver = driverPage.indexOf($location.path()) === -1;
                    if (IamnotDriver) {
                        $location.path('/login');
                    }
                }
            }
        }
    });
});
