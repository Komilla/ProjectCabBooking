myangu.controller('navbarController', function ($http, $rootScope, $scope, $location, $cookies, AuthenticationService)
  {
    $rootScope.myUsername = '';
    $rootScope.myUserrole = '';
    $rootScope.isLoggedIn = false;

     function navUser()
     {
       var authUser = $cookies.getObject('authUser');

        if (authUser != undefined)
        {
        var loggedInUser = authUser.currentUser.userInfo;
        var isLoggedIn = authUser.currentUser.isLoggedIn;
            if (isLoggedIn)
            {
            $rootScope.isLoggedIn = isLoggedIn;
            $rootScope.myUsername = loggedInUser.myUsername;
            $rootScope.myUserrole = loggedInUser.myUserrole;
            $rootScope.myEmail = loggedInUser.myEmail;
            $rootScope.myMobile = loggedInUser.myMobile;
            }
        }
        else
        {
        $rootScope.isLoggedIn = false;
        }
    }

      navUser();
});