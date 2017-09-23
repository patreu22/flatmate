var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require("../jobs/matching").matching;


//import mongoose models
var User = mongoose.model('User');
var Request = mongoose.model('Request');




var jwt = require('express-jwt');

//decodes JWT. add 'auth' as fucntion-param to all routes that need authentication
var auth = jwt({secret: 'Secret', userProperty: 'payload'});



// GET all Requests
router.get('/request', function(req, res) {
    
      Request.find(function(err, requests){
        if(err){
          return res.status(400).json(err);
        }
    
        return res.status(200).json({"requests": requests});
        
      });
    
    });

//POST new Request
//Input: roomSize, maxPrice, tags  as json || auth token in header || user_id as param
//Output: user
router.post('/user/:user_id/request', auth, function(req, res) {

    User.findById(req.params.user_id, function(err, user) {
        if(err){
          return res.json(err);
        }

        var request = new Request();
        request.roomSize = req.body.roomSize;
        request.maxPrice = req.body.maxPrice;
        request.tags = req.body.tags;
        request.userInfo.uesrImgUrls = user.userImgUrls;
        request.userInfo.userId = user._id;
        request.userInfo.facebookId = user.facebookId;

        request.save(function(err, request) {
            if(err){
              return res.json(err);
            }

            user.requestId = request._id;

            user.save(function(err, user){
                if(err){
                    return res.json(err);
                }

                return res.json({"user": user});
            });
        });
    });
});


//GET single request 
//Input: auth token in header || user_id, request_id as param
//Output: request
router.get('/user/:user_id/request/request/:request_id', auth, function(req, res) {
    Request.findById(req.params.request_id, function(err, request) {
        if(err){
            return res.json(err);
        }

        return res.json({"request": request});

    });
});


//PUT single request
//Input: roomSize, maxPrice, tags as Json || auth token in header || user_id, request_id as param 
//Output: request
router.put('/user/:user_id/request/:request_id', auth, function(req, res) {
    Request.findById(req.params.request_id, function(err, request) {
        if(err){
            return res.json(err);
        }

        request.roomSize = req.body.roomSize;
        request.maxPrize = req.body.maxPrice;
        request.tags = req.body.tags;

        request.save(function(err, request) {
            if(err){
                return res.json(err);
            }

            return res.json({"request": request});
        });
    });
});


//DELETE single request
//Input: auth token in header || user_id, request_id as param  
// router.get('/user/:user_id/request/request/:request_id', function(req, res) {
//     Request.findById(req.params.request_id, function(err, request) {
//         if(err){
//             return res.json(err);
//         }

//         request.remove(function(err, request) {
//             if(err){
//                 return res.json(err);
//             }

//             return res.json({"request": request});
//         });
//     });
// });


module.exports = router;