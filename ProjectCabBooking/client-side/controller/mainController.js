myangu.controller('mainController', function($rootScope, $scope, $http, AuthenticationService, $location, $cookies)
{
  $scope.cEmailofDriver = sessionStorage.getItem('sessionDrEmail');
  $scope.d_lat;
  $scope.d_lng;
  var map;
  var infoWindow;
  $scope.myMap=function()
  {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 28.63295, lng: 77.219433},
    zoom: 12
  });
  infoWindow = new google.maps.InfoWindow;

if (navigator.geolocation)
{
    navigator.geolocation.getCurrentPosition(function(position) {
    var pos =
    {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
    };
    $scope.d_lat=pos.lat;
    $scope.d_lng=pos.lng;
    var marker = new google.maps.Marker(
      {
        position: pos,
        map:map,
        icon:"../media/allmarker.jpg",
        draggable: false
      });
    infoWindow.setPosition(pos);
    infoWindow.setContent('You are currently at this Location!');
    infoWindow.open(map);
    map.setCenter(pos);
    var mySocket = io();
    mySocket.emit('my other event',
    {
      lat :$scope.d_lat,
      lng:$scope.d_lng,
      sEmail:$scope.cEmailofDriver
    });
    mySocket.on('my other event', function(a)
    {
    });
    }, function()
    {
      handleLocationError(true, infoWindow, map.getCenter());
    });
    }
    else
    {
      handleLocationError(false, infoWindow, map.getCenter());
    }
    }
    function handleLocationError(browserHasGeolocation, infoWindow, pos)
    {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }
      $scope.u=$scope.u;
      var a=$scope.u
      $scope.send=function()
      {
      }
      var savedata=function()
      {
        $scope.s.lat=$scope.d_lat;
        $scope.s.lng=$scope.d.lat;
        $http.get('/loc/readRideloc/'+$scope.cEmailofDriver).then(function(response)
        {
          if(response)
          {
          }
          else
          {
            $http.post('/loc/writeRideloc',$scope.s,function(response)
            {
            });
          }
        });
      };
      var a1;
      var otherSocket = io();
      otherSocket.on('client', function (a)
      {
        $scope.cName=a.cname;
        $scope.cmobile1=a.cmobile;
        $scope.pickuplocation1=a.pickuplocation;
        $scope.destination1=a.destination;
        $scope.cPlate=a.cPlate;
        if($scope.cName!=undefined)
        {
         $scope.b();
        }
        else
        {
          console.log('customer name from passenger-controller is not yet defined');
        }
      });

        $scope.b=function()
        {
          sessionStorage.setItem('dlnumber',$scope.cPlate);
          data();
        }
        var data=function()
        {
          $scope.cPlate1 = sessionStorage.getItem('sessionDrEmail');
          $scope.cDrStatus="booked";
          $http.get('/now/readRidenow/'+$scope.cPlate1+'/'+$scope.cDrStatus).then(function(response)
            {
              $scope.d=response.data;
            });
        }
        data();
        $scope.endTrip=function()
        {
        var r = confirm("Are you sure you want to Proceed?");

        if(r==true)
        {
          $scope.data=$scope.d._id;
          var updatebookingstatus=
          {
            sDrStatus:"unbooked"
          };
          $http.put('/now/amendRidenow/'+$scope.data,JSON.stringify(updatebookingstatus)).then(function(response)
          {
            data();
          })
        }
      }
});
