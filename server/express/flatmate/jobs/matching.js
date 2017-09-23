
var mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/flatmate', { useMongoClient: true, promiseLibrary: global.Promise });

require("../models/Request");
var Request = mongoose.model("Request");

require("../models/Room");
var Room = mongoose.model("Room");

require("../models/User");
var User = mongoose.model("User");


//input parameters:

//requester facebook id
//requester facebook access token
//request params
//landlord facebook id
//Room params




var matching = function(request){
	console.log({ "request" : request} );


  Room.find(function(err, rooms) {
  	  console.log("rooms:")
      console.log(rooms); 
      rooms.forEach(function(room){
      	console.log(room.size);

      	matching_score(request,room);


      });
     
      
   });

}


 
exports.matching=matching;

var matching_score = function(request, room){
	console.log(request.facebookId)
	console.log(room.facebookId)




}