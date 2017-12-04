myangu.controller('registerController', function($scope, $http, $location)
{
$scope.SaveUser = function()
{
  if ($scope.UserMyScope.Password !== $scope.UserMyScope.confirmPassword)
  {
      alert("New Password should be same as Confirm Password");
  }
else
  {
        $http.post('/us/writeUser', $scope.UserMyScope).then(function (response)
        {
          console.log('User saved');
        });
        alert(" Wonderful you are now our Registered User !!! ");
        $location.path('/login');
  }
}
});
