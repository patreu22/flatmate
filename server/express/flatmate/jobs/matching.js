
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
var matching = function(request, requester_access_token, request_callback){
	console.log({ "request" : request} );
	get_facebook_data(requester_access_token,function(requester_facebook_infos){

	  Room.find(function(err, rooms) {
	  	  //console.log("rooms:")
	      //console.log(rooms); 
	      matching_score(request,rooms[0],requester_access_token, request_callback, requester_facebook_infos);
	      //rooms.forEach(function(room){
	      //	matching_score(request,room);
	      //});
	     
	      
	   });
	 });
}

exports.matching=matching;



 

var matching_score = function(request, room, requester_access_token, request_callback, requester_facebook_infos){
	//console.log("\n pair:")
	//console.log(request.userInfo.facebookId)
	//console.log(room.userInfo.facebookId)

	
		console.log("got facebook infos")
		//console.log(requester_facebook_infos)
		console.log(JSON.stringify(requester_facebook_infos))

		//Verfügbare Daten:

		//Requester: 
		//requester_facebook_infos
		//request

		//room
		//room.facebook_infos

		
		var room_facebook_infos  = JSON.parse(room.facebookInfo);
		//console.log(room_facebook_infos)
		var numberCommonLikes = 0
		var numberCommonBio = 0
		var numberCommonFriends = 0
		//var numberCommonEvents = 0

		//console.log("\n\n\nLikes:")
		//console.log(requester_facebook_infos.likes)


		//likes
		var request_likes = [];
		requester_facebook_infos.likes.forEach(function(like){
			request_likes.push(like.id)
		});

		var room_likes = []
		room_facebook_infos.likes.forEach(function(like){
			room_likes.push(like.id)
		});

		console.log(requester_facebook_infos.likes.length)
		console.log(room_facebook_infos.likes.length)

		if(request_likes!=null&room_likes!=null){
			var numberCommonLikes = intersect(request_likes,room_likes).length
			if (numberCommonLikes > 0){
				console.log("common likes!");
				console.log(numberCommonLikes)
			}
		}

		//friends
		var request_friends = [];
		requester_facebook_infos.friends.forEach(function(friend){
			request_friends.push(friend.id)
		});

		var room_friends = []
		room_facebook_infos.friends.forEach(function(friend){
			room_friends.push(friend.id)
		});

		//console.log(request_friends)
		//console.log(room_friends)

		if(request_friends != null & room_friends != null){
			var numberCommonFriends = intersect(request_friends,room_friends).length
			if (numberCommonFriends > 0){
				console.log("common friends!");
			}
		}


		//console.log(request_likes)

		//console.log("\n\n\nBio:")
		//console.log(requester_facebook_infos.profile)
		if(requester_facebook_infos.profile.hometown.id == room_facebook_infos.profile.hometown.id){
			console.log("hometown match")
			console.log(requester_facebook_infos.profile.hometown)
			console.log(room_facebook_infos.profile.hometown)
			numberCommonBio += 1
		}

		
		//sports
		reqsports = requester_facebook_infos.profile.sports
		roomsports = room_facebook_infos.profile.sports
		console.log(requester_facebook_infos.profile.sports)
		console.log(room_facebook_infos.profile.sports)

		if (reqsports != null & roomsports != null){
			common_sports = intersect(reqsports,roomsports).length
			if (common_sports > 0){
				console.log("common sports:")
				console.log(common_sports)
				numberCommonBio += common_sports.length
			}
		}


		//schools
		var reqSchoolIds = []
		requester_facebook_infos.profile.education.forEach(function(elem){
			reqSchoolIds.push(elem.id)
		});

		var roomSchoolIds = []
		room_facebook_infos.profile.education.forEach(function(elem){
			roomSchoolIds.push(elem.id)
		});

		if (reqSchoolIds != null & roomSchoolIds != null){
			var commonSchools = intersect(reqSchoolIds,roomSchoolIds);
			if (commonSchools > 0){
				console.log('common school!')
				numberCommonBio += commonSchools.length
				//TODO we could handle what exaclty was matched
			}
		}

		console.log( "finished matching score")
		//console.log(numberCommonBio)
		
		//console.log(numberCommonLikes)
		//console.log(numberCommonFriends)

		var score = numberCommonBio + 0.1 *numberCommonLikes + 3*numberCommonFriends





		console.log(score)
		request_callback(score)











		//return score



	
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



var requests_finished = {}


var check_if_all_finished = function(facebook_infos,cb){
	console.log(cb)
	if (requests_finished.likes & requests_finished.friends & requests_finished.bio){
		console.log("requests fininshed")
		console.log(cb)
		callbackOfShame(facebook_infos)
	}
	else{
		console.log("not yet finished")
	}

}


var callbackOfShame = {}

var load_likes = function(facebook_infos, FB, after_cursor,cb){

	console.log('me/likes?after='+after_cursor)
	FB.api('me/likes?after='+after_cursor, function (like_res) {  
		if(!like_res || like_res.error) {
		   console.log(!like_res ? 'error occurred' : like_res.error);
	  }
	  like_res.data.forEach(function(elem){
	  	facebook_infos.likes.push(elem);

	  });

	  console.log("length of likes array:"+facebook_infos.likes.length)

	  if(like_res.paging.next != null){
  			console.log("next likes page to fetch")
  			after_cursor = like_res.paging.cursors.after
  			console.log(after_cursor)
  			load_likes(facebook_infos,FB,after_cursor)

  		}
  	else{
  		requests_finished.likes = true
  		console.log("recurvsive likes loop stopped.")
  		check_if_all_finished(facebook_infos,cb)
  	}


	});

}




var get_facebook_data = function(facebookToken, cb){
	callbackOfShame = cb
	requests_finished = { "likes":false,"friends":false,"bio":false}
	var facebook_infos = {};
	var FB = require('fb');
	FB.setAccessToken(facebookToken);
	FB.api('me/friends', function (friend_res) {  
		if(!friend_res || friend_res.error) {
		   console.log(!friend_res ? 'error occurred' : friend_res.error);
		   
	  }

  		//console.log(friend_res);
  		facebook_infos.friends = friend_res.data;

  		if(friend_res.paging.next != null){
  			console.log("next friends page to fetch")
  			
  		}
  		else{
  			requests_finished.friends = true
  			
  			check_if_all_finished(facebook_infos,cb)
  		}
  		//console.log("\n\n\n\n")
  	});

	FB.api('me/likes', function (like_res) {  
		if(!like_res || like_res.error) {
		   console.log(!like_res ? 'error occurred' : like_res.error);
		  
		}

		//console.log(like_res);
		facebook_infos.likes = like_res.data;
		if (like_res.paging.next != null){
			
			console.log("next likes page to fetch")
  		after_cursor = like_res.paging.cursors.after

  		load_likes(facebook_infos,FB,after_cursor,cb)
		}
		else{
			requests_finished.likes = true
			check_if_all_finished(facebook_infos,cb)
		}


		console.log("\n\n\n\n")
	});


	FB.api('me?fields=location,work,hometown,sports,education', function (profile_res) {  
		if(!profile_res || profile_res.error) {
			   console.log(!profile_res ? 'error occurred' : profile_res.error);
			   
		}

		console.log(profile_res);
		facebook_infos.profile = profile_res;
		console.log("successfully got the bio stuff")
		requests_finished.bio = true
		check_if_all_finished(facebook_infos,cb)

		//console.log(facebook_infos)
	});
		  		//cb(facebook_infos)


			


		


	

}

exports.get_facebook_data = get_facebook_data;