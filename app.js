var express 			= require('express'),
	methodOverride		= require('method-override'),
	bodyParser 			= require('body-parser'),
	app					= express();


app.use(express.static("dist"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.get("/", function(req, res) {
	res.render('index');
});

// app.listen(3000, function(){
// 	console.log("SERVER IS RUNNING");
// });

app.set('port', 8081);
app.listen(app.get('port'), function(){
	console.log("SERVER IS RUNNING");
});


module.exports = app;