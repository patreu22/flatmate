var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


//import mongoose models
var User = mongoose.model('User');


// GET all Users
router.get('/', function(req, res) {

  User.find(function(err, users){
    if(err){
      return res.status(400).json(err);
    }

    return res.status(200).json(users);
    
  });

});


// POST new User
router.post('/', function(req, res) {

  var user = new User();
  user.username = req.body.username;
  user.facebook_id = req.body.facebook_id;
  user.user_img_urls = req.body.user_img_urls;
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
router.get('/:user_id', function(req, res) {
  
  User.findOne(req.params.user_id, function(err, user){
    if(err){
      return res.status(400).json(err);
    }
  
    return res.status(200).json(user);
      
    });
  
});


//PUT User by id
router.put('/:user_id', function(req, res) {

  User.findOne(req.params.user_id, function(err, user){
    if(err){
      return res.status(400).json(err);
    }

    user.username = req.body.username;
    user.facebook_id = req.body.facebook_id;
    user.user_img_urls = req.body.user_img_urls;
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
router.delete('/:user_id', function(req, res) {
  
  User.remove(req.params.user_id, function(err, user){
    if(err){
      return res.status(400).json(err);
    }
    return res.status(200).json(user);
  });  
});

  


module.exports = router;
