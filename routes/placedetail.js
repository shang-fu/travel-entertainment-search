var express = require('express');
var router  = express.Router();
var request = require("request");
var apikey  = "AIzaSyB2yS5yyo3DWDoKJ6GSIs4Lr7AsMvVqtHQ";

router.get("/", function(req, res) {
	console.log("Queries are ...")
	console.log(req.query);

	var googleMapsClient = require('@google/maps').createClient({
		key: "AIzaSyB2yS5yyo3DWDoKJ6GSIs4Lr7AsMvVqtHQ"
	});

	googleMapsClient.place({
		placeid: req.query.placeid
	}, function(err, response) {
		if (!err) {
		    console.log(response.json.results);
		}
	});

})

module.exports = router;