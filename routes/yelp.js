'use strict';

var express = require('express');
var router  = express.Router();
var request = require("request");

const yelp = require('yelp-fusion');
const apikey  = "UeibDbjBYSQeEjPshMtGyg0SxR-K2NCIMIZD8u5MkqGGQzt8FJhu8HWIGQZmO149YCxACuPZZPg6G5HQnR-Tsi0Gnv06Yb1xsjg4C8rd3XbkO-44GcQ1jjsFeHO-WnYx";
const client = yelp.client(apikey);


router.get("/", function(req, res) {

	client.businessMatch('best', {
		name: req.query.name,
		address1: req.query.address1,
		address2: req.query.address2,
		address3: req.query.address3,
		city: req.query.city,
		state: req.query.state,
		country: req.query.country
		
	}).then(response => {
		console.log(response);
		var data = JSON.parse(response.body);
		console.log(data);
		// console.log(data.businesses[0].location.address1);
		// console.log(req.query.address1);

		console.log(data["businesses"].length);

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
		} else {
			res.send(JSON.parse("{\"reviews\": []}"));
		}


	}).catch(e => {
		console.log('Best match search error...');
	});



});





module.exports = router;