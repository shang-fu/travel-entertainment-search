var express 			= require('express'),
	methodOverride		= require('method-override'),
	bodyParser 			= require('body-parser'),
	app					= express();
	https				= require('https');
	search 				= require('./routes/search');
	yelp				= require('./routes/yelp');

app.use(express.static("dist"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use('/search', search);
app.use('/yelp', yelp);

// var apikey = "AIzaSyB2yS5yyo3DWDoKJ6GSIs4Lr7AsMvVqtHQ";

app.get("/", function(req, res) {
	res.render('index');
});


app.set('port', 4200);
app.listen(app.get('port'), function(){
	console.log("SERVER IS RUNNING, LISTENING 4200...");
});


module.exports = app;