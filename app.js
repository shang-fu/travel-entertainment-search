var express 			= require('express'),
	methodOverride		= require('method-override'),
	bodyParser 			= require('body-parser'),
	app					= express();
	https				= require('https');
	search 				= require('./routes/search');
	yelp				= require('./routes/yelp');
	detail				= require('./routes/detail');
	photo				= require('./routes/photo');

app.use(express.static("dist"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use('/search', search);
app.use('/yelp', yelp);
app.use('/detail', detail);
app.use('/photo', photo);

app.get("/", function(req, res) {
	res.render('index');
});

// Start the server
// const PORT = 4200;
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});


module.exports = app;