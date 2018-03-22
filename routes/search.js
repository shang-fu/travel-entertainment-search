var express = require('express');
var router  = express.Router();
var request = require("request");
var apikey  = "AIzaSyB2yS5yyo3DWDoKJ6GSIs4Lr7AsMvVqtHQ";

router.get("/", function(req, res) {
console.log(req.query);

var locale = req.query.locale;
var keyword  = req.query.keyword.trim();
var type = req.query.category;
var radius = (parseFloat(req.query.distance.trim()) * 1609).toString(); // mile to meter


function search() {
	var url = 
	`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&keyword=${keyword}`;
	if (type != 'Default') {
		url += '&type=' + type;
	}
	url += '&key=' + apikey;

	console.log(url);

	request(url, function(error, response, body){
		if (error) {
		  	console.log('error:', error); // Print the error if one occurred
		} else {
			if (response.statusCode == 200) {
				var data = JSON.parse(body);
				res.send(data);
			}
		}
	});
}

if (locale == 'current') {
	var location = req.query.lat + ',' + req.query.lng;
	search();


} else if (locale == 'other') {
	var address  = req.query.localeOtherDetail.trim();
	var url = 'https://maps.googleapis.com/maps/api/geocode/json?'
	 		+ 'address=' + address.split(' ').join('+') 
	 		+ '&key=' + apikey;
	console.log(url);

	request(url, function(error, response, body){
		if (error) {
		  	console.log('error:', error); // Print the error if one occurred
		} else {
			if (response.statusCode == 200) {
				var data = JSON.parse(body)['results'][0]['geometry']['location'];
				// console.log(data);
				location = data['lat'] + ',' + data['lng'];
				console.log(data);
				search();

			}
		}
	});
} else {
	console.log('Something wrong..')
}

// console.log(location);






})

module.exports = router;