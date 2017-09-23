var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    facebook_id: String, // The users facebook_id
    user_img_urls: [String],
    type: String, 
    request_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Request'},
    room_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Room'},
    flatmates: [String] // facebook-id of your flatmates
});

mongoose.model('User', UserSchema);


