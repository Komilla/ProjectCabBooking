myangu.controller('profileController', function($rootScope, $scope, $http, AuthenticationService, $location, $cookies)
{
    $scope.UserData;
    var authUser = $cookies.getObject('authUser');
    $scope.meID = authUser.currentUser.userInfo.myID;
  
    $scope.changeMyPassword = function ()
    {
              if ($scope.UserMyScope.Password !== $scope.UserMyScope.confirmPassword)
              {
                  alert("Oh God, New Password is not same as Confirm Password");
              }
              else
              {
                $scope.UserMyScope.Password = document.getElementById('passwordID').value;

                $http.put('/us/amendUser/' + $scope.meID, $scope.UserMyScope).then(function (response)
                  {
                    alert('Well Done, you have updated your password');
                    $location.path('/login');
                  });
              }
     }
     $scope.SeeUser = function()
     {
         $http.get('/us/readUser').then(function(response)
             {
                 $scope.UserData = response.data;
             }
         );
     }
     $scope.SeeUser();
});
