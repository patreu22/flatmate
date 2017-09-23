var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


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


// POST new User
router.post('/user', function(req, res) {

  var user = new User();
  user.username = req.body.username;
  user.facebookId = req.body.facebookId;
  user.userImgUrls = req.body.userImgUrls;
  user.type = req.body.type;
  user.flatmates = req.body.flatmates;

  user.save(function(err, user) {
    if(err){
      return res.json(err);
    }

    return res.status(200).json(user);

  });
});


//GET User by id
router.get('/user/:user_id', function(req, res) {
  
  User.findOne(req.params.user_id, function(err, user){
    if(err){
      return res.status(400).json(err);
    }
  
    return res.status(200).json(user);
      
    });
  
});


//PUT User by id
router.put('/user/:user_id', function(req, res) {

  User.findOne(req.params.user_id, function(err, user){
    if(err){
      return res.status(400).json(err);
    }

    user.username = req.body.username;
    user.facebookId = req.body.facebook_id;
    user.userImgUrls = req.body.userImg_Uls;
    user.type = req.body.type;
    user.flatmates = req.body.flatmates;

    user.save(function(err, user) {
      if(err){
        return res.json(err);
      }
  
      return res.status(200).json(user);
    });
  });  
});


//DELETE User by id
router.delete('/user/:user_id', function(req, res) {
  
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
