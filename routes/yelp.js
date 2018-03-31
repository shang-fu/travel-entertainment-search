'use strict';

var express = require('express');
var router  = express.Router();
var request = require("request");

const yelp = require('yelp-fusion');
const apikey  = "UeibDbjBYSQeEjPshMtGyg0SxR-K2NCIMIZD8u5MkqGGQzt8FJhu8HWIGQZmO149YCxACuPZZPg6G5HQnR-Tsi0Gnv06Yb1xsjg4C8rd3XbkO-44GcQ1jjsFeHO-WnYx";
const client = yelp.client(apikey);


router.get("/", function(req, res) {
	// console.log("Queries are ...")
	// console.log(req.query);



	client.businessMatch('best', {
		name: req.query.name,
		address1: req.query.address1,
		address2: req.query.address2,
		address3: req.query.address3,
		city: req.query.city,
		state: req.query.state,
		country: req.query.country

		// name: 'Outback Steakhouse',
		// address1: '146 S Brand Blvd',
		// address2: 'Glendale',
		// address3: 'CA 91204',
		// city: 'Glendale',
		// state: 'CA',
		// country: 'US'

		// name: 'The Palm Beverly Hills',
		// address1: '5335, 267 N Canon Dr',
		// address2: 'Beverly Hills',
		// address3: 'CA 90210',
		// city: 'Beverly Hills',
		// state: 'CA',
		// country: 'US'


		
	}).then(response => {
		var data = JSON.parse(response.body);
		console.log(data);
		console.log(data.businesses[0].location.address1);
		console.log(req.query.address1);
		// res.send(data);


		if (data.businesses.length != 0 && (data.businesses[0].location.address1 === req.query.address1 || data.businesses[0].name === req.query.name)) {
			console.log('Finding the correct location');
			console.log(data.businesses[0].id);

			client.reviews(data.businesses[0].id).then(response => {
				var reviews = JSON.parse(response.body);
				console.log(reviews);
				res.send(reviews);
			}).catch(e => {
				console.log('Reviews search error...');
			});
		}


	}).catch(e => {
		console.log('Best match search error...');
	});



});





module.exports = router;