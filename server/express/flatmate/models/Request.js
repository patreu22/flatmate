var mongoose = require('mongoose');


/*
Request Description:
A Request is created by a searcher who searches a room. Matched against an instanced of "Room" ("./Room.js")
*/ 




var RequestSchema = new mongoose.Schema({
    roomSize: Number,
    maxPrice: Number,
    tags:[String],
    userInfo: {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        facebookId: String
    }
    

});

mongoose.model('Request', RequestSchema); 