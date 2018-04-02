// 'use strict';

var express = require('express');
var router  = express.Router();
var request = require("request");
const apikey  = "AIzaSyB2yS5yyo3DWDoKJ6GSIs4Lr7AsMvVqtHQ";

router.get("/", function(req, res) {
	console.log("Queries are ...")
	console.log(req.query);

	if (req.query.pagetoken) {
		var pagetoken = req.query.pagetoken;
		var url = 
		`https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${pagetoken}&key=${apikey}`;
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
	} else {
		var locale = req.query.locale;
		var keyword  = req.query.keyword.trim();
		var type = req.query.type;
		var radius = (parseFloat(req.query.distance.trim()) * 1609).toString(); // mile to meter


		function search() {
			var url = 
			`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}`;

			url += '&keyword=' + keyword.split(' ').join('+');

			if (type != 'default') {
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
						location = data['lat'] + ',' + data['lng'];
						console.log(data);
						search();

					}
				}
			});
		} else {
			console.log('Something wrong..');
		}
	}

});

module.exports = router;