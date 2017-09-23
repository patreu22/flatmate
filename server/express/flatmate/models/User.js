var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    facebookId: String, // The users facebook_id
    userImgUrls: [String],
    type: String, 
    requestId: {type: mongoose.Schema.Types.ObjectId, ref: 'Request'},
    roomId: {type: mongoose.Schema.Types.ObjectId, ref: 'Room'},
    flatmates: [String] // facebook-id of your flatmates
});

mongoose.model('User', UserSchema);


