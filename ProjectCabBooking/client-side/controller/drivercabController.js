myangu.controller('drivercabController', function($scope, $http, $location)
{
$scope.SeeDriver = function()
{
  $http.get('/dr/readDriver').then(function(response)
  {
  $scope.DriverData = response.data;
  }
);
}

$scope.SaveDriver = function()
{
        $http.post('/dr/writeDriver', $scope.DriverMyScope).then(function (response)
        {
          console.log('Driver saved');
          DriverMyScope = '';  // empty scope to avoid old values later
        });
        $scope.SeeDriver();
}


$scope.EditDriver = function(driver)
{
$scope.SeeDriver();
$http.get('/dr/changeDriver/' + driver._id).then(function(response)
{
   $scope.DriverData = response.data[0];
});
}

$scope.UpdateDriver = function()
{
    $http.put('/dr/amendDriver/' + $scope.DriverData._id, $scope.DriverMyScope).then(function (response) {
        console.log('Driver Updated');
    });
    $scope.SeeDriver();
}

$scope.RemoveDriver = function(driver)
{
    $http.delete('/dr/eraseDriver/' + driver._id).then(function(response)
    {
        console.log('Driver Deleted');
    });
    $scope.SeeDriver();
}

$scope.SeeDriver();
});
