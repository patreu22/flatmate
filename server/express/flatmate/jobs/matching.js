
var mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/flatmate', { useMongoClient: true, promiseLibrary: global.Promise });





// Require mongoose models
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
var matching = function(request, requester_access_token){
	console.log({ "request" : request} );


  Room.find(function(err, rooms) {
  	  console.log("rooms:")
      console.log(rooms); 
      matching_score(request,rooms[0]);
      //rooms.forEach(function(room){
      //	matching_score(request,room);
      //});
     
      
   });

}

exports.matching=matching;



 

var matching_score = function(request, room, requester_access_token){
	console.log("\n pair:")
	console.log(request.userInfo.facebookId)
	console.log(room.userInfo.facebookId)


	var Request_facebook_infos = {};
	var Room_facebook_infos = {};

	get_facebook_data(requester_access_token,function(facebook_infos){
		console.log("got facebook infos")
		console.log(facebook_infos)

	});
}


// adds a users Facebook info to a room
//Input: facebookToken, callback function
var get_facebook_data = function(AccessToken, cb){

	var facebook_infos = {};
	var FB = require('fb');
	FB.setAccessToken('EAAYrGhhGgZAoBAMLWBtqE5HfzWOUEkx8Kwg5AJhZAxmRFf1LOZBOcZCG17Jtb6kYzZCDZAEoZCRLiTxu9MOqy7ZAAZCBTEVm8GZBJBSxQCyZAt1cg2icus4HHWcwpmHPUSqJm4crfxcTOIfagb8rdo2CBjvoPZAPLYpbDTsa7yS4WvZCgwLNWZAZBQ3lYKtGRjZCUt9k5SS313TyFkECHZAAbpQHzV6VPxZC3uCiD9JzBOjc7efxOBCwZDZD');
	FB.api('me/friends', function (friend_res) {  
	if(!friend_res || friend_res.error) {
	   console.log(!friend_res ? 'error occurred' : friend_res.error);
	   
	  }

  		console.log(friend_res.data);
  		facebook_infos.friends = friend_res.data;
  		//console.log("\n\n\n\n")

  		FB.api('me/likes', function (like_res) {  
			if(!like_res || like_res.error) {
			   console.log(!like_res ? 'error occurred' : like_res.error);
			  
			}

	  		console.log(like_res.data);
	  		facebook_infos.likes = like_res.data;
	  		//console.log("\n\n\n\n")

	  		FB.api('me?fields=location,work,hometown,sports,education', function (profile_res) {  
				if(!profile_res || profile_res.error) {
					   console.log(!profile_res ? 'error occurred' : profile_res.error);
					   
				}

		  		console.log(profile_res);
		  		facebook_infos.profile = profile_res;
		  		console.log("\n\n\n\n")

		  		console.log(facebook_infos)

		  		cb(facebook_infos)


			});


		});


	});

}

exports.get_facebook_data = get_facebook_data;