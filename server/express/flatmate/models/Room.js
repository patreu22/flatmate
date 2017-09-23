var mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
    roomSize: Number,
    maxPrice: Number,
    roomImgUrls:[String],
    likes: [String],
    tags: [String],
    facebookId: String,
    userInfo: {
        userImgUrls: [String],
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        facebookId: String
    }
});

mongoose.model('Room', RoomSchema); 