var mongoose = require('mongoose');

var MatchSchema = new mongoose.Schema({
    request_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Request'},
    room_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Room'},
    score: Number
});

mongoose.model('Match', MatchSchema); 