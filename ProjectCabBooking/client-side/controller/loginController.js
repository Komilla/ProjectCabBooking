myangu.controller('loginController', function($rootScope, $scope, $http, AuthenticationService, $location, $route)
{
$scope.CheckUser = function()
{
  AuthenticationService.authLogin($scope.UserMyScope, function(response) {
      if (response.data.success === true) {
          console.log(' Well Done you are signed in !!! ');

          if(response.data.userDetail.sUserrole=="passenger")
          {
            sessionStorage.setItem('sessionPaEmail',response.data.userDetail.sEmail);
            $location.path('/passenger');
          }
          else if(response.data.userDetail.sUserrole=="driver")
          {
            sessionStorage.setItem('sessionDrEmail',response.data.userDetail.sEmail);
            $location.path('/main');
          }
          else if(response.data.userDetail.sUserrole=="admin")
          {
            sessionStorage.setItem('sessionAdEmail',response.data.userDetail.sEmail);
            $location.path('/controlfare');
          }
      }
      else
      {
          alert(" Oops your credentials did not match !!! ");
          $location.path('/login');
      }
  });
}
    $scope.MovetoRegister = function()
    {
        $location.path('/register');
    }
});
