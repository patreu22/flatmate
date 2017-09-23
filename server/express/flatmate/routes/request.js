var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


//import mongoose models
var User = mongoose.model('User');
var Request = mongoose.model('Request');



//POST new Request
router.post('/user/:user_id/request', function(req, res) {

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

                return res.json(user);
            });
        });
    });
});


//GET single request 
router.get('/user/:user_id/request/request/:request_id', function(req, res) {
    Request.findById(req.params.request_id, function(err, request) {
        if(err){
            return res.json(err);
        }

        return res.json(request);

    });
});


//PUT single request 
router.put('/user/:user_id/request/:request_id', function(req, res) {
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

            return res.json(request);
        });
    });
});


//DELETE single request 
router.get('/user/:user_id/request/request/:request_id', function(req, res) {
    Request.findById(req.params.request_id, function(err, request) {
        if(err){
            return res.json(err);
        }

        request.remove(function(err, request) {
            if(err){
                return res.json(err);
            }

            return res.json(request);
        });
    });
});


module.exports = router;