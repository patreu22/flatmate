var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 

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



var matching = function(request, request_face_id){
console.log('hi');
User.find(function(err, users){
    if(err){
    	console.log(users);
      return res.status(400).json(err);
    }
    console.log(users);
    return res.status(200).json(users);
    
  });

}()




var matching_score = function(request, room, request_face_id, landlord_face_id){




}