var mongoose = require('mongoose');


/*
Room Description:
A Room is created by a landlord who searches a flatmate. Matched against an instance of "Request" ("./Request.js")
The landlords facebook info (likes, friends, tec.) is saved here to simplify matching with a searchers request.
*/ 

var RoomSchema = new mongoose.Schema({
    roomImg: String,
    roomSize: Number,
    price: Number,
    description: String, 
    city: String,
    district: String,
    tags: [String], // exapmle: smoking ok, partying ok, dogs ok 
    userInfo: {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        facebookId: String
    },
    facebookInfo: String
});

mongoose.model('Room', RoomSchema); 