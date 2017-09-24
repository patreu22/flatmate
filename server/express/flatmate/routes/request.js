var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var matching = require("../jobs/matching").matching;

var Match = mongoose.model('Match')

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

                matching(request, req.payload.facebookToken,function(score){
                    console.log("matching score is" + score)

                });

                return res.json({"user": user});
            });
        });
    });
});



router.get('/matches',function(req,res){
    Match.find(function(err,matches){
        console.log(matches)
        return res.json({"matches": matches});
    });

});


router.post('/demoRequest', function(req, res) {
            Match.remove({})

            var facebookToken = req.body.facebookToken
            var request = new Request();
            request.roomSize = req.body.roomSize;
            request.maxPrice = req.body.maxPrice;
            request.tags = req.body.tags;
    
            request.save(function(err, request) {
                if(err){
                  return res.json(err);
                }
                    
                    matching(request, facebookToken, function(score,room){
                        console.log("matching score is" + score)
                    
                        var match = new Match()

                        match.score = score
                        match.requestId = request._id
                        match.roomId = room._id

                        match.save(function(err,match){
                            if(err){console.log(err)}
                            console.log("match saved")
                            
                        });
    
                    });

                    //because other solutions had timing problems, the return of the values is after a hardcoded 5 seconds
                    setTimeout(function() {
                        Match.where("roomId").ne(null).populate("roomId", "roomSize price description district username").exec(function(err, matches){
                            var realmatches = []
                            matches.forEach(function(res){
                                if (res.roomId != null){
                                    realmatches.push(res);
                                }

                            });
                            console.log(realmatches)
                            return res.json({"matches": realmatches});
                        });
                    }, 5000);
                    
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



module.exports = router;