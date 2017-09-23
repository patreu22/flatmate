
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




var matching = function(request, requester_access_token){
	console.log({ "request" : request} );


  Room.find(function(err, rooms) {
  	  //console.log("rooms:")
      //console.log(rooms); 
      matching_score(request,rooms[0],requester_access_token);
      //rooms.forEach(function(room){
      //	matching_score(request,room);
      //});
     
      
   });

}

exports.matching=matching;

 

var matching_score = function(request, room, requester_access_token){
	//console.log("\n pair:")
	//console.log(request.userInfo.facebookId)
	//console.log(room.userInfo.facebookId)

	get_facebook_data(requester_access_token,function(requester_facebook_infos){
		console.log("got facebook infos")
		console.log(requester_facebook_infos)

		//Verfügbare Daten:

		//Requester: 
		//requester_facebook_infos
		//request

		//room
		//room.facebook_infos


		var room_facebook_infos  = JSON.parse(room.facebookInfo);

		var numberCommonLikes = 0
		var numberCommonBio = 0
		var numberCommonFriends = 0
		//var numberCommonEvents = 0

		//console.log("\n\n\nLikes:")
		//console.log(requester_facebook_infos.likes)
		request_likes = [];
		requester_facebook_infos.likes.forEach(function(like){
			request_likes.push(like.id)
		});
		//console.log(request_likes)

		//console.log("\n\n\nBio:")
		//console.log(requester_facebook_infos.profile)
		if(requester_facebook_infos.profile.hometown.id == room_facebook_infos.profile.hometown.id){
			console.log("hometown match")
			numberCommonBio += 1
		}

		

		reqsports = requester_facebook_infos.profile.sports
		roomsports = room_facebook_infos.profile.sports
		common_sports = intersect(reqsports,roomsports)
		if (common_sports > 0){
			console.log("common sports:")
			console.log(common_sports)
			numberCommonBio += common_sports
		}

		reqSchoolIds = []
		requester_facebook_infos.profile.education.forEach(function(elem){
			reqSchoolId.push(elem.id)
		});

		roomSchoolIds = []
		room_facebook_infos.profile.education.forEach(function(elem){
			roomSchoolId.push(elem.id)
		});

		var commonSchools = intersect(reqSchoolIds,roomSchoolIds);
		if (commonSchools > 0){
			numberCommonBio += commonSchools
			//TODO we could handle what exaclty was matched
		}













		//return score



	});
}


function intersect(arr1, arr2) {
    var r = [], o = {}, l = arr2.length, i, v;
    for (i = 0; i < l; i++) {
        o[arr2[i]] = true;
    }
    l = arr1.length;
    for (i = 0; i < l; i++) {
        v = arr1[i];
        if (v in o) {
            r.push(v);
        }
    }
    return r;
}



var get_facebook_data = function(facebookToken, cb){
	console.log(facebookToken)
	var facebook_infos = {};
	var FB = require('fb');
	FB.setAccessToken(facebookToken);
	FB.api('me/friends', function (friend_res) {  
	if(!friend_res || friend_res.error) {
	   console.log(!friend_res ? 'error occurred' : friend_res.error);
	   
	  }

  		//console.log(friend_res.data);
  		facebook_infos.friends = friend_res.data;
  		//console.log("\n\n\n\n")

  		FB.api('me/likes', function (like_res) {  
			if(!like_res || like_res.error) {
			   console.log(!like_res ? 'error occurred' : like_res.error);
			  
			}

	  		//console.log(like_res.data);
	  		facebook_infos.likes = like_res.data;
	  		//console.log("\n\n\n\n")

	  		FB.api('me?fields=location,work,hometown,sports,education', function (profile_res) {  
				if(!profile_res || profile_res.error) {
					   console.log(!profile_res ? 'error occurred' : profile_res.error);
					   
				}

		  		//console.log(profile_res);
		  		facebook_infos.profile = profile_res;
		  		//console.log("\n\n\n\n")

		  		//console.log(facebook_infos)

		  		cb(facebook_infos)


			});


		});


	});

}