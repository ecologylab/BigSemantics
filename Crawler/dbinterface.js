//dbinterface.js

module.exports = {
	explored_count : explored_count,
	frontier_count : frontier_count,
};



var db_file_name = "init_urls.db";
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database(db_file_name);

function explored_count(callback){
  	db.get("SELECT COUNT(url) as count FROM visited_urls;" , function( err, row ){
  		if( err){
  			console.log("err");
  			callback("cannot query table 'visited_urls': " + err , null);
  		}
		else{
			if(row){
				callback( null , row.count);
			}
		}  	
  	});
};

function frontier_count(callback){
  	db.get("SELECT COUNT(url) as count FROM urls;" , function( err, row ){
  		if( err){
  			callback("cannot query table 'urls': " + err , null);
  		}
		else{
			if(row){
				callback( null , row.count);
			}
		}  	
  	});
};
