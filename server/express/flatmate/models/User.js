var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');




/*
User Description:
A User is either of type "landlord" or a "searcher". A landlord provides a room and a searcher searches for a room.
Holds either one instance of "Room" ("./Room.js") or one instance of Request ("./Request.js") depending on his type.
Login is done via Facebook: Client sends a Facebook access token which is verified on this server. 
Name, images, facebook id are then retrieved from facebook
*/





var UserSchema = new mongoose.Schema({
    username: String,
    facebookId: { type: String, unique: true }, // The users unique facebook_id
    userImgUrls: [String],
    type: String, 
    requestId: {type: mongoose.Schema.Types.ObjectId, ref: 'Request'},
    roomId: {type: mongoose.Schema.Types.ObjectId, ref: 'Room'},
    flatmates: [String] // facebook-id of your flatmates
});


UserSchema.methods.generateJWT = function(facebookToken) {
    // set expiration to 60 days
    // var today = new Date();
    // var exp = new Date(today);
    // exp.setDate(today.getDate() + 60);
    return jwt.sign({
      _id: this._id,
      username: this.username,
      facebookId: this.facebookId,
      facebookToken: facebookToken
    //   exp: parseInt(exp.getTime() / 1000),
    }, 'Secret');
  };

mongoose.model('User', UserSchema);


