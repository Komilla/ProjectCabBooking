myangu.controller('ridesController', function($http, $scope, $location)
{
    $scope.SeeDriver = function()
    {
        $http.get('/dr/readDriver').then(function(response)
            {
                $scope.DriverData = response.data;
            }
        );
    }
    $scope.SeeRidenow = function()
    {
        $http.get('/now/readRidenow').then(function(response)
            {
                $scope.RidenowData = response.data;
            }
        );
    }

    $scope.SaveRidenow = function()
    {
        $http.post('/now/writeRidenow', $scope.RidenowMyScope).then(function (response)
        {
            console.log('Ridenow saved');
            RidenowMyScope = '' ; // empty scope to avoid old values later
        });
        $scope.SeeRidenow();
    }

    $scope.EditRidenow = function(myarg)
    {
        $http.get('/now/changeRidenow/' + myarg._id).then(function(response)
        {
            $scope.RidenowData = response.data[0];
        });
    }
    $scope.UpdateRidenow = function()
    {
        $http.put('/now/amendRidenow/' + $scope.RidenowData._id, $scope.RidenowMyScope).then(function (response) {
            console.log('Ridenow Updated');
        });
        $scope.SeeRidenow();
    }
    $scope.RemoveRidenow = function(myarg)
    {
        $http.delete('/now/eraseRidenow/' + myarg._id).then(function(response)
        {
            console.log('Ridenow Deleted');
        });
        $scope.SeeRidenow();
    }
    $scope.SeeDriver();
    $scope.SeeRidenow();
    $scope.SeeDriver = function()
    {
        $http.get('/dr/readDriver').then(function(response)
            {
                $scope.DriverData = response.data;
            }
        );
    }
    $scope.SeeDriver();
});
