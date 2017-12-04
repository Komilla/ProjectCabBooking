myangu.controller('passengerController', function($sessionStorage, $scope, $http, AuthenticationService, $location, $cookies)
{
  $(document).ready(function()
  {
  $('#hideNseek').hide();
  $('#hideNseekagain').hide();
  });

  // Date Variable to set Start Date
  $scope.myDateVar = new Date().toDateString();

  $scope.SeeRidenow = function()
  {
	$http.get('/now/readRidenow').then(function(response)
	{
	$scope.RidenowData = response.data;
	}
  );
  }
  $scope.SeeRidenow();
  $scope.EditRidenow = function(myarg)
  {
  $http.get('/now/changeRidenow/' + myarg._id).then(function(response)
  {
	 $scope.RidenowData = response.data[0];
  });
  }
  $scope.RemoveRidenow = function(myarg)
  {
	  $http.delete('/now/eraseRidenow/' + myarg._id).then(function(response)
	  {
		  console.log('Ridenow Deleted');
	  });
	  $scope.SeeRidenow();
  }

  $sessionStorage.latlng;
  $scope.lat;
  $scope.lng;
  var myLatLng;
  $scope.cEmailofDriver = sessionStorage.getItem('sessionDrEmail');
	var directionsService = new google.maps.DirectionsService();
	var geocoder = new google.maps.Geocoder();

  // fetching current location open
  if (navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(function (position)
    {
      var myloc =
      {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      // Variables
      $scope.lat = myloc.lat;
      $scope.lng = myloc.lng;

      // reverse geocoding starts - to display current location
      geocoder.geocode({'latLng': myloc}, function(results, status)
      {
          if (status == google.maps.GeocoderStatus.OK)
          {
              if (results[0])
              {
                  document.getElementById('cSourceID').value = results[0].formatted_address;
              }
          }
      });
      // reverse geocoding ends - to display current location

    });
  }

  var map = new google.maps.Map(document.getElementById('map'),
    {
      center: { lat: 28.63295, lng: 77.219433 },
      zoom: 12
    });

    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(function(position) {
        var pos =
        {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        };

    // google marker
    var marker = new google.maps.Marker(
      {
        position: pos,
        map:map,
        title: 'Pick-Up Point',
        icon:"../media/passengermarker.jpg",
        draggable: true
      });
      map.setCenter(marker.getPosition());

      // to change default marker position
      google.maps.event.addListener(marker, 'dragend', function() {
      myNewMarkerPosition=marker.getPosition();
      geocoder.geocode({ 'latLng': myNewMarkerPosition }, function (results, status)
      {
           if (status == google.maps.GeocoderStatus.OK) {
                 if (results[1])
                 {
                    myNewPosition=results[1].formatted_address;
                    document.getElementById('cSourceID').value=myNewPosition;
                 }
                 else
                 {
                    alert("Cannot read new location");
                 }
             }
             else
             {
                alert("new position not Available");
             }
        }); // end geocode
      }); // end addListener


    }); // end getCurrentPosition
  } // end navigator.geolocation

	// instantiate google map objects for directions
	var directionsDisplay = new google.maps.DirectionsRenderer
	({
    draggable: true
	});
directionsDisplay.setMap(map);


// autocomplete code starts here
// autocomplete refrence taken from
// https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform
function myAutocomplete()
{
  document.getElementById('cSourceID').value = new google.maps.places.Autocomplete((document.getElementById('cSourceID')), {types: ['geocode']});
  document.getElementById('cDestinID').value = new google.maps.places.Autocomplete((document.getElementById('cDestinID')), {types: ['geocode']});
}
myAutocomplete();
// autocomplete code ends here


	// get directions using google maps api
	$scope.getDirections = function()
	{
			var myRequest =
			{
      origin: document.getElementById('cSourceID').value,
			destination: document.getElementById('cDestinID').value,
			provideRouteAlternatives: true,
			travelMode: google.maps.DirectionsTravelMode.DRIVING,
      drivingOptions:
      {
        departureTime: new Date(Date.now()),
        trafficModel: 'bestguess'
      },
			unitSystem: google.maps.UnitSystem.METRIC,
			avoidHighways: false,
			avoidTolls: false
	  	};

	  directionsService.route(myRequest, function (response, status) {
		if (status === google.maps.DirectionsStatus.OK)
		{
		  directionsDisplay.setDirections(response);
      directionsDisplay.setMap(map);
		  directionsDisplay.setPanel(document.getElementById('directionsList'));

      document.getElementById('myRouteDistance').innerHTML = ((directionsDisplay.directions.routes[0].legs[0].distance.value)/1000).toFixed(2);
      document.getElementById('myRouteDuration').innerHTML = ((directionsDisplay.directions.routes[0].legs[0].duration.value)/60).toFixed(0);

      // this will read loacations through draggable markers
      directionsDisplay.addListener('directions_changed', function(response, status)
      {
      // this will display the UPDATED Distance, Duration & Amount after dragging markers
      document.getElementById('myRouteDistance').innerHTML = ((directionsDisplay.directions.routes[0].legs[0].distance.value)/1000).toFixed(2);
      document.getElementById('myRouteDuration').innerHTML = ((directionsDisplay.directions.routes[0].legs[0].duration.value)/60).toFixed(0);
      });

      $scope.myRideScope.cDistance = document.getElementById('myRouteDistance').innerHTML;
      $scope.myRideScope.cDuration = document.getElementById('myRouteDuration').innerHTML;
    }
		else
		{
		  alert('Oh My God! We could not find the location on planet earth!!!');
		}
	  });
	}

var mySocket = io();
mySocket.on('my other event', function(data)
{
  $scope.lat=data.lat;
  $scope.lng=data.lng;
  $scope.cEmailofDriver=data.sEmail;
  if(data.sEmail!=undefined)
  {
  $scope.enable=false;
  }
  else
  {
  $scope.enable=true;
  }
  });

$scope.SeeDriver = function()
{
  if($scope.cEmailofDriver!=undefined)
  {
    $scope.enable=false;
  }
  else
  {
    $scope.enable=true;
  }
$http.get('/dr/readDriver').then(function(response)
{
$scope.sVehicle = response.data;
}
);
mySocket.on('my other event', function (data) {
  $scope.lat=data.lat;
  $scope.lng=data.lng;
$scope.cEmailofDriver=data.sEmail;
if(data.sEmail!=undefined)
{
  $scope.enable=false;
}
else
{
$scope.enable=true;
}
});
}
$scope.SeeDriver();

$scope.SeeFare=function()
{
  $http.get('/fa/readFare').then(function(response)
    {
    $scope.cCar1=response.data;
    })
};
$scope.SeeFare();

$scope.rideOne=function()
{
var address = document.getElementById('cSourceID').value;
var cDestin = document.getElementById('cDestinID').value;

var dept=$scope.myRideScope.AbYaTab;
    if(dept=="Ab")
    {
      geocoder = new google.maps.Geocoder();
      if (geocoder)
      {
         geocoder.geocode({'address':address}, function (results, status)
         {
           if (status == google.maps.GeocoderStatus.OK)
           {
            var dlat=results[0].geometry.location.lat();
            var dlang=results[0].geometry.location.lng();
            var lat=$scope.lat;
            var lng=$scope.lng;

            function distance1(lat1, lon1, lat2, lon2, unit)
            {
            var radlat1 = Math.PI * lat1/180
            var radlat2 = Math.PI * lat2/180
            var radlon1 = Math.PI * lon1/180
            var radlon2 = Math.PI * lon2/180
            var theta = lon1-lon2
            var radtheta = Math.PI * theta/180
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist)
            dist = dist * 180/Math.PI
            dist = dist * 60 * 1.1515
            if (unit=="K") { dist = dist * 1.609344 }
            if (unit=="N") { dist = dist * 0.8684 }
            return dist
          }

          var distance2 = distance1(lat, lng, dlat,dlang, 'K');
          var dit=parseFloat(Math.round(distance2*1000)/1000);
          if(isNaN(dit) || dit>2.0)
              {
                alert('cab is very far or not avaliable');
              }
          else // this is if Cab is located nearby
          {
            console.log("Cab Found!");
          }
      }
      else // this is in case (status != google.maps.GeocoderStatus.OK)
      {
            alert('cab location not Available');
      }
    });
  }
         else  // in case geocoder is not showing results
         {
           alert('geocoder not Working');
         }
      } // closing tag for dept=="Ab"
}

$scope.rideTwo=function()
{
$scope.dept=$scope.myRideScope.AbYaTab;
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
$scope.myRideScope.time1=time;
$scope.myRideScope.date1=date;
$scope.cCar=$scope.myRideScope.bookVehicleType
$scope.cSource=$scope.myRideScope.cSource;
$scope.cDestin=$scope.myRideScope.cDestin;
$scope.cCar=$scope.myRideScope.bookVehicleType;
$http.get('/us/readUser/'+$scope.cEmail).then(function(response)
{
$scope.myRideScope.cPaName=response.data.sUsername;
$scope.cPaName=$scope.myRideScope.cPaName;
$scope.myRideScope.cPaMobile=response.data.sMobile;
$scope.cPaMobile=$scope.myRideScope.cPaMobile;
$scope.myRideScope.cEmailofDriver=$scope.cEmailofDriver;
$scope.myRideScope.cEmailofPass=$scope.cEmail;
});
if($scope.dept=="Tab")
    {
    $http.get('/fa/readFare/'+$scope.cCar).then(function(response)
    {
    var time=  $("#time").val();
    var t=time.split(":");
    var t1=t[0];
    var t2=t[1];
    var d=new Date();
    d.setHours(t1,t2);
    var t=response.data.sBusyStart;
    var t1=t.split(" ")
    var t2=t1[0].split(":");
    var t3=t2[0];
    var t4=t2[1];
    var d1=new Date();
    d1.setHours(t3,t4);
    var v=response.data.sBusyEnd;
    var v1=v.split(" ");
    var v2=v1[0].split(":");
    var v3=v2[0];
    var v4=v2[1];
    var dv1=new Date();
    dv1.setHours(v3,v4);
        if(d>=d1 && d<=dv1)
        {
        $scope.rate=response.data.sBusyRates;
        }
        else
        {
          $scope.rate=response.data.sRelaxedRates;
        }
        var dist=$scope.myRideScope.cDistance;
    $scope.myRideScope.cAmount1=Math.round(dist*$scope.rate);
    var ptime=d.getHours()+":"+d.getMinutes();
    var date1= $("#demo").val();
    var d1=date1.split("/");
    var d2=d1[0];
    var d3=d1[1];
    var d4=d1[2];
    d.setFullYear(d4,d3,d2);
    var pdate=d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate();
    var diffDays = parseFloat(d.getDate() - today.getDate());
    var pdattime=pdate+" "+ptime;
    var laterdata=
    {
    cSource :$scope.myRideScope.cSource,
    cDestin : $scope.myRideScope.cDestin,
    cAmount : $scope.myRideScope.cAmount1,
    cCar : $scope.myRideScope.bookVehicleType,
    cPaName : $scope.myRideScope.cPaName,
    cPaMobile :$scope.myRideScope.cPaMobile,
    cEmailofPass :$scope.cEmail,
    cDistance : $scope.cDistance,
    cReserveDate : date,
    cRideDate : pdattime,
    cDrStatus : "Cab Unassigned",
    cEmailofDriver : "Cab Unassigned",
    cDrName : "Cab Unassigned",
    cDrPlate : "Cab Unassigned",
    cDrMobile : "Cab Unassigned",
    cPaStatus :"Advance",
    cRideType : "Advance"
    };
        if(diffDays<5 && diffDays>=1)
        {
        $http.post('/Ab/writeRidenow',laterdata).then(function(response)
        {
        })
        alert("Cab has been Booked for "+date1);
        }
        else if(diffDays==0)
        {
        alert("Please Choose Current Booking Option First");
        }
        else
        {
        alert("Cab Booking option is avaliable only within 5 days from today!");
        }
        })
        }
else // this code will execute the Current Booking Option
{
    $http.get('/dr/readDriver/'+$scope.cEmailofDriver).then(function(response)
    {
        if(response.data==undefined && $scope.dept!="Tab")
        {
        alert('Driver Details not Available');
        }
        else // if driver details are Available
        {
        $scope.myRideScope.cDrName=response.data.sName;
        $scope.myRideScope.cDrPlate=response.data.sPlate;
        $scope.myRideScope.vehicletype=response.data.sSegment;
        $scope.cPlate=$scope.myRideScope.cDrPlate;
        $scope.myRideScope.cDrMobile=response.data.sMobile;
        $scope.dname=true;
        sessionStorage.setItem('cPlate',$scope.cPlate);
        $scope.myRideScope.cPaStatus="booked";
        $scope.myRideScope.cRideType="current";
        $scope.myRideScope.cReserveDate=dateTime;
        $scope.myRideScope.cRideDate=dateTime;
        $scope.myRideScope.cDrStatus="booked";
        $scope.cDrStatus=$scope.myRideScope.cDrStatus;
        $scope.cCar=$scope.myRideScope.vehicletype;
              if($scope.cCar==$scope.myRideScope.bookVehicleType)
              {
              $http.get('/fa/readFare/'+$scope.cCar).then(function(response)
              {
              var today = new Date();
              var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
              var time = today.getHours() + ":" + today.getMinutes();
              var f=today.getHours();
              var f1=today.getMinutes();
              var newdate=new Date(today.getFullYear(),(today.getMonth()+1),today.getDate(),today.getHours(),today.getMinutes());
              var dateTime = date+' '+time;
              today.setHours(f,f1);
              var t=response.data.sBusyStart;
              var t1=t.split(" ")
              var t2=t1[0].split(":");
              var t3=t2[0];
              var t4=t2[1];
              var d1=new Date();
              d1.setHours(t3,t4);
              var v=response.data.sBusyEnd;
              var v1=v.split(" ")
              var v2=v1[0].split(":");
              var v3=v2[0];
              var v4=v2[1];
              var dv1=new Date();
              dv1.setHours(v3,v4);
                  if(today>=d1 && today<=dv1 )
                  {
                    $scope.rate=response.data.sBusyRates;
                  }
                  else
                  {
                    $scope.rate=response.data.sRelaxedRates;
                  }
              var f=$scope.myRideScope.cDistance;
              $scope.myRideScope.cAmount=Math.round(f*$scope.rate);
              $scope.myRideScope.cCar=$scope.cCar;
              $scope.cab=true;
              $http.get('/now/readRidenow/'+$scope.cEmailofDriver+'/'+$scope.cDrStatus).then(function(response)
              {
                  if(response.data!=null)
                  {
                  alert("This Cab has already been booked!");
                  }
                  else
                  {
                        if($scope.cab==true && $scope.dname==true)
                        {
                        $http.post('/now/writeRidenow',$scope.myRideScope).then(function(response)
                        {
                              if(response.data.success)
                              {
                                $('#hideNseek').hide();
                                $('#hideNseekagain').show();
                              var mySocket = io();
                              mySocket.emit('client',
                              {
                              cname :$scope.cPaName,
                              cmobile:$scope.cPaMobile,
                              pickuplocation:$scope.cSource,
                              destination:$scope.cDestin,
                              cPlate:$scope.cPlate
                              });
                              }
                      })
                      }
                      else
                      {
                      alert("This Cab Segment is not avaliable!");
                      }
                  }
              });
              });
              }
              else
              {
                alert("This Cab Segment is not avaliable!");
              }
      }
  });
} // first else ends
}

$scope.reserveRide=function()
  {
            $('#hideNseek').show();
            $scope.getDirections();
  }

$scope.CabMap = function()
{
  var mySocket = io();
  var myIcon="../media/cabmarker.jpg";
  mySocket.on('my other event', function (data)
  {
    var address = document.getElementById("cSourceID").value;
    geocoder = new google.maps.Geocoder();
    if (geocoder)
    {
       geocoder.geocode({'address':address}, function (results, status)
       {
           if (status == google.maps.GeocoderStatus.OK)
           {
            var dlat=results[0].geometry.location.lat();
            var dlang=results[0].geometry.location.lng();
            var lat=data.lat;
            var lng=data.lng;
           }
       });
     }
            $scope.lat=data.lat;
            $scope.lng=data.lng;
            myLatLng = new google.maps.LatLng($scope.lat, $scope.lng);

            var marker = new google.maps.Marker(
              {
                position: myLatLng,
                map:map,
                title: 'Cab is Available Here',
                icon:myIcon
              });
            map.setZoom(12);
            map.setCenter(marker.getPosition());

mySocket.on('deleteMyUser', function(data)
{
   if(data.soc!=undefined || data.soc!=null)
   {
     marker.setMap(null);
   }
});

}); // socket ends
} // function ends
$scope.CabMap();

$scope.SaveRidenow = function()
{
  $scope.cEmail=sessionStorage.getItem('sessionPaEmail');
  $scope.rideOne();
  $scope.rideTwo();
}
});
