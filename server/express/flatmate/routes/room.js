var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require("../jobs/matching").get_facebook_data;
var jwt = require('express-jwt');

var fs = require('fs');
var multer = require('multer');


//import mongoose models
var User = mongoose.model('User');
var Room = mongoose.model('Room');



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
     cb(null, './uploads/');
        },
     filename: function (req, file, cb) {
        var originalname = file.originalname;
        var extension = originalname.split(".");
        filename = Date.now() + '.' + extension[extension.length-1];
        cb(null, filename);
      }
    });


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
router.post('/user/:user_id/room', multer({storage: storage, dest: 'uploads/'}).single('upload'),function(req, res) {

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
        room.roomImg = req.file.path;


        // room.roomImg.data = fs.readFileSync(req.file.path);
        // room.roomImg.contentType = "img/jpg";
        // var newImg = fs.readFileSync(req.file.path);   
        // console.log(newImg);

        // var encImg = newImg.toString('base64');
        // console.log(encImg);

        // room.roomImg.data = Buffer(encImg, 'base64');
        // room.roomImg.data = req.file.mimetype;

        console.log(room)

        // var newItem = {
        //     description: req.body.description,
        //     contentType: req.file.mimetype,
        //     size: req.file.size,
        //     img: Buffer(encImg, 'base64')
        //  };
        //  console.log(newItem);
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