var mongoose = require('mongoose');

var MatchSchema = new mongoose.Schema({
    requestId: {type: mongoose.Schema.Types.ObjectId, ref: 'Request'},
    roomId: {type: mongoose.Schema.Types.ObjectId, ref: 'Room'},
    score: Number
});

mongoose.model('Match', MatchSchema); 