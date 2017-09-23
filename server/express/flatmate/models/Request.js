var mongoose = require('mongoose');

var RequestSchema = new mongoose.Schema({
    size: Number,
    max_prize: Number,
    tags:[String],
    user_info: {
        user_img_urls: [String],
        user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        facebook_id: String
    }
    

});

mongoose.model('Request', RequestSchema); 