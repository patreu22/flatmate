var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


//import mongoose models
var User = mongoose.model('User');
var Room = mongoose.model('Room');


// GET all Rooms
router.get('/room', function(req, res) {
    
      Room.find(function(err, rooms){
        if(err){
          return res.status(400).json(err);
        }
    
        return res.status(200).json(rooms);
        
      });
    
    });

//POST new Room
router.post('/user/:user_id/room', function(req, res) {

    User.findById(req.params.user_id, function(err, user) {
        if(err){
          return res.json(err);
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

                return res.json(user);
            });
        });
    });
});


//GET single Room 
router.get('/user/:user_id/room/:room_id', function(req, res) {
    Room.findById(req.params.room_id, function(err, room) {
        if(err){
            return res.json(err);
        }

        return res.json(room);

    });
});


//PUT single Room 
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

            return res.json(room);
        });
    });
});


//DELETE single Room 
router.get('/user/:user_id/room/:room_id', function(req, res) {
    Room.findById(req.params.room_id, function(err, room) {
        if(err){
            return res.json(err);
        }

        room.remove(function(err, room) {
            if(err){
                return res.json(err);
            }

            return res.json(room);
        });
    });
});


module.exports = router;