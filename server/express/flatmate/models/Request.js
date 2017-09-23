var mongoose = require('mongoose');

var RequestSchema = new mongoose.Schema({
    roomSize: Number,
    maxPrice: Number,
    tags:[String],
    userInfo: {
        userImgUrls: [String],
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        facebookId: String
    }
    

});

mongoose.model('Request', RequestSchema); 