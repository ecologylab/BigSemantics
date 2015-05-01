

Communicator = function(){

};

Communicator.setListeners = function(){
	Communicator.socket.on('frontier' , function(data){
		//Do something
		console.log("I got frontier");
		console.log(data);
		UI.setFrontierCount(data.count);
	});
	Communicator.socket.on('explored' , function(data){
		//Do something
		console.log("I got explored");
		console.log(data);
		UI.setExploredCount(data.count);
	});
};

Communicator.getFrontier = function(){
	Communicator.socket.emit('DB:frontier' , { data : "I want the frotier bro"} );
};

Communicator.getExplored = function(){
	Communicator.socket.emit('DB:explored' , { data :"I want the explored bro"} );
};

$( document).ready( function() {
	Communicator.socket = io.connect(document.location.origin);
	Communicator.setListeners();
	Communicator.getFrontier();
	Communicator.getExplored();
});

