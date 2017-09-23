var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var https = require('https');
var jwt = require('express-jwt');

//decodes JWT. add 'auth' as fucntion-param to all routes that need authentication
var auth = jwt({secret: 'Secret', userProperty: 'payload'});

//import mongoose models
var User = mongoose.model('User');








// GET all Users
router.get('/user', function(req, res) {

  User.find(function(err, users){
    if(err){
      return res.status(400).json(err);
    }
    return res.status(200).json(users);
  });
});


//Logs User in with Faceboot access token
//Input: facebookToken as json
//Output: auth Token, user
router.post('/login', function(req, res) {

  if(!req.body.facebookToken){
    res.status(400).json({message: "Authentication Error. Please provide valid Facebook token!"})
  }

  https.get('https://graph.facebook.com/me?access_token=' + req.body.facebookToken, function(fbRes) {

    var str = '';

    fbRes.on('data', function(chunk) {
        str += chunk;
    });

    fbRes.on('end', function() {
      var response = JSON.parse(str);
      if(!response.id){
        return res.json({"message": "Authentication Error"});
      }else{
        User.find({"facebookId": response.id}).lean().exec(function(err, user) {
          if(err){
            res.send(err);
          }
          res.status(200).json({ "user": user, "authToken": user.generateJWT(req.body.facebookToken)});
        }); 
      }
    })

  }).end();

});

// Register new user with Facebook access token
//Input: facebookToken, type as json 
//Output: auth Token, user
router.post('/register', function(req, res) {

  if(!req.body.facebookToken){
    res.status(400).json({message: "Authentication Error. Please provide valid Facebook token!"})
  }
  
  https.get('https://graph.facebook.com/me?access_token=' + req.body.facebookToken, function(fbRes) {

    var str = '';

    fbRes.on('data', function(chunk) {
        str += chunk;
    });

    fbRes.on('end', function() {
      var response = JSON.parse(str);
      if(!response.id){
        return res.json({"message": "Authentication Error"});
      }else{
        var user = new User();
        user.username = response.name;
        user.facebookId = response.id;
        // user.userImgUrls = req.body.userImgUrls;
        user.type = req.body.type;
        // user.flatmates = req.body.flatmates;
      
        user.save(function(err, user) {
          if(err){
            return res.json(err);
          }
      
          res.json({ "user": user, "authToken": user.generateJWT(req.body.facebookToken)});
      
        });
      }
    })
  }).end();
});


//GET User by id
//Input: user_id as param || auth token in header
//Output: user
router.get('/user/:user_id', auth , function(req, res) {

  
  User.findOne(req.params.user_id, function(err, user){
    if(err){
      return res.status(400).json(err);
    }
  
    return res.status(200).json(user);
      
    });
  
});


//PUT User by id
//Input: user_id as param || auth token || username
// router.put('/user/:user_id', auth,  function(req, res) {

//   User.findOne(req.params.user_id, function(err, user){
//     if(err){
//       return res.status(400).json(err);
//     }

//     user.username = req.body.username;
//     user.facebookId = req.body.facebook_id;
//     user.userImgUrls = req.body.userImg_Uls;
//     user.type = req.body.type;
//     user.flatmates = req.body.flatmates;

//     user.save(function(err, user) {
//       if(err){
//         return res.json(err);
//       }
  
//       return res.status(200).json(user);
//     });
//   });  
// });


//DELETE User by id
//Input: user_id as param || auth token in header
//Output: user
router.delete('/user/:user_id', auth, function(req, res) {
  
  User.findById(req.params.user_id, function(err, user){
    if(err){
      return res.status(400).json(err);
    }

    user.remove(function(err, user) {
      if(err){
        return res.status(400).json(err);
      }

      return res.json(user);
    });
  });
});

  


module.exports = router;
