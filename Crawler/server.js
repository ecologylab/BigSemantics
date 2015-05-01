//server.js
var db = require('./dbinterface');
var express = require('express.io');
var app     = express();
app.http().io()

app.use(express.static('public'));

app.get('/' , function( req, res ){
	res.send('GET request to the homepage');
});


app.io.route('DB' , {
	frontier: function(req){
		console.log("The client asked for the frontier!")
		db.frontier_count(function(err, data){
			if(err){
				console.log(err);
			}
			else{
				req.io.emit('frontier' , { count: data });
			}
		});
	},
	explored: function(req){
		console.log("The cliend asked for the exlored!")
		db.explored_count(function(err, data){
			if(err){
				console.log(err);
			}
			else{
				req.io.emit('explored' , { count: data });
			}
		});
	}
});

var host = '127.0.0.1'
var port = 3000
if( process.argv.length == 3)
	host = process.arve[2]
if( process.argv.length == 4 )
	port = process.argv[3]
var server = app.listen(port,host ,function() {

	var host = server.address().address;
	var port = server.address().port;
	console.log("Crawler Report server running at http://%s:%s" , host , port);

});

