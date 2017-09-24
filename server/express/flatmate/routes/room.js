var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var get_facebook_data = require("../jobs/matching").get_facebook_data;
var jwt = require('express-jwt');

var fs = require('fs');
var multer = require('multer');


//import mongoose models
var User = mongoose.model('User');
var Room = mongoose.model('Room');


//decodes JWT. add 'auth' as fucntion-param to all routes that need authentication
var auth = jwt({secret: 'Secret', userProperty: 'payload'});

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
router.post('/user/:user_id/room', function(req, res) {

    User.findById(req.params.user_id, function(err, user) {
        if(err){
          return res.json(err);
        }

        // if(user.roomId){
        //     Room.findById(user.roomId,function(err, room) {
        //         if(err){
        //             console.log(err);
        //         }

        //         room.remove();
        //         user.roomId = "";
        //     });
        // }

        var room = new Room();
        room.roomSize = req.body.roomSize;
        room.price = req.body.price;
        room.tags = req.body.tags;
        room.userInfo.userId = user._id;
        room.userInfo.facebookId = user.facebookId;


        console.log(req.file.path)
        room.roomImg.data = req.file.path;
        room.roomImg.contentType = "img/jpg";
        console.log(room);
        
        //TODO: add images of the room

        room.save(function(err, room) {
            if(err){
              return res.json(err);
            }

            user.roomId = room._id;

            user.save(function(err, user){
                if(err){
                    return res.json(err);
                }

                // addFacebookInfoToRoom(roomId, req.payload.facebookToken);
                return res.json({"room": room});
            });
        });
        // res.send("9")
    });
});



router.post('/demoRoom', function(req, res) {

            var facebookToken = req.body.facebookToken
            //var facebookToken= "EAAYrGhhGgZAoBAETmw2ABAWWS3ZAUppEHy0dj9vDMIEHEbPBM2CVazwGhzS3ECgED4LzccrBRgZCQtczZB58iYG6STPzJ4ZBl3QLrZAhvsDLeidktQTtAFYYZCet3kHolz00ec1cAT3GBcqGZAx4HZB7diMYd9JJ1Ke6LdDWHSb8OuV8Dk6kQMF7igrF3l5OpIzdbNPe5SrmxoQZDZD";
    

            addFacebookInfoToRoom(facebookToken); 
            return res.status(200).send("");

            
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
function addFacebookInfoToRoom (facebookToken){
    get_facebook_data(facebookToken, function(facebookInfos) {
        console.log(facebookInfos)
        console.log("\n\n\n")
        console.log(JSON.stringify(facebookInfos))
        console.log("\n\n\n")



        
    })
}

module.exports = router;