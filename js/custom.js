	 function initMap() {
	 	var metadata = new Object();
	 	var map = new google.maps.Map(document.getElementById('map'), {
	 		zoom: 8,
	 		center: {
	 			lat: -34.397,
	 			lng: 150.644
	 		}
	 	});
	 	var geocoder = new google.maps.Geocoder();
	 	document.getElementById('submit').addEventListener('click', function() {
	 		geocodeAddress(geocoder, map, metadata);
	 	});
	 }

	 function geocodeAddress(geocoder, resultsMap, metadata) {
	 	var address = document.getElementById('address').value;
	 	geocoder.geocode({
	 		'address': address
	 	}, function(results, status) {
	 		if (status === 'OK') {
	 			resultsMap.setCenter(results[0].geometry.location);
	 			if (metadata.marker) {
	 				metadata.marker.setMap(null);
	 			}
	 			var marker = new google.maps.Marker({
	 				map: resultsMap,
	 				position: results[0].geometry.location
	 			});
	 			metadata.marker = marker;
	 		} else {
	 			alert('Geocode was not successful for the following reason: ' + status);
	 		}
	 	});
	 }

