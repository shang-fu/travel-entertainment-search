var express = require('express');
var router  = express.Router();
var request = require("request");
var apikey  = "AIzaSyB2yS5yyo3DWDoKJ6GSIs4Lr7AsMvVqtHQ";

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
	}




// console.log(location);



// https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=CsQDwAEAAKeY-E4fo13s22PCc6_7ACE1jJ9dD0-M6V2jgc8lcNYDjVIAr9ul2Ubdtt8Jo0dwERZZZeErzMr_k7OnMkzdcSxor6XdW66JcveRp_96uuvhhJIlsJdfVmcov2-VWlYeHhCXbeDQUZDWif5mUC8PLIiHG0zWCh455RHHZZ0ResEEJLgmX5SNiPybcUubbNLaVabNGYay34ocGmEJVfaH5Odgx8cN652_jpzLl7x-YRYVqFbgJE9MeiLB1U6NMPur22peEfYb7OYywsw6z0fETFDhBH1VGPIymPlN7VF9BK4YNS5zaKDHY3-EuUCRKeOYM7k0PHq-1pgHPs8VDonIU6AH0xHX29NOBJfhzXRhdKfBdAmD_zYqyD0FQxxZEfbdp8854kAKTnCS4_CWur_RBxT9UJXKvejf5iDIS9tjL6uYJi3RPOyO6waUA4ZonZPzolQ4RlqI8K_nddCJa5bMD5wEy44V00U_VluVyTnZCSDiexP-4WiYDzn9KjcAbWUPytPvg7JhYRkSCJxZAiaswDirjmx3YHw27YoxfNo9FEd-Oyck-OpokPj-cMxj81ipjfYDRWC4nxrCvnzRJiQrfRESEFby1NO-8SYBJJ40y8VGIdIaFALkZhETpBNdO0ZkRRFg9IBIxrBO&key=AIzaSyB2yS5yyo3DWDoKJ6GSIs4Lr7AsMvVqtHQ


})

module.exports = router;