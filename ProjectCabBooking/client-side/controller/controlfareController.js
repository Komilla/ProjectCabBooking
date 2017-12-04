myangu.controller('controlfareController', function($scope, $http, $location)
{
$scope.FareMyScope;
$scope.SeeDriver = function()
{
  $http.get('/dr/readDriver').then(function(response)
  {
  $scope.DriverData = response.data;
  }
);
}

$scope.SeeFare = function()
{
  $http.get('/fa/readFare').then(function(response)
  {
  $scope.FareData = response.data;
  }
);
}

$scope.SaveFare = function()
{
        $scope.FareMyScope.cBusyStart = document.getElementById("one").value + ':' + document.getElementById("two").value + ' ' + document.getElementById("three").value;
        $scope.FareMyScope.cBusyEnd = document.getElementById("four").value + ':' + document.getElementById("five").value + ' ' + document.getElementById("six").value;
        $http.post('/fa/writeFare', $scope.FareMyScope).then(function (response)
        {
          console.log('Fare saved');
           FareMyScope = ''; // empty scope to avoid old values later
        });
        // $('#hideNseek').show();
        $scope.SeeFare();
}

$scope.EditFare = function(myarg)
{
$scope.SeeFare();
$http.get('/fa/changeFare/' + myarg._id).then(function(response)
{
   $scope.FareData = response.data[0];
});
}

$scope.UpdateFare = function()
{
    $http.put('/fa/amendFare/' + $scope.FareData._id, $scope.FareMyScope).then(function (response) {
        console.log('Fare Updated');
    });
    $scope.SeeFare();
}

$scope.RemoveFare = function(myarg)
{
    $http.delete('/fa/eraseFare/' + myarg._id).then(function(response)
    {
        console.log('Fare Deleted');
    });
    $scope.SeeFare();
}
$scope.SeeDriver();
$scope.SeeFare();
});
