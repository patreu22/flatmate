var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require("../jobs/matching").get_facebook_data;


//import mongoose models
var User = mongoose.model('User');
var Room = mongoose.model('Room');


// GET all Rooms
router.get('/room', function(req, res) {
    
      Room.find(function(err, rooms){
        if(err){
          return res.status(400).json(err);
        }
    
        return res.status(200).json({"rooms": rooms});
        
      });
    
    });

//POST new Room
//Input: user_id as param || auth token in Header || roomSize, price, tags as Json
//Output: user
router.post('/user/:user_id/room', auth, function(req, res) {

    User.findById(req.params.user_id, function(err, user) {
        if(err){
          return res.json(err);
        }

        if(user.roomId){
            Room.findById(user.roomId,function(err, room) {
                if(err){
                    console.log(err);
                }

                room.remove();
                user.roomId = "";
            });
        }

        var room = new Room();
        room.roomSize = req.body.roomSize;
        room.price = req.body.price;
        room.tags = req.body.tags;
        room.userInfo.uesrImgUrls = user.userImgUrls;
        room.userInfo.userId = user._id;
        room.userInfo.facebookId = user.facebookId;

        room.save(function(err, room) {
            if(err){
              return res.json(err);
            }

            user.roomId = room._id;

            user.save(function(err, user){
                if(err){
                    return res.json(err);
                }

                addFacebookInfoToRoom(roomId, req.payload.facebookToken);
                return res.json({"user": user});
            });
        });
    });
});


//GET single Room
//Input: user_id, room_id as param || auth token in Header 
//Output: room
router.get('/user/:user_id/room/:room_id', auth, function(req, res) {
    Room.findById(req.params.room_id, function(err, room) {
        if(err){
            return res.json(err);
        }

        return res.json({"room": room});

    });
});


//PUT single Room 
//Input: user_id, room_id as param || auth token in Header || roomSize, price, tags as Json
//Output: room
router.put('/user/:user_id/room/:room_id', function(req, res) {
    Room.findById(req.params.room_id, function(err, room) {
        if(err){
            return res.json(err);
        }

        room.roomSize = req.body.roomSize;
        room.prize = req.body.price;
        room.tags = req.body.tags;

        room.save(function(err, room) {
            if(err){
                return res.json(err);
            }

            return res.json({"room": room});
        });
    });
});


//DELETE single Room
//Input: user_id, room_id as param
//Output: room 
router.get('/user/:user_id/room/:room_id', function(req, res) {
    Room.findById(req.params.room_id, function(err, room) {
        if(err){
            return res.json(err);
        }

        room.remove(function(err, room) {
            if(err){
                return res.json(err);
            }

            return res.json({"room": room});
        });
    });
});






// adds a users Facebook info to a room  (imported from "../jobs/matching.js")
//Input: roomId, facebookToken
function addFacebookInfoToRoom (roomId, facebookToken){
    get_facebook_data(facebookToken, function(facebookInfos) {
        Room.findbyId(roomId, function(err, room){

            var infoString = JSON.stringify(facebookInfos);

            room.facebookInfos = infoString;

            room.save(function(err) {
                if(err){
                    console.log(err);
                }
            });
        })
    })
}

module.exports = router;