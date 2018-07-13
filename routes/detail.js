// 'use strict';

var express = require('express');
var router  = express.Router();
var request = require("request");
const apikey  = "AIzaSyBym2D1jDbynncnoPnbDrIae41CWnD81tY";

router.get("/", function(req, res) {
	console.log("Queries are ...")
	console.log(req.query);


	var placeid = req.query.placeid;
	var url = 
	`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeid}&key=${apikey}`;
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

});

module.exports = router;