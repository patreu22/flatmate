var mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
    size: Number,
    price: Number,
    room_img_urls:[String],
    likes: [String],
    tags: [String],
    facebook_id: String,
    user_info: {
        user_img_urls: [String],
        user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        facebook_id: String
    }
});

mongoose.model('Room', RoomSchema); 