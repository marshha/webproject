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

	function initEvents() {
		var metadata = new Object();
		metadata.events = [];
	 	var map = new google.maps.Map(document.getElementById('map'), {
	 		zoom: 8,
	 		center: {
	 			lat: -34.397,
	 			lng: 150.644
	 		}
	 	});
	 	var geocoder = new google.maps.Geocoder();
	 	document.getElementById('submit').addEventListener('click', function() {
			addEvent(geocoder, map, metadata);
	 	});
	}

	function printEventList(event_list) {
		var output = "";

		for (var i = 0; i < event_list.length; i++) {
			var entry = event_list[i];
			output += "<h3>" + entry.title + " (" + entry.address + ", " + entry.date + ")" + "</h3>";
			output += "<p>" + entry.desc + "</p>";
		}

		return output;
	}

	function addEvent(geocoder, map, metadata) {
		var entry = new Object();

	 	entry.address = document.getElementById('address').value;
	 	entry.desc = document.getElementById('desc').value;
	 	entry.title = document.getElementById('title').value;
	 	entry.date = document.getElementById('date').value;

		metadata.events.push(entry)

		var output = printEventList(metadata.events);
		$('#event_list').html(output);

		geocodeAddress(geocoder, map, metadata);
	}
