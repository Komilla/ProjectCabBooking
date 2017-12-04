myangu.controller('logoutController', function($http, $scope, $rootScope, AuthenticationService, $location)
{

  $scope.LogoutUser = function()
  {
   AuthenticationService.authLogout();
   $rootScope.currentUser = {};
   delete $rootScope.currentUser;
   sessionStorage.clear();
  }
$scope.LogoutUser();
});
