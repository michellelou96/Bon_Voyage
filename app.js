

var src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB4jTP5vJtNKm6z6E_NnXm5HadNSrUwuN8&callback=initMap"async defer;//????????????????????????????????????????????
document.addEventListener("DOMContentLoaded",function(){
	
document.querySelector("#starter").addEventListener("click",takeTrip(".destination",));

var startTime;
var originalTravelTime;
var myDestination;
var timer;

function takeTrip(dest){
	startTime = Date.now();
	myDestination = dest;
	originalTravelTime = checkTime();
	
	startTimer()
}


function startTimer(){
	var atDestination = false; 
	while (!atDestination){
		timer = setTimeout(firstAlert,120000)
		// how to break from loop - need a button
	}
}

var map;
function showMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');

}

function getlocation(){
	if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      return pos;
    })
    
}}

function getPath(currloc) {
  var bounds = new google.maps.LatLngBounds;
  var markersArray = [];

  var origin1 = currloc;
  var destinationB = myDestination;

  var destinationIcon = 'https://chart.googleapis.com/chart?' +
      'chst=d_map_pin_letter&chld=D|FF0000|000000';
  var originIcon = 'https://chart.googleapis.com/chart?' +
      'chst=d_map_pin_letter&chld=O|FFFF00|000000';
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {currloc.lat, currloc.lng},//whyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
    zoom: 10
  });
  var geocoder = new google.maps.Geocoder;

  var service = new google.maps.DistanceMatrixService;
  service.getDistanceMatrix({
    origins: [origin1],
    destinations: [destinationB],
    travelMode: google.maps.TravelMode.DRIVING,//TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
  }, function(response, status) {
    if (status !== google.maps.DistanceMatrixStatus.OK) {
      alert('Error was: ' + status);
    } else {
      var originList = response.originAddresses;
      var destinationList = response.destinationAddresses;
      var outputDiv = document.getElementById('output');
      outputDiv.innerHTML = '';
      deleteMarkers(markersArray);

      var showGeocodedAddressOnMap = function(asDestination) {
        var icon = asDestination ? destinationIcon : originIcon;
        return function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            map.fitBounds(bounds.extend(results[0].geometry.location));
            markersArray.push(new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              icon: icon
            }));
          } else {
            alert('Geocode was not successful due to: ' + status);
          }
        };
      };
      var shortestPath = originalTravelTime *2;
      for (var i = 0; i < originList.length; i++) {
        var results = response.rows[i].elements;
        geocoder.geocode({'address': originList[i]},
            showGeocodedAddressOnMap(false));
        for (var j = 0; j < results.length; j++) {
          geocoder.geocode({'address': destinationList[j]},
              showGeocodedAddressOnMap(true));
          if (results[j].duration.value < shortestPath){
            shortestPath = results[j].duration.value;
        }
      }
    }
    return shortestPath;
}

function deleteMarkers(markersArray) {
  for (var i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
}




function checkTime(){
  var pos = getlocation();
  ///I AM HERE I THINK
}





 





