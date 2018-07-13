// 'use strict';

var express = require('express');
var router  = express.Router();
var request = require("request");
const apikey  = "AIzaSyBym2D1jDbynncnoPnbDrIae41CWnD81tY";

router.get("/", function(req, res) {
	console.log("Queries are ...")
	console.log(req.query);


	var maxwidth = req.query.maxwidth;
	var photoreference = req.query.photoreference;

	var option = {
		uri: 'https://maps.googleapis.com/maps/api/place/photo',
		qs: {
			maxwidth: maxwidth,
			photoreference: photoreference,
			key: apikey
		},
		encoding: null
	};


	// var url = 
	// `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photoreference=${photoreference}&key=${apikey}`;
	// console.log(url);
	request(option, function(error, response, body){
		if (error) {
		  	console.log('error:', error); // Print the error if one occurred
		} else {
			if (response.statusCode == 200) {
				// var data = JSON.parse(body);
				// res.send(data);
				res.set('Content-Type', 'image/png');
        		res.send(body);
			}
		}
	});

});

module.exports = router;